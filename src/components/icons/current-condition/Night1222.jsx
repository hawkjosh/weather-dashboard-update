import React from 'react'

const Night1222 = ({ temperature, conditionText, ...props }) => {
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
					id='snowflake'
					stroke='hsl(0, 0%, 90%)'
					strokeWidth='1.5'
					strokeLinecap='round'
					d='M51 116h10m-5-5v10m-4-1 8-8m0 8-8-8m15 4h10m-5-5v10m-4-1 8-8m0 8-8-8'
				/>
			</g>

			<g
				id='condition-text'
				textAnchor='middle'>
				<text
					id='current-temp'
					x='50%'
					y='62%'
					fill='hsl(263, 80%, 22%)'>
					{`${temperature} °F`}
				</text>
				<text
					id='current-condition'
					x='50%'
					y='94%'
					fill='hsl(200, 100%, 50%)'>
					{conditionText}
				</text>
			</g>
		</svg>
	)
}

export default Night1222