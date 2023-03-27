import React, { Fragment, useEffect, useRef, useState } from 'react'

import { weatherApiKey, weatherApiBaseUrl } from '../config.js'

import useStateCode from './hooks/useStateCode.js'
import useCountryFlag from './hooks/useCountryFlag.js'
import useConditionIcon from './hooks/useConditionIcon.js'
import useConditionText from './hooks/useConditionText.js'
import useUviNumberIcon from './hooks/useUviNumberIcon.js'
import useForecastIcon from './hooks/useForecastIcon.js'
import useTimeFormat from './hooks/useTimeFormat.js'
import useTimeConvert from './hooks/useTimeConvert.js'
import useDateFormat from './hooks/useDateFormat.js'
import { useWindowSize } from './hooks/useWindowSize.js'

import AlertModal from './components/AlertModal.jsx'

import LogoIcon from './components/icons/LogoIcon.jsx'
import TrashIcon from './components/icons/TrashIcon.jsx'
import WindIcon from './components/icons/WindIcon.jsx'
import SearchIcon from './components/icons/SearchIcon.jsx'
import SearchHistoryIcon from './components/icons/SearchHistoryIcon.jsx'

import './TestApp.css'

export default () => {
	const { isMobile, isTabletSm, isTabletLg, isLaptop } = useWindowSize()

	const [searchLocation, setSearchLocation] = useState('')

	const [searchHistory, setSearchHistory] = useState(
		JSON.parse(localStorage.getItem('searchHistory')) || []
	)

	const [showHistory, setShowHistory] = useState(false)

	const [currentLocation, setCurrentLocation] = useState('')
	const [currentFlag, setCurrentFlag] = useState('')
	const [currentCountry, setCurrentCountry] = useState('')
	const [currentTimeMsg, setCurrentTimeMsg] = useState('')
	const [currentConditionIcon, setCurrentConditionIcon] = useState('')
	const [currentConditionText, setCurrentConditionText] = useState('')
	const [currentUvi, setCurrentUvi] = useState('')

	const [currentData, setCurrentData] = useState([])
	const [forecastData, setForecastData] = useState([])

	const [errorOne, setErrorOne] = useState(null)
	const [errorTwo, setErrorTwo] = useState(null)

	const dropdownRef = useRef(null)

	const getWeatherData = (location) => {
		if (!location) {
			const errorOne = new Error(
				'Empty search field. Please enter valid city or zip code.'
			)
			setErrorOne(errorOne)
		} else {
			fetch(
				`${weatherApiBaseUrl}/forecast.json?key=${weatherApiKey}&q=${location}&days=3&aqi=no&alerts=no`
			)
				.then((response) => response.json())
				.then((weatherData) => {
					const { country, name, region } = weatherData.location
					const currentData = weatherData.current
					const forecastData = weatherData.forecast

					const countryCode = useCountryFlag(country)
					const location = name
					const time = useTimeConvert(weatherData.location.localtime)
					const countryName =
						country.includes('USA') ||
						country.includes('USA United States of America') ||
						country.includes('United States of America') ||
						country.includes('United States')
							? `${region}, USA`
							: country
					const flag = `https://flagcdn.com/256x192/${countryCode}.webp`

					const iconCode = currentData.condition.code
					const isDay = currentData.is_day
					const currentConditionIcon = useConditionIcon(iconCode, isDay)
					const currentConditionText = useConditionText(iconCode)

					const uv = currentData.uv
					const currentUvi = useUviNumberIcon(currentData.uv)
					const humidity = `${currentData.humidity}%`
					const temp = `${currentData.temp_f} °F`
					const wind = `${currentData.wind_mph}mph`
					const windDir = currentData.wind_dir
					const currentVals = [uv, humidity, temp, wind, windDir]

					const forecastInfo = forecastData.forecastday.map((info) => ({
						date: useDateFormat(info.date),
						condition: useForecastIcon(info.day.condition.code),
						sunrise: useTimeFormat(info.astro.sunrise),
						sunset: useTimeFormat(info.astro.sunset),
						tempHigh: `${info.day.maxtemp_f} °F`,
						tempLow: `${info.day.mintemp_f} °F`,
						rain: `${info.day.daily_chance_of_rain}%`,
					}))

					setCurrentLocation(location)
					setCurrentCountry(countryName)
					setCurrentFlag(flag)
					setCurrentTimeMsg(time)
					setCurrentConditionIcon(currentConditionIcon)
					setCurrentConditionText(currentConditionText)
					setCurrentUvi(currentUvi)
					setCurrentData(currentVals)
					setForecastData(forecastInfo)

					const searchHistoryName =
						country.includes('USA') ||
						country.includes('USA United States of America') ||
						country.includes('United States of America') ||
						country.includes('United States')
							? `${name}, ${useStateCode(region)}`
							: `${name}, ${country}`

					if (!searchHistory.includes(searchHistoryName)) {
						setSearchHistory([...searchHistory, searchHistoryName])
						localStorage.setItem(
							'searchHistory',
							JSON.stringify([...searchHistory, searchHistoryName])
						)
					}
				})
				.catch((err) => {
					console.error(err)
					if (err.response && err.response.status === 400) {
						setErrorTwo({
							message: 'Invalid entry. Please enter valid city or zip code.',
						})
					}
				})
		}
	}

	const handleCloseErrorOne = () => {
		setErrorOne(null)
	}

	const handleCloseErrorTwo = () => {
		setErrorTwo(null)
	}

	const newSearchWeather = (e) => {
		e.preventDefault()
		getWeatherData(searchLocation)
		setSearchLocation('')
	}

	const prevSearchWeather = (e) => {
		const location =
			e.target.innerHTML === 'Washington, D.C.'
				? 'Washington'
				: e.target.innerHTML
		setSearchLocation(location)
		getWeatherData(location)
		setSearchLocation('')
		setShowHistory(!showHistory)
	}

	const removeHistoryItem = (search) => {
		if (typeof Storage !== 'undefined') {
			const searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
			if (searchHistory !== null) {
				const index = searchHistory.indexOf(search)
				if (index !== -1) {
					searchHistory.splice(index, 1)
					localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
					setSearchHistory(searchHistory)
					if (searchHistory.length === 0) {
						setShowHistory(false)
					}
				} else {
					console.log(`${search} not found in searchHistory.`)
				}
			} else {
				console.log('searchHistory not found in localStorage.')
			}
		} else {
			console.log('Sorry, your browser does not support web storage.')
		}
	}

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setShowHistory(false)
			}
		}

		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [dropdownRef])

	return (
		<Fragment>
			<header>
				<div className='header-container'>
					<div className='title-wrapper'>
						<LogoIcon className='title-logo' />
						<div className='title-text'>Weather 2.0</div>
					</div>

					<div className='search-wrapper'>
						<form className='search-form'>
							<input
								className='search-input'
								type='text'
								placeholder='Enter city name or zip code...'
								value={searchLocation}
								onChange={(e) => setSearchLocation(e.target.value)}
							/>

							<button
								className='search-btn'
								type='submit'
								onClick={newSearchWeather}>
								<SearchIcon />
							</button>
						</form>
					</div>

					{searchHistory.length !== 0 && (
						<div
							className='search-history-wrapper'
							ref={dropdownRef}>
							<button
								className='search-dropdown'
								onClick={() => setShowHistory(!showHistory)}>
								<SearchHistoryIcon />
							</button>

							{showHistory && (
								<div className='search-list'>
									{searchHistory.map((search, index) => (
										<Fragment key={index}>
											<div className='list-item-wrapper'>
												<div
													className='list-item'
													// title={search}
													onClick={prevSearchWeather}>
													{search}
												</div>
												<TrashIcon
													className='delete-btn'
													onClick={() => removeHistoryItem(search)}
												/>
											</div>
										</Fragment>
									))}
								</div>
							)}
						</div>
					)}
				</div>
			</header>

			<div id='alert-modal'>
				<AlertModal
					isOpen={errorOne !== null}
					onClose={handleCloseErrorOne}>
					<p>{errorOne && errorOne.message}</p>
				</AlertModal>
				<AlertModal
					isOpen={errorTwo !== null}
					onClose={handleCloseErrorTwo}>
					<p>{errorTwo && errorTwo.message}</p>
				</AlertModal>
			</div>

			<main>
				{currentData.length !== 0 && (
					<section className='current-weather-container'>
						{isLaptop && (
							<div className='cwc-card'>
								<div className='cwc-location'>{currentLocation}</div>

								<div className='cwc-country'>
									<div className='country-name'>{currentCountry}</div>
									<img
										className='country-flag'
										src={currentFlag}
										alt='Flag Icon'
									/>
								</div>

								<div className='cwc-time'>{currentTimeMsg}</div>

								{/* <div className='cwc-uvi-icon'>
									{currentData[0] <= 3 && (
										<UviNumberIcon
											bgColor='hsl(120, 100%, 25%)'
											numColor='hsl(0, 0%, 100%)'
											number={currentData[0]}
										/>
									)}
									{currentData[0] > 3 && currentData[0] < 7 && (
										<UviNumberIcon
											bgColor='hsl(39, 100%, 50%)'
											numColor='hsl(0, 100%, 50%)'
											number={currentData[0]}
										/>
									)}
									{currentData[0] >= 7 && (
										<UviNumberIcon
											bgColor='hsl(0, 100%, 50%)'
											numColor='hsl(60, 100%, 50%)'
											number={currentData[0]}
										/>
									)}
								</div> */}

								<div className='cwc-uvi-icon'>{currentUvi}</div>

								<div className='cwc-condition-icon'>{currentConditionIcon}</div>

								<div className='cwc-data-item'>
									Current Conditions:
									<span className='cwc-api-info'>{currentConditionText}</span>
								</div>

								<div className='cwc-data-item'>
									Humidity:
									<span className='cwc-api-info'>{currentData[1]}</span>
								</div>

								<div className='cwc-data-item'>
									Temp:
									<span className='cwc-api-info'>{currentData[2]}</span>
								</div>

								<div className='cwc-data-item'>
									Wind:
									<span className='cwc-api-info'>{currentData[3]}</span>
									<div className='wind-icon'>
										<WindIcon direction={currentData[4]} />
									</div>
								</div>
							</div>
						)}

						{isTabletLg && (
							<div className='cwc-card'>
								<div className='cwc-location'>{currentLocation}</div>

								<div className='cwc-country'>
									<div className='country-name'>{currentCountry}</div>
									<img
										className='country-flag'
										src={currentFlag}
										alt='Flag Icon'
									/>
								</div>

								<div className='cwc-time'>{currentTimeMsg}</div>

								{/* <div className='cwc-uvi-icon'>
									{currentData[0] <= 3 && (
										<UviNumberIcon
											bgColor='hsl(120, 100%, 25%)'
											numColor='hsl(0, 0%, 100%)'
											number={currentData[0]}
										/>
									)}
									{currentData[0] > 3 && currentData[0] < 7 && (
										<UviNumberIcon
											bgColor='hsl(39, 100%, 50%)'
											numColor='hsl(0, 100%, 50%)'
											number={currentData[0]}
										/>
									)}
									{currentData[0] >= 7 && (
										<UviNumberIcon
											bgColor='hsl(0, 100%, 50%)'
											numColor='hsl(60, 100%, 50%)'
											number={currentData[0]}
										/>
									)}
								</div> */}

								<div className='cwc-uvi-icon'>{currentUvi}</div>

								<div className='cwc-condition-icon'>{currentConditionIcon}</div>

								<div className='cwc-data-item'>
									Current Conditions:
									<span className='cwc-api-info'>{currentConditionText}</span>
								</div>

								<div className='cwc-data-item'>
									Humidity:
									<span className='cwc-api-info'>{currentData[1]}</span>
								</div>

								<div className='cwc-data-item'>
									Temp:
									<span className='cwc-api-info'>{currentData[2]}</span>
								</div>

								<div className='cwc-data-item'>
									Wind:
									<span className='cwc-api-info'>{currentData[3]}</span>
									<div className='wind-icon'>
										<WindIcon direction={currentData[4]} />
									</div>
								</div>
							</div>
						)}

						{isTabletSm && (
							<div className='cwc-card'>
								<div className='cwc-location'>{currentLocation}</div>

								<div className='cwc-country'>
									<div className='country-name'>{currentCountry}</div>
									<img
										className='country-flag'
										src={currentFlag}
										alt='Flag Icon'
									/>
								</div>

								<div className='cwc-time'>{currentTimeMsg}</div>

								{/* <div className='cwc-uvi-icon'>
									{currentData[0] <= 3 && (
										<UviNumberIcon
											bgColor='hsl(120, 100%, 25%)'
											numColor='hsl(0, 0%, 100%)'
											number={currentData[0]}
										/>
									)}
									{currentData[0] > 3 && currentData[0] < 7 && (
										<UviNumberIcon
											bgColor='hsl(39, 100%, 50%)'
											numColor='hsl(0, 100%, 50%)'
											number={currentData[0]}
										/>
									)}
									{currentData[0] >= 7 && (
										<UviNumberIcon
											bgColor='hsl(0, 100%, 50%)'
											numColor='hsl(60, 100%, 50%)'
											number={currentData[0]}
										/>
									)}
								</div> */}

								<div className='cwc-uvi-icon'>{currentUvi}</div>

								<div className='cwc-condition-icon'>{currentConditionIcon}</div>

								<div className='cwc-data-item'>
									Current Conditions:
									<span className='cwc-api-info'>{currentConditionText}</span>
								</div>

								<div className='cwc-data-item'>
									Humidity:
									<span className='cwc-api-info'>{currentData[1]}</span>
								</div>

								<div className='cwc-data-item'>
									Temp:
									<span className='cwc-api-info'>{currentData[2]}</span>
								</div>

								<div className='cwc-data-item'>
									Wind:
									<span className='cwc-api-info'>{currentData[3]}</span>
									<div className='wind-icon'>
										<WindIcon direction={currentData[4]} />
									</div>
								</div>
							</div>
						)}

						{isMobile && (
							<div className='cwc-card'>
								<div className='cwc-card-header'>
									<div className='cwc-card-title'>
										<div className='cwc-location'>{currentLocation}</div>

										<div className='cwc-country'>
											<div className='country-name'>{currentCountry}</div>
											<img
												className='country-flag'
												src={currentFlag}
												alt='Flag Icon'
											/>
										</div>
									</div>

									<div className='uvi-time-wrapper'>
										<div className='cwc-uvi-icon'>{currentUvi}</div>

										<div className='cwc-time'>{currentTimeMsg}</div>
									</div>
								</div>

								<div className='cwc-condition-wrapper'>
									<div className='cwc-condition-icon'>
										{currentConditionIcon}
									</div>

									<div className='cwc-condition-text'>
										{currentConditionText}
									</div>
								</div>

								<div className='cwc-data-wrapper'>
									<div className='cwc-data-item'>
										Humidity:
										<span className='cwc-api-info'>{currentData[1]}</span>
									</div>

									<div className='cwc-data-item'>
										Temp:
										<span className='cwc-api-info'>{currentData[2]}</span>
									</div>

									<div className='cwc-data-item'>
										Wind:
										<span className='cwc-api-info'>{currentData[3]}</span>
										<div className='wind-icon'>
											<WindIcon direction={currentData[4]} />
										</div>
									</div>
								</div>
							</div>
						)}
					</section>
				)}

				{forecastData.length !== 0 && (
					<section className='forecast-container'>
						{isLaptop && (
							<Fragment>
								{forecastData.map((info, index) => (
									<Fragment key={index}>
										<div className='fc-card'>
											<div className='fc-date'>{info.date}</div>

											<div className='fc-condition-icon'>
												{info.condition()}
											</div>

											<div className='fc-data-item'>
												Sunrise:
												<span className='fc-api-info'>{info.sunrise}</span>
											</div>

											<div className='fc-data-item'>
												Sunset:
												<span className='fc-api-info'>{info.sunset}</span>
											</div>

											<div className='fc-data-item'>
												High:
												<span className='fc-api-info'>{info.tempHigh}</span>
											</div>

											<div className='fc-data-item'>
												Low:
												<span className='fc-api-info'>{info.tempLow}</span>
											</div>

											<div className='fc-data-item'>
												Rain:
												<span className='fc-api-info'>{info.rain}</span>
											</div>
										</div>
									</Fragment>
								))}
							</Fragment>
						)}

						{isTabletLg && (
							<Fragment>
								{forecastData.map((info, index) => (
									<Fragment key={index}>
										<div className='fc-card'>
											<div className='fc-date'>{info.date}</div>

											<div className='fc-condition-icon'>
												{info.condition()}
											</div>

											<div className='fc-data-item'>
												Sunrise:
												<span className='fc-api-info'>{info.sunrise}</span>
											</div>

											<div className='fc-data-item'>
												Sunset:
												<span className='fc-api-info'>{info.sunset}</span>
											</div>

											<div className='fc-data-item'>
												High:
												<span className='fc-api-info'>{info.tempHigh}</span>
											</div>

											<div className='fc-data-item'>
												Low:
												<span className='fc-api-info'>{info.tempLow}</span>
											</div>

											<div className='fc-data-item'>
												Rain:
												<span className='fc-api-info'>{info.rain}</span>
											</div>
										</div>
									</Fragment>
								))}
							</Fragment>
						)}

						{isTabletSm && (
							<Fragment>
								{forecastData.map((info, index) => (
									<Fragment key={index}>
										<div className='fc-card'>
											<div className='fc-date'>{info.date}</div>

											<div className='fc-condition-icon'>
												{info.condition()}
											</div>

											<div className='fc-data-item'>
												Sunrise:
												<span className='fc-api-info'>{info.sunrise}</span>
											</div>

											<div className='fc-data-item'>
												Sunset:
												<span className='fc-api-info'>{info.sunset}</span>
											</div>

											<div className='fc-data-item'>
												High:
												<span className='fc-api-info'>{info.tempHigh}</span>
											</div>

											<div className='fc-data-item'>
												Low:
												<span className='fc-api-info'>{info.tempLow}</span>
											</div>

											<div className='fc-data-item'>
												Rain:
												<span className='fc-api-info'>{info.rain}</span>
											</div>
										</div>
									</Fragment>
								))}
							</Fragment>
						)}

						{isMobile && (
							<Fragment>
								{forecastData.map((info, index) => (
									<Fragment key={index}>
										<div className='fc-card'>
											<div className='fc-date'>{info.date}</div>

											<div className='fc-condition-icon'>
												{info.condition()}
											</div>

											<div className='fc-data-item'>
												Sunrise:
												<span className='fc-api-info'>{info.sunrise}</span>
											</div>

											<div className='fc-data-item'>
												Sunset:
												<span className='fc-api-info'>{info.sunset}</span>
											</div>

											<div className='fc-data-item'>
												High:
												<span className='fc-api-info'>{info.tempHigh}</span>
											</div>

											<div className='fc-data-item'>
												Low:
												<span className='fc-api-info'>{info.tempLow}</span>
											</div>

											<div className='fc-data-item'>
												Rain:
												<span className='fc-api-info'>{info.rain}</span>
											</div>
										</div>
									</Fragment>
								))}
							</Fragment>
						)}
					</section>
				)}
			</main>
		</Fragment>
	)
}
