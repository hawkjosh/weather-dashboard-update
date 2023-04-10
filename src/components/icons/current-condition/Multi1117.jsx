import React from 'react'

const Multi1117 = ({ temperature, conditionText, ...props }) => {
	return (
		<svg
			viewBox='0 0 128 144'
			{...props}>
			<g id='weather-icon'>
				<path
					id='cloud-large'
					fill='hsl(0, 0%, 75%)'
					stroke='hsl(0, 0%, 50%)'
					strokeWidth='4'
					d='M108 94h-85a2 2 90 01-2-32 23 23 90 0128-23 10 10 90 0155 16 20 20 90 014 39z'
				/>
				<path
					id='snowflake'
					stroke='hsl(0, 0%, 85%)'
					strokeWidth='1.5'
					strokeLinecap='round'
					d='M29 112h10m-5-5v10m-4-1 8-8m0 8-8-8m13 4h10m-5-5v10m-4-1 8-8m0 8-8-8'
				/>
				<path
					id='wavy-line'
					fill='transparent'
					stroke='hsl(0, 0%, 85%)'
					strokeWidth='2.5'
					strokeLinecap='round'
					d='M58 108q10-5 20 0 10 5 20 0m-40 8q10-5 20 0 5 2.5 10 2'
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
					x='50%'
					y='55%'
					fontSize='14px'
					fill='hsl(263, 80%, 22%)'>
					{`${temperature} °F`}
				</text>
				<text
					id='current-condition'
					x='50%'
					y='93%'
					fontSize='10px'
					fill='hsl(200, 100%, 50%)'>
					{conditionText}
				</text>
			</g>
		</svg>
	)
}

export default Multi1117
