import React from 'react'

const Night1063 = ({ temperature, conditionText, ...props }) => {
	return (
		<svg
			viewBox='0 0 128 144'
			{...props}>
			<g id='weather-icon'>
				<path
					id='moon-partial'
					fill='hsl(0, 0%, 100%)'
					stroke='hsl(240, 100%, 50%)'
					strokeWidth='4'
					d='M52 8a35 35 0 1 0 0 68a40 40 0 0 1 0 -68z'
				/>
				<path
					id='cloud-small'
					fill='hsl(0, 0%, 75%)'
					stroke='hsl(0, 0%, 50%)'
					strokeWidth='4'
					d='M106.5 102h-81.4a2.2 2 0 01-2.2-28 22 20 0 0126.4-20 11 10 0 0152.8 14 19.14 17.4 0 014.4 34z'
				/>
				<path
					id='rain'
					fill='hsl(240, 100%, 50%)'
					d='M58 110c-4 4-4 12 0 12 4 0 4-8 0-12zm12 0c-4 4-4 12 0 12 4 0 4-8 0-12z'
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
					y='62%'
					fontSize='14px'
					fill='hsl(263, 80%, 22%)'>
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

export default Night1063
