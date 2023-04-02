import React from 'react'

const UviOneIcon = ({ number }) => {
	return (
		<svg viewBox='0 0 50 47.5'>
			<g
				id='uvi-icon'
				fill='transparent'
				strokeWidth='6.5'
				strokeLinecap='round'>
				<path
					id='uvi-scale'
					stroke='hsl(0, 0%, 80%)'
					d='M14.25 43.6195461 A 21.5 21.5 0 1 1 35.75 43.6195461'
				/>
				<path
					id='uvi-one'
					stroke='hsl(120, 100%, 45%)'
					d='M14.25 43.6195461 A 21.5 21.5 0 0 1 6.3804539 35.75'
				/>
			</g>

			<g
				id='uvi-text'
				fill='hsl(120, 100%, 45%)'
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

export default UviOneIcon
