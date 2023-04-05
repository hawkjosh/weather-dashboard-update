import React from 'react'

const Multi1171 = ({ temperature, conditionText, ...props }) => {
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
					id='arrow-down'
					fill='transparent'
					stroke='hsl(0, 0%, 85%)'
					strokeWidth='2'
					strokeLinejoin='round'
					d='M38 107l-4 10-4-10h8z'
				/>
				<path
					id='freezing-rain'
					fill='hsl(0, 0%, 85%)'
					stroke='hsl(240, 100%, 50%)'
					strokeWidth='1.5'
					d='M48 106c-4 4-4 12 0 12 4 0 4-8 0-12zm12 0c-4 4-4 12 0 12 4 0 4-8 0-12zm12 0c-4 4-4 12 0 12 4 0 4-8 0-12zm12 0c-4 4-4 12 0 12 4 0 4-8 0-12zm12 0c-4 4-4 12 0 12 4 0 4-8 0-12z'
				/>
			</g>

			<g
				id='condition-text'
				textAnchor='middle'>
				<text
					id='current-temp'
					x='50%'
					y='55%'
					fill='hsl(263, 80%, 22%)'>
					{`${temperature} °F`}
				</text>
				<text
					id='current-condition'
					x='50%'
					y='93%'
					fill='hsl(200, 100%, 50%)'>
					{conditionText}
				</text>
			</g>
		</svg>
	)
}

export default Multi1171
