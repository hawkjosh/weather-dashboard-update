import React from 'react'

const style = {
	border: '0.125rem solid hsl(0, 0%, 100%)',
	borderRadius: '25%',
}

const Forecast1171 = () => {
	return (
		<svg
			viewBox='0 0 64 64'
			style={style}>
			<g id='weather-icon'>
				<path
					id='cloud-large'
					fill='hsl(0, 0%, 75%)'
					stroke='hsl(0, 0%, 50%)'
					strokeWidth='2'
					d='M54 47h-42.5a1 1 0 0 1 -1 -16a11.5 11.5 0 0 1 14 -11.5a5 5 0 0 1 27.5 8a10 10 0 0 1 2 19.5z'
				/>
				<path
					id='arrow-down'
					fill='transparent'
					stroke='hsl(0, 0%, 85%)'
					strokeLinejoin='round'
					d='M19 53.5l-2 5l-2 -5h4z'
				/>
				<g
					id='freezing-rain'
					fill='hsl(0, 0%, 85%)'
					stroke='hsl(240, 100%, 50%)'
					strokeWidth='0.75'>
					<path d='M24 53c-2 2 -2 6 0 6c2 0 2 -4 0 -6z' />
					<path d='M30 53c-2 2 -2 6 0 6c2 0 2 -4 0 -6z' />
					<path d='M36 53c-2 2 -2 6 0 6c2 0 2 -4 0 -6z' />
					<path d='M42 53c-2 2 -2 6 0 6c2 0 2 -4 0 -6z' />
					<path d='M48 53c-2 2 -2 6 0 6c2 0 2 -4 0 -6z' />
				</g>
			</g>
		</svg>
	)
}

export default Forecast1171
