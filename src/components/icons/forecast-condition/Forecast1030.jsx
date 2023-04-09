import React from 'react'

const Forecast1030 = () => {
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
					id='wavy-line'
					fill='transparent'
					stroke='hsl(0, 0%, 85%)'
					strokeWidth='1.25'
					strokeLinecap='round'
					d='M12 56q10 -5 20 0q10 5 20 0'
				/>
			</g>
		</svg>
	)
}

export default Forecast1030
