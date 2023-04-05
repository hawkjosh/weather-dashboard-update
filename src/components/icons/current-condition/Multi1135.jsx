import React from 'react'

const Multi1135 = ({ temperature, conditionText, ...props }) => {
	return (
		<svg
			viewBox='0 0 128 144'
			{...props}>
			<g id='weather-icon'>
				<path
					id='cloud-large'
					fill='hsl(0, 0%, 100%)'
					stroke='hsl(0, 0%, 75%)'
					strokeWidth='4'
					d='M108 94h-85a2 2 90 01-2-32 23 23 90 0128-23 10 10 90 0155 16 20 20 90 014 39z'
				/>
				<path
					id='wavy-line'
					fill='transparent'
					stroke='hsl(0, 0%, 85%)'
					strokeWidth='2.5'
					strokeLinecap='round'
					d='M24 108q20-10 40 0 20 10 40 0m-80 8q20-10 40 0 20 10 40 0'
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

export default Multi1135
