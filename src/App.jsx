import React, { Fragment, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import { weatherApiKey, weatherApiBaseUrl } from '../config.js'

import useStateCode from './hooks/useStateCode.js'
import useCountryCode from './hooks/useCountryCode.js'
import useCountryFlag from './hooks/useCountryFlag.js'

import AlertModal from './components/AlertModal.jsx'

import TrashIcon from './icons/TrashIcon.jsx'

import './App.css'

export default () => {
	const [searchLocation, setSearchLocation] = useState('')
	const [searchHistory, setSearchHistory] = useState(
		JSON.parse(localStorage.getItem('searchHistory')) || []
	)
	const [currentLocation, setCurrentLocation] = useState('')
	const [currentDate, setCurrentDate] = useState('')
	const [currentFlag, setCurrentFlag] = useState('')
	const [currentData, setCurrentData] = useState([])
	const [forecastData, setForecastData] = useState([])
	const [error, setError] = useState(null)
	const [otherError, setOtherError] = useState(null)
	const [showHistory, setShowHistory] = useState(false)
	const dropdownRef = useRef(null)

	const getWeatherData = (location) => {
		if (!location) {
			const error = new Error(
				'Empty search field. Please enter valid city or zip code.'
			)
			setError(error)
		} else {
			Promise.all([
				axios.get(
					`${weatherApiBaseUrl}/current.json?key=${weatherApiKey}&q=${location}&aqi=no`
				),
				axios.get(
					`${weatherApiBaseUrl}/forecast.json?key=${weatherApiKey}&q=${location}&days=3&aqi=no&alerts=no`
				),
			])
				.then(
					axios.spread((currentResponse, forecastResponse) => {
						const currentData = currentResponse.data
						const forecastData = forecastResponse.data

						const { name, region, country } = currentData.location
						const location =
							country.includes('USA United States of America') ||
							country.includes('United States of America') ||
							country.includes('USA')
								? `${name}, ${useStateCode(region)}`
								: `${name} (${useCountryCode(country)})`
						const date = `Current weather @ ${dayjs(
							currentData.location.localtime
						).format('h:mma')}`

						const countryCode = useCountryFlag(currentData.location.country)
						const flag = `https://flagcdn.com/${countryCode}.svg`

						const condition = currentData.current.condition.icon
						const conditionText = currentData.current.condition.text
						const temp = `${currentData.current.temp_f} ??F`
						const wind = `${currentData.current.wind_mph} MPH`
						const humidity = `${currentData.current.humidity}%`
						const uv = currentData.current.uv
						const currentVals = [
							condition,
							uv,
							conditionText,
							temp,
							wind,
							humidity,
						]

						const forecastInfo = forecastData.forecast.forecastday
							// .slice(1)
							.map((info) => ({
								date: dayjs(info.date).format('ddd, M/D'),
								condition: info.day.condition.icon,
								tempHigh: `${info.day.maxtemp_f} ??F`,
								tempLow: `${info.day.mintemp_f} ??F`,
								rain: `${info.day.daily_chance_of_rain}%`,
								uvi: info.day.uv,
							}))

						setCurrentLocation(location)
						setCurrentDate(date)
						setCurrentFlag(flag)
						setCurrentData(currentVals)
						setForecastData(forecastInfo)

						if (!searchHistory.includes(location)) {
							setSearchHistory([...searchHistory, location])
							localStorage.setItem(
								'searchHistory',
								JSON.stringify([...searchHistory, location])
							)
						}
					})
				)
				.catch((err) => {
					console.error(err)
					if (err.response && err.response.status === 400) {
						setOtherError({
							message: 'Invalid entry. Please enter valid city or zip code.',
						})
					}
				})
		}
	}

	const handleCloseError = () => {
		setError(null)
	}

	const handleCloseOtherError = () => {
		setOtherError(null)
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
					<div className='header-content'>Weather Dashboard</div>
				</div>
			</header>

			<main>
				<section className='search-container'>
					<div className='search-label'>Search for a location:</div>
					<form className='search-form'>
						<input
							className='search-form-input'
							type='text'
							placeholder='Enter city name or zip code...'
							value={searchLocation}
							onChange={(e) => setSearchLocation(e.target.value)}
						/>

						<button
							className='search-form-btn'
							type='submit'
							onClick={newSearchWeather}>
							Search
						</button>
					</form>

					<div id='alert-modal'>
						<AlertModal
							isOpen={error !== null}
							onClose={handleCloseError}>
							<p>{error && error.message}</p>
						</AlertModal>

						<AlertModal
							isOpen={otherError !== null}
							onClose={handleCloseOtherError}>
							<p>{otherError && otherError.message}</p>
						</AlertModal>
					</div>

					{searchHistory.length !== 0 && (
						<div
							className='search-history'
							ref={dropdownRef}>
							<hr className='divider' />

							<button
								className='search-history-btn'
								onClick={() => setShowHistory(!showHistory)}>
								Previous Searches
							</button>

							{showHistory && (
								<div className='search-history-list'>
									{searchHistory.map((search, index) => (
										<Fragment key={index}>
											<div className='search-history-list-item-wrapper'>
												<div
													className='search-history-list-item'
													onClick={prevSearchWeather}>
													{search}
												</div>
												<TrashIcon
													className='search-history-delete-btn'
													onClick={() => removeHistoryItem(search)}
												/>
											</div>
										</Fragment>
									))}
								</div>
							)}
						</div>
					)}
				</section>

				{currentData.length !== 0 && (
					<section className='current-weather-container'>
						<div className='current-weather-card'>
							<div className='current-weather-card-header'>
								<div className='current-weather-card-title'>
									<div className='current-weather-card-location'>
										{currentLocation}
									</div>
									<img
										className='current-weather-card-flag'
										src={currentFlag}
										alt='country flag icon'
									/>
								</div>
								<div className='current-weather-card-date'>{currentDate}</div>
								<img
									className='current-weather-card-icon'
									src={currentData[0]}
									alt='current condition icon'
								/>
								<div className='current-weather-card-uvi'>
									<span>UVI</span>
									{/* <span>???</span> */}
									{currentData[1] <= 3 && (
										<span className='current-weather-card-uvi-badge uvi-low'>
											{currentData[1]}
										</span>
									)}
									{currentData[1] > 3 && currentData[1] < 7 && (
										<span className='current-weather-card-uvi-badge uvi-medium'>
											{currentData[1]}
										</span>
									)}
									{currentData[1] >= 7 && (
										<span className='current-weather-card-uvi-badge uvi-high'>
											{currentData[1]}
										</span>
									)}
								</div>
							</div>
							<div className='current-weather-card-body'>
								<div className='current-weather-card-data-label'>
									Condition:
									<span className='current-weather-card-data'>
										{currentData[2]}
									</span>
								</div>
								<div className='current-weather-card-data-label'>
									Humidity:
									<span className='current-weather-card-data'>
										{currentData[5]}
									</span>
								</div>
								<div className='current-weather-card-data-label'>
									Temp:
									<span className='current-weather-card-data'>
										{currentData[3]}
									</span>
								</div>
								<div className='current-weather-card-data-label'>
									Wind:
									<span className='current-weather-card-data'>
										{currentData[4]}
									</span>
								</div>
							</div>
						</div>
					</section>
				)}

				{forecastData.length !== 0 && (
					<section className='forecast-container'>
						{forecastData.map((info, index) => (
							<Fragment key={index}>
								<div className='forecast-card'>
									<div className='forecast-card-header'>
										<div className='forecast-card-title'>{info.date}</div>
										<img
											className='forecast-card-icon'
											src={info.condition}
											alt='forecast condition icon'
										/>
									</div>
									<div className='forecast-card-body'>
										<div className='forecast-card-data-label'>
											High:
											<span className='forecast-card-data'>
												{info.tempHigh}
											</span>
										</div>
										<div className='forecast-card-data-label'>
											Low:
											<span className='forecast-card-data'>{info.tempLow}</span>
										</div>
										<div className='forecast-card-data-label'>
											Rain:
											<span className='forecast-card-data'>{info.rain}</span>
										</div>
										<div className='forecast-card-data-label'>
											UVI:
											{info.uvi <= 3 && (
												<span className='forecast-card-uvi-badge uvi-low'>
													{info.uvi}
												</span>
											)}
											{info.uvi > 3 && info.uvi < 7 && (
												<span className='forecast-card-uvi-badge uvi-medium'>
													{info.uvi}
												</span>
											)}
											{info.uvi >= 7 && (
												<span className='forecast-card-uvi-badge uvi-high'>
													{info.uvi}
												</span>
											)}
										</div>
									</div>
								</div>
							</Fragment>
						))}
					</section>
				)}
			</main>
		</Fragment>
	)
}
