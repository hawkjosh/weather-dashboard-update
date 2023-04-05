import React from 'react'

const Day1000 = ({ temperature, conditionText, ...props }) => {
	return (
		<svg
			viewBox='0 0 128 128'
			{...props}>
			<g id='weather-icon'>
				<path
					id='sun-full'
					fill='hsl(60, 100%, 50%)'
					stroke='hsl(50, 100%, 50%)'
					strokeWidth='3.3'
					strokeLinecap='round'
					d='M64 28.5a1.65 1.65 90 000 52.8 1.65 1.65 90 000-52.8zm33 26.4h16.5m-20.9203-16.5 11.4315-6.6m-23.5109-5.4797 6.6-11.4315m-23.1 7.0108v-16.5m-16.5 20.922-6.6-11.4315m-5.4797 23.5092-11.4315-6.6m7.0108 23.1h-16.5m20.9203 16.5-11.4315 6.6m23.5109 5.4797-6.6 11.4315m23.1-7.0108v16.5m16.5-20.9203 6.6 11.4315m5.4797-23.5109 11.4315 6.6'
				/>
			</g>

			<g
				id='condition-text'
				textAnchor='middle'>
				<text
					id='current-temp'
					x='50%'
					y='47.5%'
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

export default Day1000
