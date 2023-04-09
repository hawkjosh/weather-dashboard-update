import React from 'react'

const Forecast1147 = () => {
	return (
		<svg viewBox='0 0 64 64'>
			<g id='weather-icon'>
				<path
					id='cloud-large'
					fill='hsl(0, 0%, 100%)'
					stroke='hsl(0, 0%, 75%)'
					strokeWidth='2'
					d='M54 47h-42.5a1 1 0 0 1 -1 -16a11.5 11.5 0 0 1 14 -11.5a5 5 0 0 1 27.5 8a10 10 0 0 1 2 19.5z'
				/>
				<path
					id='arrow-down'
					fill='transparent'
					stroke='hsl(0, 0%, 85%)'
					strokeLinejoin='round'
					d='M18 53.5l-2 5l-2 -5h4z'
				/>
				<g
					id='wavy-line'
					fill='transparent'
					stroke='hsl(0, 0%, 85%)'
					strokeWidth='1.25'
					strokeLinecap='round'>
					<path d='M21 54q7.5 -5 15 0q7.5 5 15 0' />
					<path d='M21 58q7.5 -5 15 0q7.5 5 15 0' />
				</g>
			</g>
		</svg>
	)
}

export default Forecast1147
