import React from 'react'

const Day1069 = ({ temperature, conditionText, ...props }) => {
	return (
		<svg
			viewBox='0 0 128 144'
			{...props}>
			<g id='weather-icon'>
				<path
					id='sun-partial'
					fill='hsl(60, 100%, 50%)'
					stroke='hsl(51, 100%, 50%)'
					strokeWidth='4'
					strokeLinecap='round'
					d='M48 24a1 1 0 000 48 1 1 0 000-48zm27.7128 8 8.6603-5m-20.373-6.713 5-8.6603m-21 4.373v-12m-16 16.287-5-8.6603m-6.713 20.374-8.6603-5m4.373 21h-12m16.287 16-8.6603 5'
				/>
				<path
					id='cloud-small'
					fill='hsl(0, 0%, 75%)'
					stroke='hsl(0, 0%, 50%)'
					strokeWidth='4'
					d='M112 102h-74a2 2 0 0 1 -2 -28a20 20 0 0 1 24 -20a10 10 0 0 1 48 14a17.4 17.4 0 0 1 4 34z'
				/>
				<path
					id='rain'
					fill='hsl(240, 100%, 50%)'
					d='M62 110c-4 4-4 12 0 12 4 0 4-8 0-12zm12 0c-4 4-4 12 0 12 4 0 4-8 0-12z'
				/>
				<path
					id='snowflake'
					stroke='hsl(0, 0%, 90%)'
					strokeWidth='1.5'
					strokeLinecap='round'
					d='M84 116h10m-5-5v10m-4-1 8-8m0 8-8-8'
				/>
			</g>

			<g
				id='condition-text'
				fontFamily='"Open Sans", sans-serif'
				fontWeight='bold'
				textAnchor='middle'
				>
				<text
					id='current-temp'
					x='58%'
					y='62%'
					fontSize='14px'
					fill='hsl(263, 80%, 22%)'>
					{`${temperature} °F`}
				</text>
				<text
					id='current-condition'
					x='50%'
					y='95%'
					fontSize='10px'
					fill='hsl(200, 100%, 50%)'>
					{conditionText}
				</text>
			</g>
		</svg>
	)
}

export default Day1069
