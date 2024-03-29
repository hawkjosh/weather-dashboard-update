import React, { Fragment, useEffect, useRef, useState } from 'react'

import { weatherApiKey, weatherApiBaseUrl } from '../config.js'

import { useStateCode } from './hooks/useStateCode.js'
import { useCountryFlag } from './hooks/useCountryFlag.js'
import { useForecastIcon } from './hooks/useForecastIcon.js'
import { useTimeFormat } from './hooks/useTimeFormat.js'
import { useTimeConvert } from './hooks/useTimeConvert.js'
import { useDateFormat } from './hooks/useDateFormat.js'

import { AlertModal } from './components/AlertModal.jsx'
import { CurrentConditionIcon } from './components/CurrentConditionIcon.jsx'

import LogoIcon from './components/icons/general/LogoIcon.jsx'
import TrashIcon from './components/icons/general/TrashIcon.jsx'
import UviIcon from './components/icons/uvi/UviIcon.jsx'
import WindIcon from './components/icons/wind/WindIcon.jsx'
import HumidityIcon from './components/icons/humidity/HumidityIcon.jsx'
import SearchIcon from './components/icons/general/SearchIcon.jsx'
import SearchHistoryIcon from './components/icons/general/SearchHistoryIcon.jsx'
import SunriseIcon from './components/icons/sunrise/SunriseIcon.jsx'
import SunsetIcon from './components/icons/sunset/SunsetIcon.jsx'
import HighTempIcon from './components/icons/high-temp/HighTempIcon.jsx'
import LowTempIcon from './components/icons/low-temp/LowTempIcon.jsx'
import UmbrellaIcon from './components/icons/umbrella/UmbrellaIcon.jsx'

import './App.css'

export const App = () => {
	const [searchLocation, setSearchLocation] = useState('')

	const [searchHistory, setSearchHistory] = useState(
		JSON.parse(localStorage.getItem('searchHistory')) || []
	)

	const [showHistory, setShowHistory] = useState(false)

	const [location, setLocation] = useState('')
	const [country, setCountry] = useState('')
	const [flag, setFlag] = useState('')
	const [localTime, setLocalTime] = useState('')
	const [CurrentCondition, setCurrentCondition] = useState(null)
	const [uvi, setUvi] = useState('')
	const [humidity, setHumidity] = useState('')
	const [windSpeed, setWindSpeed] = useState('')
	const [windDirection, setWindDirection] = useState('')

	const [weatherData, setWeatherData] = useState([])
	const [forecastData, setForecastData] = useState([])

	const [emptyError, setEmptyError] = useState(null)
	const [invalidError, setInvalidError] = useState(null)

	const dropdownRef = useRef(null)

	const getWeatherData = async (location) => {
		if (!location) {
			setEmptyError(
				new Error('Empty search field. Please enter valid city or zip code.')
			)
		} else {
			try {
				const response = await fetch(
					`${weatherApiBaseUrl}/forecast.json?key=${weatherApiKey}&q=${location}&days=3&aqi=no&alerts=no`
				)
				const data = await response.json()

				if (!data.location) {
					setInvalidError(
						new Error('Invalid entry. Please enter valid city or zip code.')
					)
				}

				const getCountryName = (country) => {
					const countryNames = [
						'USA',
						'USA United States of America',
						'United States of America',
						'United States',
					]
					return countryNames.some((name) => country.includes(name))
						? `${data.location.region}, USA`
						: country
				}

				const searchHistoryName = getCountryName(
					data.location.country
				).includes('USA')
					? `${data.location.name}, ${useStateCode(data.location.region)}`
					: `${data.location.name}, ${data.location.country}`

				if (!searchHistory.includes(searchHistoryName)) {
					const updatedSearchHistory = [...searchHistory, searchHistoryName]
					setSearchHistory(updatedSearchHistory)
					localStorage.setItem(
						'searchHistory',
						JSON.stringify(updatedSearchHistory)
					)
				}

				setWeatherData(data)
				setLocation(data.location.name)
				setCountry(getCountryName(data.location.country))

				const countryCode = useCountryFlag(data.location.country)
				setFlag(`https://flagcdn.com/256x192/${countryCode}.webp`)

				setLocalTime(useTimeConvert(data.location.localtime))
				setCurrentCondition(
					CurrentConditionIcon(
						data.current.condition.code,
						data.current.is_day,
						data.current.temp_f
					)
				)
				setUvi(data.current.uv)
				setHumidity(data.current.humidity)
				setWindSpeed(data.current.wind_mph)
				setWindDirection(data.current.wind_dir)

				const forecastInfo = data.forecast.forecastday.map((info) => ({
					date: useDateFormat(info.date),
					condition: useForecastIcon(info.day.condition.code),
					sunrise: useTimeFormat(info.astro.sunrise),
					sunset: useTimeFormat(info.astro.sunset),
					tempHigh: `${info.day.maxtemp_f} °F`,
					tempLow: `${info.day.mintemp_f} °F`,
					rain: `${info.day.daily_chance_of_rain}%`,
				}))
				setForecastData(forecastInfo)
			} catch (err) {
				console.error(err)
			}
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
		if (typeof Storage === 'undefined') {
			console.log('Sorry, your browser does not support web storage.')
			return
		}

		const searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
		if (!searchHistory) {
			console.log('searchHistory not found in localStorage.')
			return
		}

		const index = searchHistory.indexOf(search)
		if (index === -1) {
			console.log(`${search} not found in searchHistory.`)
			return
		}

		searchHistory.splice(index, 1)
		localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
		setSearchHistory(searchHistory)

		if (searchHistory.length === 0) {
			setShowHistory(false)
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
	}, [showHistory, searchHistory, dropdownRef])

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
					<section className='current-weather-card'>
						<div className='cw-card-header'>
							<div className='cw-location'>{location}</div>

							<div className='cw-card-subheader'>
								<div className='cw-country-wrapper'>
									<div className='cw-country'>{country}</div>
									<img
										className='cw-flag'
										src={flag}
										alt='Flag Icon'
									/>
								</div>

								{localTime && <div className='cw-time'>{localTime}</div>}
							</div>
						</div>

						<div className='cw-condition-icon'>{CurrentCondition}</div>

						<div className='cw-data-wrapper'>
							<div className='cw-data-icon'>
								<UviIcon number={uvi} />
							</div>

							<div className='cw-data-icon'>
								<HumidityIcon percentage={humidity} />
							</div>

							<div className='cw-data-icon'>
								<WindIcon
									speed={windSpeed}
									direction={windDirection}
								/>
							</div>
						</div>
					</section>
				)}
				{forecastData.length !== 0 && (
					<section className='forecast-weather-container'>
						{forecastData.map((info, index) => (
							<Fragment key={index}>
								<div className='fw-card'>
									<div className='fw-card-header'>
										<div className='fw-date'>{info.date}</div>

										<div className='fw-rain-icon'>
											<UmbrellaIcon number={info.rain} />
										</div>
									</div>

									<div className='fw-condition-icon'>{info.condition()}</div>

									<div className='fw-data-wrapper'>
										<div className='fw-data-group'>
											<div className='fw-data-icon'>
												<SunriseIcon time={info.sunrise} />
											</div>

											<div className='fw-data-icon'>
												<SunsetIcon time={info.sunset} />
											</div>
										</div>

										<div className='fw-data-group'>
											<div className='fw-data-icon'>
												<HighTempIcon temp={info.tempHigh} />
											</div>

											<div className='fw-data-icon'>
												<LowTempIcon temp={info.tempLow} />
											</div>
										</div>
									</div>
								</div>
							</Fragment>
						))}
					</section>
				)}
				{weatherData.length !== 0 && (
					<div className='ref-link'>
						<a
							href='https://www.weatherapi.com/'
							title='Free Weather API'
							target='_blank'
							rel='noreferrer'>
							<img
								src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png'
								alt='Weather data by WeatherAPI.com'
							/>
						</a>
					</div>
				)}
			</main>
		</Fragment>
	)
}
