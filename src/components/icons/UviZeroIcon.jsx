import React from 'react'

const UviZeroIcon = ({ number }) => {
	return (
		<svg viewBox='0 0 50 47.5'>
			<path
				id='uvi-scale'
				fill='transparent'
				stroke='hsl(0, 0%, 80%)'
				strokeWidth='6.5'
				strokeLinecap='round'
				d='M14.25 43.6195461 A 21.5 21.5 0 1 1 35.75 43.6195461'
			/>

			<g
				id='uvi-text'
				fill='hsl(0, 0%, 100%)'
				fontFamily='"Farsan", cursive'
				textAnchor='middle'>
				<text
					id='uvi-number'
					x='50%'
					y='62.5%'
					fontSize='1.375rem'
					fontWeight='bold'>
					{number}
				</text>
				<text
					id='uvi-label'
					x='50%'
					y='85%'
					fontSize='0.5rem'>
					UVI
				</text>
			</g>
		</svg>
	)
}

export default UviZeroIcon
