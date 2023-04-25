import React from 'react'

const HumidityIcon = ({ percentage, ...props }) => {
	return (
		<svg
			viewBox='0 0 100 120'
			{...props}>
			<g
				fill='transparent'
				stroke='hsl(39, 100%, 50%)'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'>
				<path
					stroke='hsl(200, 100%, 50%)'
					d='M38.9375 15.16c0 0-1.9375 2.84-5.29 6.6125-4.6475 5.2275-3.6475 4.2275-10.58 13.225-3.9675 5.29-9.2575 15.87-9.2575 26.45a1.3225 1.3225 90 0050.255 0c0-10.58-5.29-21.16-9.2575-26.45-6.8075-8.9975-5.8075-7.9975-10.58-13.225-3.2275-3.7725-5.29-6.6125-5.29-6.6125z'
				/>

				<path d='M68 47.9c6.6125-13.225 13.225 0 19.8375-13.225m-25.1275 2.645c6.6125-13.225 13.225 0 19.8375-13.225m-27.7725 2.645c6.6125-13.225 13.225 0 19.8375-13.225' />

				<path
					strokeWidth='3'
					d='M49.875 1.725a1.15 1.15 90 000 94.3 1.15 1.15 90 000-94.305Z'
				/>
			</g>

			<text
				id='humidity-text'
				fontFamily='"Open Sans", sans-serif'
				fill='hsl(0, 0%, 100%)'
				textAnchor='middle'
				fontSize='18px'
				fontWeight='bold'
				x='40%'
				y='52.5%'>
				{percentage}%
			</text>
			<text
				id='humidity-label'
				fontSize='18px'
				fill='hsl(0, 0%, 100%)'
				fontFamily='"Open Sans", sans-serif'
				textAnchor='middle'
				x='50%'
				y='97%'>
				Humidity
			</text>
		</svg>
	)
}

export default HumidityIcon
