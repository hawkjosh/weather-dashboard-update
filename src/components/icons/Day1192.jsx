import React from 'react'

const style = {
	border: '0.125rem solid hsl(0, 0%, 100%)',
	borderRadius: '25%',
}

const Day1192 = ({ temperature }) => {
	return (
		<svg
			viewBox='0 0 64 64'
			style={style}>
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
				<g
					id='rain'
					fill='hsl(240, 100%, 50%)'>
					<path d='M28 55c-2 2 -2 6 0 6c2 0 2 -4 0 -6z' />
					<path d='M34 55c-2 2 -2 6 0 6c2 0 2 -4 0 -6z' />
					<path d='M40 55c-2 2 -2 6 0 6c2 0 2 -4 0 -6z' />
					<path d='M46 55c-2 2 -2 6 0 6c2 0 2 -4 0 -6z' />
				</g>
			</g>

			<text
				id='current-temp'
				x='58%'
				y='68%'
				fill='hsl(263, 80%, 22%)'
				fontSize='0.5rem'
				fontFamily='"Open Sans", sans-serif'
				fontWeight='bold'
				textAnchor='middle'
				textLength='24'>
				{temperature}
			</text>
		</svg>
	)
}

export default Day1192
