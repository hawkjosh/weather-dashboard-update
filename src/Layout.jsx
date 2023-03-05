import React, { Fragment, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import { weatherApiKey, weatherApiBaseUrl } from '../config'

import useStateCode from './useStateCode.js'

import AlertModal from './AlertModal.jsx'

import TrashIcon from './TrashIcon.jsx'

import './Layout.css'

export default () => {
	const [searchLocation, setSearchLocation] = useState('')
	const [searchHistory, setSearchHistory] = useState(() => {
		const searchHistoryString = localStorage.getItem('searchHistory')
		if (searchHistoryString !== null) {
			return JSON.parse(searchHistoryString)
		} else {
			return []
		}
	})
	const [currentLocation, setCurrentLocation] = useState('')
	const [currentDate, setCurrentDate] = useState('')
	const [currentData, setCurrentData] = useState([])
	const [forecastData, setForecastData] = useState([])
	const [error, setError] = useState(null)
	const [otherError, setOtherError] = useState(null)
	const [showHistory, setShowHistory] = useState(false)
	const dropdownRef = useRef(null)

	const getWeatherData = (location) => {
		if (!location) {
			const error = new Error(
				'Uh oh! Looks like you left the search field empty. Please enter a city name or zip code and try again.'
			)
			setError(error)
		} else {
			Promise.all([
				axios.get(
					`${weatherApiBaseUrl}/current.json?key=${weatherApiKey}&q=${location}&aqi=no`
				),
				axios.get(
					`${weatherApiBaseUrl}/forecast.json?key=${weatherApiKey}&q=${location}&days=6&aqi=no&alerts=no`
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
								: `${name}, ${country}`
						const date = `(${dayjs(currentData.location.localtime).format(
							'ddd, M/D/YY @ h:mma'
						)} local time)`

						const condition = currentData.current.condition.icon
						const temp = `${currentData.current.temp_f} °F`
						const wind = `${currentData.current.wind_mph} MPH`
						const humidity = `${currentData.current.humidity}%`
						const uv = currentData.current.uv
						const currentVals = [condition, temp, wind, humidity, uv]

						const forecastInfo = forecastData.forecast.forecastday
							.slice(1)
							.map((info) => ({
								date: dayjs(info.date).format('ddd, M/D'),
								condition: info.day.condition.icon,
								tempHigh: `${info.day.maxtemp_f} °F`,
								tempLow: `${info.day.mintemp_f} °F`,
								rain: `${info.day.daily_chance_of_rain}%`,
								uvi: info.day.uv,
							}))

						setCurrentLocation(location)
						setCurrentDate(date)
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
							message:
								'Uh oh! Looks like you may have entered an invalid city name or zip code. Please double check your entry and try again.',
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
		const location = e.target.innerHTML
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
				<div className='main-container'>
					<div className='search'>
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
								onClick={newSearchWeather}
								type='submit'>
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
														// data-key={search}
														onClick={prevSearchWeather}>
														{search}
													</div>
													<TrashIcon
														className='search-history-delete-btn'
														iconSize='1.25rem'
														iconColor='hsl(0, 0%, 90%)'
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

					{currentData.length !== 0 && (
						<div className='current-weather'>
							<div className='current-weather-card'>
								<div className='current-weather-card-header'>
									<div className='current-weather-card-title'>
										<div className='current-weather-card-location'>
											{currentLocation}
										</div>
										<div className='current-weather-card-date'>
											{currentDate}
										</div>
									</div>
									<img
										className='current-weather-card-icon'
										src={currentData[0]}
										alt='current condition icon'
									/>
								</div>
								<div className='current-weather-card-body'>
									<div className='current-weather-card-content'>
										Temperature:
										<span className='card-api-data'>{currentData[1]}</span>
									</div>
									<div className='current-weather-card-content'>
										Wind Speed:
										<span className='card-api-data'>{currentData[2]}</span>
									</div>
									<div className='current-weather-card-content'>
										Humidity:
										<span className='card-api-data'>{currentData[3]}</span>
									</div>
									<div className='current-weather-card-content'>
										UV Index:
										{currentData[4] <= 3 && (
											<button className='uvi-button uvi-low'>
												{currentData[4]}
											</button>
										)}
										{currentData[4] > 3 && currentData[4] < 7 && (
											<button className='uvi-button uvi-medium'>
												{currentData[4]}
											</button>
										)}
										{currentData[4] >= 7 && (
											<button className='uvi-button uvi-high'>
												{currentData[4]}
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					)}

					{forecastData.length !== 0 && (
						<div className='forecast'>
							{forecastData.map((info, index) => (
								<Fragment key={index}>
									<div className='forecast-card'>
										<div className='forecast-card-header'>
											<div className='forecast-card-title'>{info.date}</div>
											<div className='forecast-card-icon'>
												<img
													src={info.condition}
													alt='forecast condition icon'
												/>
											</div>
										</div>
										<div className='forecast-card-body'>
											<div className='forecast-card-content'>
												High:
												<span className='card-api-data'>{info.tempHigh}</span>
											</div>
											<div className='forecast-card-content'>
												Low:
												<span className='card-api-data'>{info.tempLow}</span>
											</div>
											<div className='forecast-card-content'>
												Rain:
												<span className='card-api-data'>{info.rain}</span>
											</div>
											<div className='forecast-card-content'>
												UVI:
												{info.uvi <= 3 && (
													<button className='uvi-button uvi-low'>
														{info.uvi}
													</button>
												)}
												{info.uvi > 3 && info.uvi < 7 && (
													<button className='uvi-button uvi-medium'>
														{info.uvi}
													</button>
												)}
												{info.uvi >= 7 && (
													<button className='uvi-button uvi-high'>
														{info.uvi}
													</button>
												)}
											</div>
										</div>
									</div>
								</Fragment>
							))}
						</div>
					)}
				</div>
			</main>
		</Fragment>
	)
}
