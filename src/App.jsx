import React, { Fragment, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import './App.css'

export default function App() {
	const [location, setLocation] = useState('')
	const [searchHistory, setSearchHistory] = useState(
		JSON.parse(localStorage.getItem('searchHistory')) || []
	)
	const [todayLocation, setTodayLocation] = useState('')
	const [todayDateInfo, setTodayDateInfo] = useState('')
	const [todayCondition, setTodayCondition] = useState('')
	const [todayTemperature, setTodayTemperature] = useState('')
	const [todayWind, setTodayWind] = useState('')
	const [todayHumidity, setTodayHumidity] = useState('')
	const [todayUvi, setTodayUvi] = useState('')

	const [forecastDate1, setForecastDate1] = useState('')
	const [forecastCondition1, setForecastCondition1] = useState('')
	const [forecastTempHigh1, setForecastTempHigh1] = useState('')
	const [forecastTempLow1, setForecastTempLow1] = useState('')
	const [forecastRain1, setForecastRain1] = useState('')
	const [forecastUvi1, setForecastUvi1] = useState('')

	const [forecastDate2, setForecastDate2] = useState('')
	const [forecastCondition2, setForecastCondition2] = useState('')
	const [forecastTempHigh2, setForecastTempHigh2] = useState('')
	const [forecastTempLow2, setForecastTempLow2] = useState('')
	const [forecastRain2, setForecastRain2] = useState('')
	const [forecastUvi2, setForecastUvi2] = useState('')

	const [forecastDate3, setForecastDate3] = useState('')
	const [forecastCondition3, setForecastCondition3] = useState('')
	const [forecastTempHigh3, setForecastTempHigh3] = useState('')
	const [forecastTempLow3, setForecastTempLow3] = useState('')
	const [forecastRain3, setForecastRain3] = useState('')
	const [forecastUvi3, setForecastUvi3] = useState('')

	const [forecastDate4, setForecastDate4] = useState('')
	const [forecastCondition4, setForecastCondition4] = useState('')
	const [forecastTempHigh4, setForecastTempHigh4] = useState('')
	const [forecastTempLow4, setForecastTempLow4] = useState('')
	const [forecastRain4, setForecastRain4] = useState('')
	const [forecastUvi4, setForecastUvi4] = useState('')

	const [forecastDate5, setForecastDate5] = useState('')
	const [forecastCondition5, setForecastCondition5] = useState('')
	const [forecastTempHigh5, setForecastTempHigh5] = useState('')
	const [forecastTempLow5, setForecastTempLow5] = useState('')
	const [forecastRain5, setForecastRain5] = useState('')
	const [forecastUvi5, setForecastUvi5] = useState('')

	const weatherApiKey = '59604f27ba2d4712ba511929232702'
	const weatherApiUrl = 'https://api.weatherapi.com/v1'
	const todayWeatherApiUrl = `${weatherApiUrl}/current.json?key=${weatherApiKey}&q=${location}&aqi=no`
	const forecastWeatherApiUrl = `${weatherApiUrl}/forecast.json?key=${weatherApiKey}&q=${location}&days=6&aqi=no&alerts=no`

	function todayWeather() {
		axios
			.get(todayWeatherApiUrl)
			.then(function (response) {
				console.log(response.data)
				response.data.location.country === 'United States of America' || response.data.location.country === 'USA United States of America'
					? setTodayLocation(
							`${response.data.location.name}, ${response.data.location.region}`
					  )
					: setTodayLocation(
							`${response.data.location.name}, ${response.data.location.country}`
					  )
				setTodayDateInfo(
					dayjs(response.data.location.localtime).format('ddd, M/D/YY h:mma')
				)
				setTodayCondition(response.data.current.condition.icon)
				setTodayTemperature(`${response.data.current.temp_f} °F`)
				setTodayWind(`${response.data.current.wind_mph}MPH`)
				setTodayHumidity(`${response.data.current.humidity}%`)
				setTodayUvi(response.data.current.uv)
			})
			.catch(function (error) {
				console.error(error)
			})

		setSearchHistory([...searchHistory, location])

		localStorage.setItem(
			'searchHistory',
			JSON.stringify([...searchHistory, location])
		)
	}

	function searchHistoryWeather(e) {
		e.preventDefault()
		const searchHistoryLocation = e.target.innerHTML
		axios
			.get(
				`${weatherApiUrl}/current.json?key=${weatherApiKey}&q=${searchHistoryLocation}&aqi=no`
			)
			.then((response) => {
				console.log(response.data)
				response.data.location.country === 'United States of America' || response.data.location.country === 'USA United States of America'
					? setTodayLocation(
							`${response.data.location.name}, ${response.data.location.region}`
					  )
					: setTodayLocation(
							`${response.data.location.name}, ${response.data.location.country}`
					  )
				setTodayDateInfo(
					dayjs(response.data.location.localtime).format('ddd, M/D/YY h:mma')
				)
				setTodayCondition(response.data.current.condition.icon)
				setTodayTemperature(`${response.data.current.temp_f} °F`)
				setTodayWind(`${response.data.current.wind_mph} MPH`)
				setTodayHumidity(`${response.data.current.humidity}%`)
				setTodayUvi(response.data.current.uv)
			})
			.catch((error) => {
				console.log(error)
			})

		axios
			.get(
				`${weatherApiUrl}/forecast.json?key=${weatherApiKey}&q=${searchHistoryLocation}&days=6&aqi=no&alerts=no`
			)
			.then(function (response) {
				console.log(response.data)
				setForecastDate1(
					dayjs(response.data.forecast.forecastday[1].date).format(
						'ddd, M/D/YY'
					)
				)
				setForecastDate2(
					dayjs(response.data.forecast.forecastday[2].date).format(
						'ddd, M/D/YY'
					)
				)
				setForecastDate3(
					dayjs(response.data.forecast.forecastday[3].date).format(
						'ddd, M/D/YY'
					)
				)
				setForecastDate4(
					dayjs(response.data.forecast.forecastday[4].date).format(
						'ddd, M/D/YY'
					)
				)
				setForecastDate5(
					dayjs(response.data.forecast.forecastday[5].date).format(
						'ddd, M/D/YY'
					)
				)
				setForecastCondition1(
					response.data.forecast.forecastday[1].day.condition.icon
				)
				setForecastCondition2(
					response.data.forecast.forecastday[2].day.condition.icon
				)
				setForecastCondition3(
					response.data.forecast.forecastday[3].day.condition.icon
				)
				setForecastCondition4(
					response.data.forecast.forecastday[4].day.condition.icon
				)
				setForecastCondition5(
					response.data.forecast.forecastday[5].day.condition.icon
				)
				setForecastTempHigh1(
					`${response.data.forecast.forecastday[1].day.maxtemp_f} °F`
				)
				setForecastTempHigh2(
					`${response.data.forecast.forecastday[2].day.maxtemp_f} °F`
				)
				setForecastTempHigh3(
					`${response.data.forecast.forecastday[3].day.maxtemp_f} °F`
				)
				setForecastTempHigh4(
					`${response.data.forecast.forecastday[4].day.maxtemp_f} °F`
				)
				setForecastTempHigh5(
					`${response.data.forecast.forecastday[5].day.maxtemp_f} °F`
				)
				setForecastTempLow1(
					`${response.data.forecast.forecastday[1].day.mintemp_f} °F`
				)
				setForecastTempLow2(
					`${response.data.forecast.forecastday[2].day.mintemp_f} °F`
				)
				setForecastTempLow3(
					`${response.data.forecast.forecastday[3].day.mintemp_f} °F`
				)
				setForecastTempLow4(
					`${response.data.forecast.forecastday[4].day.mintemp_f} °F`
				)
				setForecastTempLow5(
					`${response.data.forecast.forecastday[5].day.mintemp_f} °F`
				)
				setForecastRain1(
					`${response.data.forecast.forecastday[1].day.daily_chance_of_rain}%`
				)
				setForecastRain2(
					`${response.data.forecast.forecastday[2].day.daily_chance_of_rain}%`
				)
				setForecastRain3(
					`${response.data.forecast.forecastday[3].day.daily_chance_of_rain}%`
				)
				setForecastRain4(
					`${response.data.forecast.forecastday[4].day.daily_chance_of_rain}%`
				)
				setForecastRain5(
					`${response.data.forecast.forecastday[5].day.daily_chance_of_rain}%`
				)
				setForecastUvi1(response.data.forecast.forecastday[1].day.uv)
				setForecastUvi2(response.data.forecast.forecastday[2].day.uv)
				setForecastUvi3(response.data.forecast.forecastday[3].day.uv)
				setForecastUvi4(response.data.forecast.forecastday[4].day.uv)
				setForecastUvi5(response.data.forecast.forecastday[5].day.uv)
			})
			.catch(function (error) {
				console.error(error)
			})
	}

	function forecastWeather() {
		axios
			.get(forecastWeatherApiUrl)
			.then(function (response) {
				console.log(response.data)
				setForecastDate1(
					dayjs(response.data.forecast.forecastday[1].date).format(
						'ddd, M/D/YY'
					)
				)
				setForecastDate2(
					dayjs(response.data.forecast.forecastday[2].date).format(
						'ddd, M/D/YY'
					)
				)
				setForecastDate3(
					dayjs(response.data.forecast.forecastday[3].date).format(
						'ddd, M/D/YY'
					)
				)
				setForecastDate4(
					dayjs(response.data.forecast.forecastday[4].date).format(
						'ddd, M/D/YY'
					)
				)
				setForecastDate5(
					dayjs(response.data.forecast.forecastday[5].date).format(
						'ddd, M/D/YY'
					)
				)
				setForecastCondition1(
					response.data.forecast.forecastday[1].day.condition.icon
				)
				setForecastCondition2(
					response.data.forecast.forecastday[2].day.condition.icon
				)
				setForecastCondition3(
					response.data.forecast.forecastday[3].day.condition.icon
				)
				setForecastCondition4(
					response.data.forecast.forecastday[4].day.condition.icon
				)
				setForecastCondition5(
					response.data.forecast.forecastday[5].day.condition.icon
				)
				setForecastTempHigh1(
					`${response.data.forecast.forecastday[1].day.maxtemp_f} °F`
				)
				setForecastTempHigh2(
					`${response.data.forecast.forecastday[2].day.maxtemp_f} °F`
				)
				setForecastTempHigh3(
					`${response.data.forecast.forecastday[3].day.maxtemp_f} °F`
				)
				setForecastTempHigh4(
					`${response.data.forecast.forecastday[4].day.maxtemp_f} °F`
				)
				setForecastTempHigh5(
					`${response.data.forecast.forecastday[5].day.maxtemp_f} °F`
				)
				setForecastTempLow1(
					`${response.data.forecast.forecastday[1].day.mintemp_f} °F`
				)
				setForecastTempLow2(
					`${response.data.forecast.forecastday[2].day.mintemp_f} °F`
				)
				setForecastTempLow3(
					`${response.data.forecast.forecastday[3].day.mintemp_f} °F`
				)
				setForecastTempLow4(
					`${response.data.forecast.forecastday[4].day.mintemp_f} °F`
				)
				setForecastTempLow5(
					`${response.data.forecast.forecastday[5].day.mintemp_f} °F`
				)
				setForecastRain1(
					`${response.data.forecast.forecastday[1].day.daily_chance_of_rain}%`
				)
				setForecastRain2(
					`${response.data.forecast.forecastday[2].day.daily_chance_of_rain}%`
				)
				setForecastRain3(
					`${response.data.forecast.forecastday[3].day.daily_chance_of_rain}%`
				)
				setForecastRain4(
					`${response.data.forecast.forecastday[4].day.daily_chance_of_rain}%`
				)
				setForecastRain5(
					`${response.data.forecast.forecastday[5].day.daily_chance_of_rain}%`
				)
				setForecastUvi1(response.data.forecast.forecastday[1].day.uv)
				setForecastUvi2(response.data.forecast.forecastday[2].day.uv)
				setForecastUvi3(response.data.forecast.forecastday[3].day.uv)
				setForecastUvi4(response.data.forecast.forecastday[4].day.uv)
				setForecastUvi5(response.data.forecast.forecastday[5].day.uv)
			})
			.catch(function (error) {
				console.error(error)
			})
	}

	function weatherFetch(e) {
		e.preventDefault()
		todayWeather()
		forecastWeather()
		setLocation('')
	}

	return (
		<Fragment>
			<header>
				<h1 className='header-title'>Weather Dashboard</h1>
			</header>

			<main>
				<div className='search-container'>
					<h2 className='search-label'>Search for a City:</h2>
					<form>
						<div className='search-form-controls'>
							<div>
								<input
									id='search-input'
									className='search-input'
									type='text'
									placeholder='Ex: Atlanta'
									value={location}
									onChange={(e) => setLocation(e.target.value)}
								/>
								<div>
									<button
										id='search-button'
										className='search-button'
										onClick={weatherFetch}>
										Search
									</button>
									<hr />
								</div>
							</div>
						</div>
					</form>

					<div>
						{searchHistory.map((search, index) => (
							<Fragment key={index}>
								<button
									className='search-history-button'
									type='button'
									onClick={searchHistoryWeather}>
									{search}
								</button>
							</Fragment>
						))}
					</div>
				</div>

				<div className='weather-search-results-container'>
					<section className='today-weather-section'>
						<div className='today-card-container'>
							<div className='today-card-body'>
								<div className='today-card-header'>
									<div className='today-card-title-wrapper'>
										<h2 className='today-card-title'>{todayLocation}</h2>
										<div className='today-card-subtitle'>{todayDateInfo}</div>
									</div>
									{todayCondition && (
										<img
											className='today-card-icon'
											src={todayCondition}
											alt='today condition icon'
										/>
									)}
								</div>
								<div className='today-card-info-wrapper'>
									<p className='today-card-text'>
										Temp: &nbsp;
										<span className='today-card-text-info'>
											{todayTemperature}
										</span>
									</p>
									<p className='today-card-text'>
										Wind: &nbsp;
										<span className='today-card-text-info'>{todayWind}</span>
									</p>
									<p className='today-card-text'>
										Humidity: &nbsp;
										<span className='today-card-text-info'>
											{todayHumidity}
										</span>
									</p>
									<p className='today-card-text'>
										UV Index: &nbsp;
										{todayUvi && (
											<button className='today-card-uvi-button'>
												{todayUvi}
											</button>
										)}
									</p>
								</div>
							</div>
						</div>
					</section>

					<section className='forecast-weather-section'>
						<h4 className='forecast-cards-label'>5-Day Forecast:</h4>
						<div className='five-day-card-outer'>
							<div className='five-day-card-inner'>
								<div className='five-day-card-body'>
									<div className='five-day-card-header'>
										<h5 className='five-day-card-title'>{forecastDate1}</h5>
										{forecastCondition1 && (
											<img
												className='five-day-card-icon'
												src={forecastCondition1}
												alt='forecast condition icon'
											/>
										)}
									</div>
									<p className='five-day-card-text'>
										High: {forecastTempHigh1}
									</p>
									<p className='five-day-card-text'>Low: {forecastTempLow1}</p>
									<p className='five-day-card-text'>Rain: {forecastRain1}</p>
									<p className='five-day-card-text'>
										UVI: &nbsp;
										{forecastUvi1 && (
											<button className='five-day-card-uvi-button'>
												{forecastUvi1}
											</button>
										)}
									</p>
								</div>
							</div>
						</div>

						<div className='five-day-card-outer'>
							<div className='five-day-card-inner'>
								<div className='five-day-card-body'>
									<div className='five-day-card-header'>
										<h5 className='five-day-card-title'>{forecastDate2}</h5>
										{forecastCondition2 && (
											<img
												className='five-day-card-icon'
												src={forecastCondition2}
												alt='forecast condition icon'
											/>
										)}
									</div>
									<p className='five-day-card-text'>
										High: {forecastTempHigh2}
									</p>
									<p className='five-day-card-text'>Low: {forecastTempLow2}</p>
									<p className='five-day-card-text'>Rain: {forecastRain2}</p>
									<p className='five-day-card-text'>
										UVI: &nbsp;
										{forecastUvi2 && (
											<button className='five-day-card-uvi-button'>
												{forecastUvi2}
											</button>
										)}
									</p>
								</div>
							</div>
						</div>

						<div className='five-day-card-outer'>
							<div className='five-day-card-inner'>
								<div className='five-day-card-body'>
									<div className='five-day-card-header'>
										<h5 className='five-day-card-title'>{forecastDate3}</h5>
										{forecastCondition3 && (
											<img
												className='five-day-card-icon'
												src={forecastCondition3}
												alt='forecast condition icon'
											/>
										)}
									</div>
									<p className='five-day-card-text'>
										High: {forecastTempHigh3}
									</p>
									<p className='five-day-card-text'>Low: {forecastTempLow3}</p>
									<p className='five-day-card-text'>Rain: {forecastRain3}</p>
									<p className='five-day-card-text'>
										UVI: &nbsp;
										{forecastUvi3 && (
											<button className='five-day-card-uvi-button'>
												{forecastUvi3}
											</button>
										)}
									</p>
								</div>
							</div>
						</div>

						<div className='five-day-card-outer'>
							<div className='five-day-card-inner'>
								<div className='five-day-card-body'>
									<div className='five-day-card-header'>
										<h5 className='five-day-card-title'>{forecastDate4}</h5>
										{forecastCondition4 && (
											<img
												className='five-day-card-icon'
												src={forecastCondition4}
												alt='forecast condition icon'
											/>
										)}
									</div>
									<p className='five-day-card-text'>
										High: {forecastTempHigh4}
									</p>
									<p className='five-day-card-text'>Low: {forecastTempLow4}</p>
									<p className='five-day-card-text'>Rain: {forecastRain4}</p>
									<p className='five-day-card-text'>
										UVI: &nbsp;
										{forecastUvi4 && (
											<button className='five-day-card-uvi-button'>
												{forecastUvi4}
											</button>
										)}
									</p>
								</div>
							</div>
						</div>

						<div className='five-day-card-outer'>
							<div className='five-day-card-inner'>
								<div className='five-day-card-body'>
									<div className='five-day-card-header'>
										<h5 className='five-day-card-title'>{forecastDate5}</h5>
										{forecastCondition5 && (
											<img
												className='five-day-card-icon'
												src={forecastCondition5}
												alt='forecast condition icon'
											/>
										)}
									</div>
									<p className='five-day-card-text'>
										High: {forecastTempHigh5}
									</p>
									<p className='five-day-card-text'>Low: {forecastTempLow5}</p>
									<p className='five-day-card-text'>Rain: {forecastRain5}</p>
									<p className='five-day-card-text'>
										UVI: &nbsp;
										{forecastUvi5 && (
											<button className='five-day-card-uvi-button'>
												{forecastUvi5}
											</button>
										)}
									</p>
								</div>
							</div>
						</div>
					</section>
				</div>
			</main>
		</Fragment>
	)
}
