import React from 'react'

const Night1000 = ({ temperature, conditionText, ...props }) => {
	return (
		<svg
			viewBox='0 0 128 128'
			{...props}>
			<g id='weather-icon'>
				<path
					id='moon-full'
					fill='hsl(0, 0%, 100%)'
					stroke='hsl(240, 100%, 50%)'
					strokeWidth='2'
					d='M79.8 10.2a47.5 47.5 90 100 91.2 53.2 53.2 90 010-91.2z'
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
					x='67.5%'
					y='47.5%'
					fontSize='14px'
					fill='hsl(0, 0%, 100%)'>
					{`${temperature} °F`}
				</text>
				<text
					id='current-condition'
					x='50%'
					y='94%'
					fontSize='10px'
					fill='hsl(200, 100%, 50%)'>
					{conditionText}
				</text>
			</g>

		</svg>
	)
}

export default Night1000
