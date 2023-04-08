import React, { Fragment, useEffect, useRef, useState } from 'react'

import { weatherApiKey, weatherApiBaseUrl } from '../config.js'

import useStateCode from './hooks/useStateCode.js'
import useCountryFlag from './hooks/useCountryFlag.js'
import useCurrentCondition from './hooks/useCurrentCondition.jsx'
import useUviNumberIcon from './hooks/useUviNumberIcon.jsx'
import useForecastIcon from './hooks/useForecastIcon.js'
import useTimeFormat from './hooks/useTimeFormat.js'
import useTimeConvert from './hooks/useTimeConvert.js'
import useDateFormat from './hooks/useDateFormat.js'
import { useWindowSize } from './hooks/useWindowSize.js'

import AlertModal from './components/AlertModal.jsx'

import LogoIcon from './components/icons/general/LogoIcon.jsx'
import TrashIcon from './components/icons/general/TrashIcon.jsx'
import WindIcon from './components/icons/wind/WindIcon.jsx'
import HumidityIcon from './components/icons/humidity/HumidityIcon.jsx'
import SearchIcon from './components/icons/general/SearchIcon.jsx'
import SearchHistoryIcon from './components/icons/general/SearchHistoryIcon.jsx'

import './App.css'

export default () => {
	const { isMobile, isTabletSm, isTabletLg, isLaptop } = useWindowSize()

	const [searchLocation, setSearchLocation] = useState('')

	const [searchHistory, setSearchHistory] = useState(
		JSON.parse(localStorage.getItem('searchHistory')) || []
	)

	const [showHistory, setShowHistory] = useState(false)

	const [location, setLocation] = useState('')
	const [country, setCountry] = useState('')
	const [flag, setFlag] = useState('')
	const [localTime, setLocalTime] = useState('')
	const [Uvi, setUvi] = useState(null)
	const [CurrentCondition, setCurrentCondition] = useState(null)
	const [humidity, setHumidity] = useState('')
	const [windSpeed, setWindSpeed] = useState('')
	const [windDirection, setWindDirection] = useState('')

	const [weatherData, setWeatherData] = useState([])
	const [forecastData, setForecastData] = useState([])

	const [emptyError, setEmptyError] = useState(null)
	const [invalidError, setInvalidError] = useState(null)

	const dropdownRef = useRef(null)

	const getWeatherData = (location) => {
		if (!location) {
			const emptyError = new Error(
				'Empty search field. Please enter valid city or zip code.'
			)
			setEmptyError(emptyError)
		} else {
			fetch(
				`${weatherApiBaseUrl}/forecast.json?key=${weatherApiKey}&q=${location}&days=3&aqi=no&alerts=no`
			)
				.then((response) => response.json())
				.then((data) => {
					setWeatherData(data)
					setLocation(data.location.name)

					const countryName =
						data.location.country.includes('USA') ||
						data.location.country.includes('USA United States of America') ||
						data.location.country.includes('United States of America') ||
						data.location.country.includes('United States')
							? `${data.location.region}, USA`
							: data.location.country
					setCountry(countryName)

					const countryCode = useCountryFlag(data.location.country)
					const flag = `https://flagcdn.com/256x192/${countryCode}.webp`
					setFlag(flag)

					setLocalTime(useTimeConvert(data.location.localtime))

					const UviNumberIcon = useUviNumberIcon(data.current.uv)
					setUvi(UviNumberIcon)

					const iconCode = data.current.condition.code
					const isDay = data.current.is_day
					const CurrentConditionInfo = useCurrentCondition(
						iconCode,
						isDay,
						data.current.temp_f
					)
					setCurrentCondition(CurrentConditionInfo)

					setHumidity(`${data.current.humidity}%`)

					setWindSpeed(data.current.wind_mph)

					setWindDirection(data.current.wind_dir)

					const forecastData = data.forecast
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
						data.location.country.includes('USA') ||
						data.location.country.includes('USA United States of America') ||
						data.location.country.includes('United States of America') ||
						data.location.country.includes('United States')
							? `${data.location.name}, ${useStateCode(data.location.region)}`
							: `${data.location.name}, ${data.location.country}`

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

	const newSearch = (e) => {
		e.preventDefault()
		getWeatherData(searchLocation)
		setSearchLocation('')
	}

	const prevSearch = (e) => {
		const prevLocation =
			e.target.innerHTML === 'Washington, D.C.'
				? 'Washington'
				: e.target.innerHTML
		setSearchLocation(prevLocation)
		getWeatherData(prevLocation)
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
								onClick={newSearch}>
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
													onClick={prevSearch}>
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
					isOpen={invalidError}
					onClose={handleCloseError}>
					<p>{invalidError && invalidError.message}</p>
				</AlertModal>
			</div>

			<main>
				{weatherData.length !== 0 && (
					<section className='current-weather-container'>
						<div className='cwc-card'>
							<div className='cwc-location-wrapper'>
								<div className='cwc-location'>{location}</div>

								<div className='cwc-country'>
									<div className='country-name'>{country}</div>
									<img
										className='country-flag'
										src={flag}
										alt='Flag Icon'
									/>
								</div>

								<div className='cwc-time'>{localTime}</div>
							</div>

							{CurrentCondition}

							<div className='cwc-data-wrapper'>
								<div className='cwc-uvi-icon'>{Uvi}</div>

								<div className='cwc-humidity-icon'>
									<HumidityIcon percentage={humidity} />
								</div>

								<div className='cwc-wind-icon'>
									<WindIcon
										speed={windSpeed}
										direction={windDirection}
									/>
								</div>
							</div>
						</div>
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
