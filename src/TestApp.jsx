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
	const [currentTemperature, setCurrentTemperature] = useState('')
	const [currentConditionText, setCurrentConditionText] = useState('')
	const [currentUvi, setCurrentUvi] = useState('')

	const [CurrentConditionIcon, setCurrentConditionIcon] = useState(null)

	const [currentData, setCurrentData] = useState([])
	const [forecastData, setForecastData] = useState([])

	const [emptyError, setEmptyError] = useState(null)
	const [invalidError, setInvalidError] = useState(null)

	const dropdownRef = useRef(null)

	const getWeatherData = (location) => {
		if (!location) {
			const error = new Error(
				'Empty search field. Please enter valid city or zip code.'
			)
			setEmptyError(error)
		} else {
			fetch(
				`${weatherApiBaseUrl}/forecast.json?key=${weatherApiKey}&q=${location}&days=3&aqi=no&alerts=no`
			)
				.then((response) => response.json())
				.then((weatherData) => {
					const location = weatherData.location
					const name = location.name
					setCurrentLocation(name)
					const time = useTimeConvert(location.localtime)
					setCurrentTimeMsg(time)
					const countryCode = useCountryFlag(location.country)
					const countryName =
						location.country.includes('USA') ||
						location.country.includes('USA United States of America') ||
						location.country.includes('United States of America') ||
						location.country.includes('United States')
							? `${location.region}, USA`
							: location.country
					setCurrentCountry(countryName)

					const flag = `https://flagcdn.com/256x192/${countryCode}.webp`
					setCurrentFlag(flag)

					const currentData = weatherData.current
					const humidity = `${currentData.humidity}%`
					const wind = `${currentData.wind_mph}mph`
					const windDir = currentData.wind_dir
					const currentVals = [humidity, wind, windDir]
					setCurrentData(currentVals)

					const temp = `${currentData.temp_f} °F`
					setCurrentTemperature(temp)

					const currentUvi = useUviNumberIcon(currentData.uv)
					setCurrentUvi(currentUvi)

					const iconCode = currentData.condition.code
					const isDay = currentData.is_day
					const conditionIcon = useConditionIcon(iconCode, isDay)
					setCurrentConditionIcon(conditionIcon)

					const conditionText = useConditionText(iconCode)
					setCurrentConditionText(conditionText)

					const forecastData = weatherData.forecast
					const forecastInfo = forecastData.forecastday.map((info) => ({
						date: useDateFormat(info.date),
						condition: useForecastIcon(info.day.condition.code),
						sunrise: useTimeFormat(info.astro.sunrise),
						sunset: useTimeFormat(info.astro.sunset),
						tempHigh: `${info.day.maxtemp_f} °F`,
						tempLow: `${info.day.mintemp_f} °F`,
						rain: `${info.day.daily_chance_of_rain}%`,
					}))
					setForecastData(forecastInfo)

					const searchHistoryName =
						location.country.includes('USA') ||
						location.country.includes('USA United States of America') ||
						location.country.includes('United States of America') ||
						location.country.includes('United States')
							? `${name}, ${useStateCode(location.region)}`
							: `${name}, ${location.country}`

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
						setInvalidError({
							message: 'Invalid entry. Please enter valid city or zip code.',
						})
					}
				})
		}
	}

	const handleCloseError = () => {
		setEmptyError(null)
		setInvalidError(null)
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
						<div className='title-logo'>
							<LogoIcon />
						</div>
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
							<div className='search-dropdown'>
								<SearchHistoryIcon
									onClick={() => setShowHistory(!showHistory)}
								/>
							</div>

							{showHistory && (
								<div className='search-list'>
									{searchHistory.map((search, index) => (
										<Fragment key={index}>
											<div className='list-item-wrapper'>
												<div
													className='list-item'
													title={search}
													onClick={prevSearchWeather}>
													{search}
												</div>
												<div className='delete-btn'>
													<TrashIcon
														onClick={() => removeHistoryItem(search)}
													/>
												</div>
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
					isOpen={emptyError !== null}
					onClose={handleCloseError}>
					<p>{emptyError && emptyError.message}</p>
				</AlertModal>
				<AlertModal
					isOpen={invalidError !== null}
					onClose={handleCloseError}>
					<p>{invalidError && invalidError.message}</p>
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

								<div className='cwc-uvi-icon'>{currentUvi}</div>

								<div className='cwc-condition-wrapper'>
									<div className='cwc-condition-icon'>
										{CurrentConditionIcon}
									</div>

									<div className='cwc-condition-text'>
										{currentConditionText}
									</div>
								</div>

								<div className='cwc-data-item'>
									Humidity:
									<span className='cwc-api-info'>{currentData[0]}</span>
								</div>

								<div className='cwc-data-item'>
									Temp:
									<span className='cwc-api-info'>{currentTemperature}</span>
								</div>

								<div className='cwc-data-item'>
									Wind:
									<span className='cwc-api-info'>{currentData[1]}</span>
									<div className='wind-icon'>
										<WindIcon direction={currentData[2]} />
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

								<div className='cwc-uvi-icon'>{currentUvi}</div>

								<div className='cwc-condition-wrapper'>
									<div className='cwc-condition-icon'>
										{CurrentConditionIcon}
									</div>

									<div className='cwc-condition-text'>
										{currentConditionText}
									</div>
								</div>

								<div className='cwc-data-item'>
									Humidity:
									<span className='cwc-api-info'>{currentData[0]}</span>
								</div>

								<div className='cwc-data-item'>
									Temp:
									<span className='cwc-api-info'>{currentTemperature}</span>
								</div>

								<div className='cwc-data-item'>
									Wind:
									<span className='cwc-api-info'>{currentData[1]}</span>
									<div className='wind-icon'>
										<WindIcon direction={currentData[2]} />
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

								<div className='cwc-uvi-icon'>{currentUvi}</div>

								<div className='cwc-condition-wrapper'>
									<div className='cwc-condition-icon'>
										{CurrentConditionIcon}
									</div>

									<div className='cwc-condition-text'>
										{currentConditionText}
									</div>
								</div>

								<div className='cwc-data-item'>
									Humidity:
									<span className='cwc-api-info'>{currentData[0]}</span>
								</div>

								<div className='cwc-data-item'>
									Temp:
									<span className='cwc-api-info'>{currentTemperature}</span>
								</div>

								<div className='cwc-data-item'>
									Wind:
									<span className='cwc-api-info'>{currentData[1]}</span>
									<div className='wind-icon'>
										<WindIcon direction={currentData[2]} />
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
										{CurrentConditionIcon}
									</div>

									<div className='cwc-condition-text'>
										{currentConditionText}
									</div>
								</div>

								<div className='cwc-data-wrapper'>
									<div className='cwc-data-item'>
										Humidity:
										<span className='cwc-api-info'>{currentData[0]}</span>
									</div>

									<div className='cwc-data-item'>
										Temp:
										<span className='cwc-api-info'>{currentTemperature}</span>
									</div>

									<div className='cwc-data-item'>
										Wind:
										<span className='cwc-api-info'>{currentData[1]}</span>
										<div className='wind-icon'>
											<WindIcon direction={currentData[2]} />
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
