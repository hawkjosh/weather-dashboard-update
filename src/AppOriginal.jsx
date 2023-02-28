import React, { Fragment, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import useStateCode from './useStateCode.js'

import { weatherApiKey, weatherApiBaseUrl } from '../config'

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

	function newSearchWeather(e) {
		e.preventDefault()

		axios.get(
			`${weatherApiBaseUrl}/current.json?key=${weatherApiKey}&q=${searchLocation}&aqi=no`
		)
		.then(
			(res) => {
				res.data.location.country === 'USA'
				|| res.data.location.country === 'United States of America'
				|| res.data.location.country === 'USA United States of America'
				? setCurrentLocation(
						`${res.data.location.name}, ${useStateCode(res.data.location.region)}`
					)
				: setCurrentLocation(
						`${res.data.location.name}, ${res.data.location.country}`
					)

				setCurrentDate(
					`(${dayjs(res.data.location.localtime).format('ddd, M/D/YY @ h:mma')} local time)`
				)

				const currentInfo = {
					condition: res.data.current.condition.icon,
					temp: `${res.data.current.temp_f} °F`,
					wind: `${res.data.current.wind_mph} MPH`,
					humidity: `${res.data.current.humidity}%`,
					uvi: res.data.current.uv
				}

				const currentVals = Object.values(currentInfo)

				setCurrentData(currentVals)

				setSearchHistory([...searchHistory, searchLocation])

				localStorage.setItem(
					'searchHistory', JSON.stringify([...searchHistory, searchLocation])
				)
			}
		)
		.catch(
			(err) => {
				console.error(err)
				alert('Please make sure you have entered a valid city name or zip code and try again!')
			}
		)

		axios.get(
			`${weatherApiBaseUrl}/forecast.json?key=${weatherApiKey}&q=${searchLocation}&days=6&aqi=no&alerts=no`
		)
		.then(
			(res) => {
				const forecastInfo = res.data.forecast.forecastday.map(
					(info) => ({
						date: dayjs(info.date).format('ddd, M/D'),
						condition: info.day.condition.icon,
						tempHigh: `${info.day.maxtemp_f} °F`,
						tempLow: `${info.day.mintemp_f} °F`,
						rain: `${info.day.daily_chance_of_rain}%`,
						uvi: info.day.uv,
					})
				)

				setForecastData(forecastInfo)
			}
		)
		.catch(
			(err) => console.error(err)
		)

		setSearchLocation('')
	}

	function prevSearchWeather(e) {
		e.preventDefault()

		const prevSearchLocation = e.target.innerHTML

		axios.get(
			`${weatherApiBaseUrl}/current.json?key=${weatherApiKey}&q=${prevSearchLocation}&aqi=no`
		)
		.then(
			(res) => {
				res.data.location.country === 'USA'
				|| res.data.location.country === 'United States of America'
				|| res.data.location.country === 'USA United States of America'
				? setCurrentLocation(
						`${res.data.location.name}, ${useStateCode(res.data.location.region)}`
					)
				: setCurrentLocation(
						`${res.data.location.name}, ${res.data.location.country}`
					)

				setCurrentDate(
					`(${dayjs(res.data.location.localtime).format('ddd, M/D/YY @ h:mma')} local time)`
				)

				const prevSearchInfo = {
					condition: res.data.current.condition.icon,
					temp: `${res.data.current.temp_f} °F`,
					wind: `${res.data.current.wind_mph} MPH`,
					humidity: `${res.data.current.humidity}%`,
					uvi: res.data.current.uv
				}

				const prevSearchVals = Object.values(prevSearchInfo)

				setCurrentData(prevSearchVals)
			}
		)
		.catch(
			(err) => console.error(err)
		)

		axios.get(
			`${weatherApiBaseUrl}/forecast.json?key=${weatherApiKey}&q=${prevSearchLocation}&days=6&aqi=no&alerts=no`
		)
		.then(
			(res) => {
				const forecastInfo = res.data.forecast.forecastday.map(
					(info) => ({
						date: dayjs(info.date).format('ddd, M/D'),
						condition: info.day.condition.icon,
						tempHigh: `${info.day.maxtemp_f} °F`,
						tempLow: `${info.day.mintemp_f} °F`,
						rain: `${info.day.daily_chance_of_rain}%`,
						uvi: info.day.uv,
					})
				)

				setForecastData(forecastInfo)
			}
		)
		.catch(
			(err) => console.error(err)
		)
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
							<div>
								<input
									className='search-input'
									type='text'
									placeholder='Search by city or zip code'
									value={searchLocation}
									onChange={(e) => setSearchLocation(e.target.value)}
								/>
								<div>
									<button
										className='search-button'
										onClick={newSearchWeather}>
										Search
									</button>
								</div>
							</div>
						</div>
					</form>

					{searchHistory.length !== 0 && (
						<Fragment>
							<hr />
							{searchHistory.map((search, index) => (
								<Fragment key={index}>
									<button
										className='search-history-button'
										type='button'
										onClick={prevSearchWeather}>
										{search}
									</button>
								</Fragment>
							))}
						</Fragment>
					)}
				</div>

				<div className='search-results-container'>
					<section className='current-weather-section'>
						{currentData.length !== 0 && (
							<div className='current-card-container'>
								<div className='current-card-body'>
									<div className='current-card-header'>
										<div className='current-card-title-wrapper'>
											<h2 className='current-card-title-location'>{currentLocation}</h2>
											<div className='current-card-title-date'>{currentDate}</div>
										</div>
										<img
											className='current-card-icon'
											src={currentData[0]}
											alt='current condition icon'
										/>
									</div>
									<div className='current-card-info-wrapper'>
										<p className='current-card-text'>
											Temperature: &nbsp;
											<span className='card-api-data'>
												{currentData[1]}
											</span>
										</p>
										<p className='current-card-text'>
											Wind Speed: &nbsp;
											<span className='card-api-data'>
												{currentData[2]}
											</span>
										</p>
										<p className='current-card-text'>
											Humidity: &nbsp;
											<span className='card-api-data'>
												{currentData[3]}
											</span>
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
						)}
					</section>

					<section className='forecast-weather-section'>
						{forecastData.slice(1).map((day, index) => (
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
												<span className='card-api-data'>
													{day.tempHigh}
												</span>
											</p>
											<p className='forecast-card-text'>
												Low: &nbsp;
												<span className='card-api-data'>
													{day.tempLow}
												</span>
											</p>
											<p className='forecast-card-text'>
												Rain: &nbsp;
												<span className='card-api-data'>
													{day.rain}
												</span>
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
				</div>
			</main>
		</Fragment>
	)
}
