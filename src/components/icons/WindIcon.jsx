import React from 'react'

const WindIcon = ({ speed, direction, ...props }) => {
	return (
		<svg
			viewBox='0 0 45 45'
			style={{ backgroundColor: 'hsl(200, 50%, 75%)', borderRadius: '25%', border: '2px solid hsl(263, 80%, 22%)' }}
			{...props}>
			<path
				id='wind-icon'
				fill='transparent'
				stroke='hsl(0, 0%, 100%)'
				strokeWidth='1.75'
				strokeLinecap='round'
				d='M7.5 32.25q5 5 15 0t15 0m-30 4q5 5 15 0t15 0m-30 4q5 5 15 0t15 0'
			/>

			<g
				id='wind-icon-text'
				fill='hsl(263, 80%, 22%)'
				fontFamily='"Open Sans", sans-serif'
				textAnchor='middle'>
				<text
					id='wind-speed-number'
					x='50%'
					y='40%'
					fontSize='1.125rem'
					fontWeight='bold'>
					{speed}
				</text>
				<text
					id='wind-speed-label'
					x='50%'
					y='60%'
					fontSize='0.625rem'
					fontStyle='italic'
					fill='hsl(219, 57%, 47%)'>
					mph
				</text>
				<text
					id='wind-direction'
					x='50%'
					y='90%'
					fontSize='0.75rem'
					fontWeight='bold'>
					{direction}
				</text>
			</g>
		</svg>
	)
}

export default WindIcon
