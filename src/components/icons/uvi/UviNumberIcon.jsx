import React from 'react'

const fillColor = {
	10: 'hsl(0, 100%, 45%)',
	9: 'hsl(10, 100%, 50%)',
	8: 'hsl(20, 100%, 50%)',
	7: 'hsl(30, 100%, 50%)',
	6: 'hsl(40, 100%, 50%)',
	5: 'hsl(50, 100%, 50%)',
	4: 'hsl(60, 100%, 50%)',
	3: 'hsl(80, 100%, 50%)',
	2: 'hsl(100, 100%, 50%)',
	1: 'hsl(120, 100%, 45%)',
}

const UviNumberIcon = ({ number }) => {
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

				{number >= 10 && (
					<path
						id='uvi-ten'
						stroke='hsl(0, 100%, 45%)'
						d='M14.25 43.6195461 A 21.5 21.5 0 1 1 35.75 43.6195461'
					/>
				)}

				{number >= 9 && (
					<path
						id='uvi-nine'
						stroke='hsl(10, 100%, 50%)'
						d='M14.25 43.6195461 A 21.5 21.5 0 1 1 43.6195461 35.75'
					/>
				)}

				{number >= 8 && (
					<path
						id='uvi-eight'
						stroke='hsl(20, 100%, 50%)'
						d='M14.25 43.6195461 A 21.5 21.5 0 1 1 46.5 25'
					/>
				)}

				{number >= 7 && (
					<path
						id='uvi-seven'
						stroke='hsl(30, 100%, 50%)'
						d='M14.25 43.6195461 A 21.5 21.5 0 1 1 43.6195461 14.25'
					/>
				)}

				{number >= 6 && (
					<path
						id='uvi-six'
						stroke='hsl(40, 100%, 50%)'
						d='M14.25 43.6195461 A 21.5 21.5 0 1 1 35.75 6.3804539'
					/>
				)}

				{number >= 5 && (
					<path
						id='uvi-five'
						stroke='hsl(50, 100%, 50%)'
						d='M14.25 43.6195461 A 21.5 21.5 0 0 1 25 3.5'
					/>
				)}

				{number >= 4 && (
					<path
						id='uvi-four'
						stroke='hsl(60, 100%, 50%)'
						d='M14.25 43.6195461 A 21.5 21.5 0 0 1 14.25 6.3804539'
					/>
				)}

				{number >= 3 && (
					<path
						id='uvi-three'
						stroke='hsl(80, 100%, 50%)'
						d='M14.25 43.6195461 A 21.5 21.5 0 0 1 6.3804539 14.25'
					/>
				)}

				{number >= 2 && (
					<path
						id='uvi-two'
						stroke='hsl(100, 100%, 50%)'
						d='M14.25 43.6195461 A 21.5 21.5 0 0 1 3.5 25'
					/>
				)}

				{number >= 1 && (
					<path
						id='uvi-one'
						stroke='hsl(120, 100%, 45%)'
						d='M14.25 43.6195461 A 21.5 21.5 0 0 1 6.3804539 35.75'
					/>
				)}
			</g>

			<g
				id='uvi-text'
				fill={fillColor[number]}
				textAnchor='middle'>
				<text
					id='uvi-number'
					x='50%'
					y='60%'>
					{number}
				</text>
				<text
					id='uvi-label'
					x='50%'
					y='85%'>
					UVI
				</text>
			</g>
		</svg>
	)
}

export default UviNumberIcon
