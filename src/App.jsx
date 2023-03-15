import React, { Fragment, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import { weatherApiKey, weatherApiBaseUrl } from '../config.js'

import useStateCode from './hooks/useStateCode.js'
import useCountryFlag from './hooks/useCountryFlag.js'
import { useWindowSize } from './hooks/useWindowSize.js'

import AlertModal from './components/AlertModal.jsx'

import TrashIcon from './icons/TrashIcon.jsx'
import RightArrowIcon from './icons/RightArrowIcon.jsx'

import './App.css'

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

						console.log(currentData)
						console.log(forecastData)

						const { country, name, region } = currentData.location
						const current = currentData.current
						const countryCode = useCountryFlag(country)

						const location = name

						const time = `Current weather @ ${dayjs(
							currentData.location.localTime
						).format('h:mma')}`

						const countryName =
							country.includes('USA') ||
							country.includes('USA United States of America') ||
							country.includes('United States of America') ||
							country.includes('United States')
								? `${region}, USA`
								: country

						const flag = `https://flagcdn.com/256x192/${countryCode}.webp`

						const condition = current.condition.icon
						const uv = current.uv
						const conditionText = current.condition.text
						const humidity = `${current.humidity}%`
						const temp = `${current.temp_f} °F`
						const wind = `${current.wind_mph} MPH`
						const currentVals = [
							condition,
							uv,
							conditionText,
							humidity,
							temp,
							wind,
						]

						const forecastInfo = forecastData.forecast.forecastday.map(
							(info) => ({
								date: dayjs(info.date).format('ddd, M/D'),
								condition: info.day.condition.icon,
								tempHigh: `${info.day.maxtemp_f} °F`,
								tempLow: `${info.day.mintemp_f} °F`,
								rain: `${info.day.daily_chance_of_rain}%`,
								uvi: info.day.uv,
							})
						)

						setCurrentLocation(location)
						setCurrentCountry(countryName)
						setCurrentFlag(flag)
						setCurrentTimeMsg(time)
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
				)
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
					<div className='header-title'>Weather Dashboard 2.0</div>

					<div className='search-container'>
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
								Search
							</button>
						</form>

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

						{searchHistory.length !== 0 && (
							<div
								className='search-history'
								ref={dropdownRef}>
								{/* <hr className='divider' /> */}

								<button
									className='search-dropdown'
									onClick={() => setShowHistory(!showHistory)}>
									Previous Searches
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
				</div>
			</header>

			<main>
				{currentData.length !== 0 && (
					<section className='current-weather-container'>
						{isLaptop && (
							<div className='cwc-card'>
								<div className='cwc-time'>{currentTimeMsg}</div>

								<div className='cwc-location'>{currentLocation}</div>

								<div className='cwc-country'>
									<div className='cwc-name'>{currentCountry}</div>
									<img
										className='cwc-flag'
										src={currentFlag}
										alt='Flag Icon'
									/>
								</div>

								<div className='cwc-uvi'>
									<div>UVI</div>
									<RightArrowIcon className='cwc-right-arrow' />
									{currentData[1] <= 3 && (
										<span className='cwc-uvi-badge uvi-low'>
											{currentData[1]}
										</span>
									)}
									{currentData[1] > 3 && currentData[1] < 7 && (
										<span className='cwc-uvi-badge uvi-medium'>
											{currentData[1]}
										</span>
									)}
									{currentData[1] >= 7 && (
										<span className='cwc-uvi-badge uvi-high'>
											{currentData[1]}
										</span>
									)}
								</div>

								<img
									className='cwc-icon'
									src={currentData[0]}
									alt='Current Condition Icon'
								/>

								<div className='cwc-data'>
									Condition:
									<span className='cwc-data-item'>{currentData[2]}</span>
								</div>

								<div className='cwc-data'>
									Humidity:
									<span className='cwc-data-item'>{currentData[3]}</span>
								</div>

								<div className='cwc-data'>
									Temp:
									<span className='cwc-data-item'>{currentData[4]}</span>
								</div>

								<div className='cwc-data'>
									Wind:
									<span className='cwc-data-item'>{currentData[5]}</span>
								</div>
							</div>
						)}

						{isTabletLg && (
							<div className='cwc-card'>
								<div className='cwc-time'>{currentTimeMsg}</div>

								<div className='cwc-location'>{currentLocation}</div>

								<div className='cwc-country'>
									<div className='cwc-name'>{currentCountry}</div>
									<img
										className='cwc-flag'
										src={currentFlag}
										alt='Flag Icon'
									/>
								</div>

								<div className='cwc-uvi'>
									<div>UVI</div>
									<RightArrowIcon className='cwc-right-arrow' />
									{currentData[1] <= 3 && (
										<span className='cwc-uvi-badge uvi-low'>
											{currentData[1]}
										</span>
									)}
									{currentData[1] > 3 && currentData[1] < 7 && (
										<span className='cwc-uvi-badge uvi-medium'>
											{currentData[1]}
										</span>
									)}
									{currentData[1] >= 7 && (
										<span className='cwc-uvi-badge uvi-high'>
											{currentData[1]}
										</span>
									)}
								</div>

								<img
									className='cwc-icon'
									src={currentData[0]}
									alt='Current Condition Icon'
								/>

								<div className='cwc-data'>
									Condition:
									<span className='cwc-data-item'>{currentData[2]}</span>
								</div>

								<div className='cwc-data'>
									Humidity:
									<span className='cwc-data-item'>{currentData[3]}</span>
								</div>

								<div className='cwc-data'>
									Temp:
									<span className='cwc-data-item'>{currentData[4]}</span>
								</div>

								<div className='cwc-data'>
									Wind:
									<span className='cwc-data-item'>{currentData[5]}</span>
								</div>
							</div>
						)}

						{isTabletSm && (
							<div className='cwc-card'>
								<div className='cwc-time'>{currentTimeMsg}</div>

								<div className='cwc-location'>{currentLocation}</div>

								<div className='cwc-country'>
									<div className='cwc-name'>{currentCountry}</div>
									<img
										className='cwc-flag'
										src={currentFlag}
										alt='Flag Icon'
									/>
								</div>

								<div className='cwc-uvi'>
									<div>UVI</div>
									<RightArrowIcon className='cwc-right-arrow' />
									{currentData[1] <= 3 && (
										<span className='cwc-uvi-badge uvi-low'>
											{currentData[1]}
										</span>
									)}
									{currentData[1] > 3 && currentData[1] < 7 && (
										<span className='cwc-uvi-badge uvi-medium'>
											{currentData[1]}
										</span>
									)}
									{currentData[1] >= 7 && (
										<span className='cwc-uvi-badge uvi-high'>
											{currentData[1]}
										</span>
									)}
								</div>

								<img
									className='cwc-icon'
									src={currentData[0]}
									alt='Current Condition Icon'
								/>

								<div className='cwc-data'>
									Condition:
									<span className='cwc-data-item'>{currentData[2]}</span>
								</div>

								<div className='cwc-data'>
									Humidity:
									<span className='cwc-data-item'>{currentData[3]}</span>
								</div>

								<div className='cwc-data'>
									Temp:
									<span className='cwc-data-item'>{currentData[4]}</span>
								</div>

								<div className='cwc-data'>
									Wind:
									<span className='cwc-data-item'>{currentData[5]}</span>
								</div>
							</div>
						)}

						{isMobile && (
							<div className='cwc-card'>
								<div className='cwc-time'>{currentTimeMsg}</div>

								<div className='cwc-location'>{currentLocation}</div>

								<div className='cwc-country'>
									<div className='cwc-name'>{currentCountry}</div>
									<img
										className='cwc-flag'
										src={currentFlag}
										alt='Flag Icon'
									/>
								</div>

								<div className='cwc-uvi'>
									<div>UVI</div>
									<RightArrowIcon className='cwc-right-arrow' />
									{currentData[1] <= 3 && (
										<span className='cwc-uvi-badge uvi-low'>
											{currentData[1]}
										</span>
									)}
									{currentData[1] > 3 && currentData[1] < 7 && (
										<span className='cwc-uvi-badge uvi-medium'>
											{currentData[1]}
										</span>
									)}
									{currentData[1] >= 7 && (
										<span className='cwc-uvi-badge uvi-high'>
											{currentData[1]}
										</span>
									)}
								</div>

								<img
									className='cwc-icon'
									src={currentData[0]}
									alt='Current Condition Icon'
								/>

								<div className='cwc-data'>
									Condition:
									<span className='cwc-data-item'>{currentData[2]}</span>
								</div>

								<div className='cwc-data'>
									Humidity:
									<span className='cwc-data-item'>{currentData[3]}</span>
								</div>

								<div className='cwc-data'>
									Temp:
									<span className='cwc-data-item'>{currentData[4]}</span>
								</div>

								<div className='cwc-data'>
									Wind:
									<span className='cwc-data-item'>{currentData[5]}</span>
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

											<img
												className='fc-icon'
												src={info.condition}
												alt='Forecast Condition Icon'
											/>

											<div className='fc-data'>
												High:
												<span className='fc-data-item'>{info.tempHigh}</span>
											</div>

											<div className='fc-data'>
												Low:
												<span className='fc-data-item'>{info.tempLow}</span>
											</div>

											<div className='fc-data'>
												Rain:
												<span className='fc-data-item'>{info.rain}</span>
											</div>

											<div className='fc-uvi'>
												<div>UVI</div>
												<RightArrowIcon className='fc-right-arrow' />
												{info.uvi <= 3 && (
													<span className='fc-uvi-badge uvi-low'>
														{info.uvi}
													</span>
												)}
												{info.uvi > 3 && info.uvi < 7 && (
													<span className='fc-uvi-badge uvi-medium'>
														{info.uvi}
													</span>
												)}
												{info.uvi >= 7 && (
													<span className='fc-uvi-badge uvi-high'>
														{info.uvi}
													</span>
												)}
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

											<img
												className='fc-icon'
												src={info.condition}
												alt='Forecast Condition Icon'
											/>

											<div className='fc-data'>
												High:
												<span className='fc-data-item'>{info.tempHigh}</span>
											</div>

											<div className='fc-data'>
												Low:
												<span className='fc-data-item'>{info.tempLow}</span>
											</div>

											<div className='fc-data'>
												Rain:
												<span className='fc-data-item'>{info.rain}</span>
											</div>

											<div className='fc-uvi'>
												<div>UVI</div>
												<RightArrowIcon className='fc-right-arrow' />
												{info.uvi <= 3 && (
													<span className='fc-uvi-badge uvi-low'>
														{info.uvi}
													</span>
												)}
												{info.uvi > 3 && info.uvi < 7 && (
													<span className='fc-uvi-badge uvi-medium'>
														{info.uvi}
													</span>
												)}
												{info.uvi >= 7 && (
													<span className='fc-uvi-badge uvi-high'>
														{info.uvi}
													</span>
												)}
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

											<img
												className='fc-icon'
												src={info.condition}
												alt='Forecast Condition Icon'
											/>

											<div className='fc-data'>
												High:
												<span className='fc-data-item'>{info.tempHigh}</span>
											</div>

											<div className='fc-data'>
												Low:
												<span className='fc-data-item'>{info.tempLow}</span>
											</div>

											<div className='fc-data'>
												Rain:
												<span className='fc-data-item'>{info.rain}</span>
											</div>

											<div className='fc-uvi'>
												<div>UVI</div>
												<RightArrowIcon className='fc-right-arrow' />
												{info.uvi <= 3 && (
													<span className='fc-uvi-badge uvi-low'>
														{info.uvi}
													</span>
												)}
												{info.uvi > 3 && info.uvi < 7 && (
													<span className='fc-uvi-badge uvi-medium'>
														{info.uvi}
													</span>
												)}
												{info.uvi >= 7 && (
													<span className='fc-uvi-badge uvi-high'>
														{info.uvi}
													</span>
												)}
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

											<img
												className='fc-icon'
												src={info.condition}
												alt='Forecast Condition Icon'
											/>

											<div className='fc-data'>
												High:
												<span className='fc-data-item'>{info.tempHigh}</span>
											</div>

											<div className='fc-data'>
												Low:
												<span className='fc-data-item'>{info.tempLow}</span>
											</div>

											<div className='fc-data'>
												Rain:
												<span className='fc-data-item'>{info.rain}</span>
											</div>

											<div className='fc-uvi'>
												<div>UVI</div>
												<RightArrowIcon className='fc-right-arrow' />
												{info.uvi <= 3 && (
													<span className='fc-uvi-badge uvi-low'>
														{info.uvi}
													</span>
												)}
												{info.uvi > 3 && info.uvi < 7 && (
													<span className='fc-uvi-badge uvi-medium'>
														{info.uvi}
													</span>
												)}
												{info.uvi >= 7 && (
													<span className='fc-uvi-badge uvi-high'>
														{info.uvi}
													</span>
												)}
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
