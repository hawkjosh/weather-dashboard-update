import React from 'react'

const Forecast1066 = () => {
	return (
		<svg viewBox='0 0 64 64'>
			<g id='weather-icon'>
				<g id='sun-partial'>
					<circle
						fill='hsl(60, 100%, 50%)'
						stroke='hsl(51, 100%, 50%)'
						strokeWidth='2'
						r='12'
						cx='24'
						cy='24'
					/>
					<path
						stroke='hsl(51, 100%, 50%)'
						strokeWidth='2'
						strokeLinecap='round'
						d='M37.85640646 16l4.330127019 -2.5M32 10.14359354l2.5 -4.330127019M24 8v-6M16 10.14359354l-2.5 -4.330127019M10.14359354 16l-4.330127019 -2.5M8 24h-6M10.14359354 32l-4.330127019 2.5'
					/>
				</g>
				<path
					id='cloud-small'
					fill='hsl(0, 0%, 75%)'
					stroke='hsl(0, 0%, 50%)'
					strokeWidth='2'
					d='M56 51h-37a1 1 0 0 1 -1 -14a10 10 0 0 1 12 -10a5 5 0 0 1 24 7a8.7 8.7 0 0 1 2 17z'
				/>
				<path
					id='snowflake'
					stroke='hsl(0, 0%, 90%)'
					strokeWidth='0.75'
					strokeLinecap='round'
					d='M34.5 58h5m-2.5 -2.5v5m-2 -0.5l4 -4m0 4l-4 -4'
				/>
			</g>
		</svg>
	)
}

export default Forecast1066
