import React, { Fragment, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import { weatherApiKey, weatherApiBaseUrl } from '../config'

import useStateCode from './useStateCode.js'

import AlertModal from './AlertModal.jsx'

import './App.css'

export default function App() {
	const [searchLocation, setSearchLocation] = useState('')
	const [searchHistory, setSearchHistory] = useState(
		JSON.parse(localStorage.getItem('searchHistory')) || []
	)
	const [currentLocation, setCurrentLocation] = useState('')
	const [currentDate, setCurrentDate] = useState('')
	const [currentData, setCurrentData] = useState([])
	const [forecastData, setForecastData] = useState([])
	const [error, setError] = useState(null)
	const [otherError, setOtherError] = useState(null)

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
		e.preventDefault()
		const prevSearchLocation = e.target.value
		getWeatherData(prevSearchLocation)
	}

	return (
		<Fragment>
			<header>
				<h1 className='header-title'>Weather Dashboard</h1>
			</header>

			<main>
				<div className='search-container'>
					<form>
						<div className='search-form-controls'>
							{/* <div> */}
							<input
								className='search-input'
								type='text'
								placeholder='Search by city or zip code'
								value={searchLocation}
								onChange={(e) => setSearchLocation(e.target.value)}
							/>
							{/* <div> */}
							<button
								className='search-button'
								onClick={newSearchWeather}>
								Search
							</button>
							{/* </div> */}
							{/* </div> */}
						</div>
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
						<Fragment>
							<hr />
							<div className='search-history-dropdown-container'>
								<select
									className='search-history-dropdown'
									defaultValue=''
									onChange={prevSearchWeather}
									onBlur={(e) => {
										if (
											!searchHistory
												.map((search) => search.innerHTML)
												.includes(e.target.value)
										) {
											e.target.value = ''
										}
									}}
									>
									<option
										value=''
										disabled>
										Search History...
									</option>
									{searchHistory.map((search, index) => (
										<Fragment key={index}>
											<option value={search.innerHTML}>{search}</option>
										</Fragment>
									))}
								</select>
							</div>
						</Fragment>
					)}
				</div>

				{/* <div className='search-results-container'> */}
					{/* <section className='current-weather-section'> */}
						{currentData.length !== 0 && (
							<div className='current-card-container'>
								{/* <div className='current-card-body'> */}
									<div className='current-card-header'>
										<div className='current-card-title-wrapper'>
											<h2 className='current-card-title-location'>
												{currentLocation}
											</h2>
											<div className='current-card-title-date'>
												{currentDate}
											</div>
										</div>
										{/* <img
											className='current-card-icon'
											src={currentData[0]}
											alt='current condition icon'
										/> */}
									{/* </div> */}
									<div className='current-card-info-wrapper'>
										<div>
											<p className='current-card-text'>
												Temperature: &nbsp;
												<span className='card-api-data'>{currentData[1]}</span>
											</p>
											<p className='current-card-text'>
												Wind Speed: &nbsp;
												<span className='card-api-data'>{currentData[2]}</span>
											</p>
										</div>
										<div>
											<p className='current-card-text'>
												Humidity: &nbsp;
												<span className='card-api-data'>{currentData[3]}</span>
											</p>
											<p className='current-card-text'>
												UV Index: &nbsp;
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
											</p>
										</div>
										</div>
									</div>
									<div className='current-card-icon-wrapper'>
										<img
												className='current-card-icon'
												src={currentData[0]}
												alt='current condition icon'
											/>
									</div>

								{/* </div> */}
							</div>
						)}
					{/* </section> */}

					<section className='forecast-weather-section'>
						{forecastData.map((day, index) => (
							<Fragment key={index}>
								<div className='forecast-card-outer'>
									<div className='forecast-card-inner'>
										<div className='forecast-card-body'>
											<div className='forecast-card-header'>
												<h5 className='forecast-card-title'>{day.date}</h5>
												<img
													className='forecast-card-icon'
													src={day.condition}
													alt='forecast condition icon'
												/>
											</div>
											<p className='forecast-card-text'>
												High: &nbsp;
												<span className='card-api-data'>{day.tempHigh}</span>
											</p>
											<p className='forecast-card-text'>
												Low: &nbsp;
												<span className='card-api-data'>{day.tempLow}</span>
											</p>
											<p className='forecast-card-text'>
												Rain: &nbsp;
												<span className='card-api-data'>{day.rain}</span>
											</p>
											<p className='forecast-card-text'>
												UVI: &nbsp;
												{day.uvi <= 3 && (
													<button className='uvi-button uvi-low'>
														{day.uvi}
													</button>
												)}
												{day.uvi > 3 && day.uvi < 7 && (
													<button className='uvi-button uvi-medium'>
														{day.uvi}
													</button>
												)}
												{day.uvi >= 7 && (
													<button className='uvi-button uvi-high'>
														{day.uvi}
													</button>
												)}
											</p>
										</div>
									</div>
								</div>
							</Fragment>
						))}
					</section>
				{/* </div> */}
			</main>
		</Fragment>
	)
}
