import React from 'react'

const HumidityIcon = ({ percentage, ...props }) => {
	return (
		<svg
			viewBox='0 0 85 85'
			{...props}>
			<circle
				r='41'
				cx='42.5'
				cy='42.5'
				stroke='hsl(0, 0%, 100%)'
				strokeWidth='3'
				fill='transparent'
			/>

			<path
				stroke='hsl(39, 100%, 50%)'
				strokeWidth='2.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='transparent'
				d='
    M35 16c0 0-1 2-4 5-3 4-4 4-8 10-3 4-7 12-7 20a1 1 0 0038 0c0-8-4-16-7-20-4-6-5-6-8-10-3-3-4-5-4-5zm25 24c5-10 10 0 15-10m-19 2c5-10 10 0 15-10m-21 2c5-10 10 0 15-10
  '
			/>

			<text
				id='humidity-text'
				fontFamily='"Farsan", cursive'
				fill='hsl(0, 0%, 100%)'
				textAnchor='middle'
				fontSize='15px'
				fontWeight='bold'
				x='42%'
				y='66%'>
				{percentage}
			</text>
		</svg>
	)
}

export default HumidityIcon
