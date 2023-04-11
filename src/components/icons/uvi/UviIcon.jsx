import React from 'react'

const fillColor = {
	10: 'hsl(0, 100%, 45%)',
	9: 'hsl(12.5, 100%, 50%)',
	8: 'hsl(20, 100%, 50%)',
	7: 'hsl(30, 100%, 50%)',
	6: 'hsl(40, 100%, 50%)',
	5: 'hsl(50, 100%, 50%)',
	4: 'hsl(60, 100%, 50%)',
	3: 'hsl(80, 100%, 50%)',
	2: 'hsl(100, 100%, 50%)',
	1: 'hsl(120, 100%, 45%)',
}

const UviIcon = ({ number, ...props }) => {
	return (
		<svg
			viewBox='0 0 100 120'
			{...props}>
			<g
				id='uvi-icon'
				strokeWidth='1.25'
				stroke='hsl(0, 0%, 80%)'>
				<path
					id='uvi-scale'
					fill='hsl(0, 0%, 80%)'
					d='M26 91.6a48 48 0 1148 0 1 1 0 11-4-7 40 40 0 10-40 0 1 1 0 11-4 7Z'
				/>

				{number >= 10 && (
					<path
						id='uvi-ten'
						fill='hsl(0, 100%, 45%)'
						d='M26 91.6a48 48 0 1148 0 1 1 0 11-4-7 40 40 0 10-40 0 1 1 0 11-4 7Z'
					/>
				)}

				{number >= 9 && (
					<path
						id='uvi-nine'
						fill='hsl(12.5, 100%, 50%)'
						d='M26 91.6a48 48 0 1165.6-17.6 1 1 0 11-7-4 40 40 0 10-54.6 14.6 1 1 0 11-4 7Z'
					/>
				)}

				{number >= 8 && (
					<path
						id='uvi-eight'
						fill='hsl(20, 100%, 50%)'
						d='M26 91.6a48 48 0 1172-41.6 1 1 0 11-8 0 40 40 0 10-60 34.6 1 1 0 11-4 7Z'
					/>
				)}

				{number >= 7 && (
					<path
						id='uvi-seven'
						fill='hsl(30, 100%, 50%)'
						d='M26 91.6a48 48 0 1165.6-65.6 1 1 0 11-7 4 40 40 0 10-54.6 54.6 1 1 0 11-4 7Z'
					/>
				)}

				{number >= 6 && (
					<path
						id='uvi-six'
						fill='hsl(40, 100%, 50%)'
						d='M26 91.6a48 48 0 1148-83.2 1 1 0 11-4 7 1 1 0 10-40 69.2 1 1 0 11-4 7Z'
					/>
				)}

				{number >= 5 && (
					<path
						id='uvi-five'
						fill='hsl(50, 100%, 50%)'
						d='M26 91.6a48 48 0 0124-89.6 1 1 0 110 8 40 40 0 00-20 74.6 1 1 0 11-4 7Z'
					/>
				)}

				{number >= 4 && (
					<path
						id='uvi-four'
						fill='hsl(60, 100%, 50%)'
						d='M26 91.6a48 48 0 010-83.2 1 1 0 114 7 40 40 0 000 69.2 1 1 0 11-4 7Z'
					/>
				)}

				{number >= 3 && (
					<path
						id='uvi-three'
						fill='hsl(80, 100%, 50%)'
						d='M26 91.6a48 48 0 01-17.6-65.6 1 1 0 117 4 40 40 0 0014.6 54.6 1 1 0 11-4 7Z'
					/>
				)}

				{number >= 2 && (
					<path
						id='uvi-two'
						fill='hsl(100, 100%, 50%)'
						d='M26 91.6a48 48 0 01-24-41.6 1 1 0 118 0 40 40 0 0020 34.6 1 1 0 11-4 7Z'
					/>
				)}

				{number >= 1 && (
					<path
						id='uvi-one'
						fill='hsl(120, 100%, 45%)'
						d='M26 91.6a48 48 0 01-17.6-17.6 1 1 0 117-4 40 40 0 0014.6 14.6 1 1 0 11-4 7Z'
					/>
				)}
			</g>

			<text
				id='uvi-text'
				fontSize='60px'
				fill={fillColor[number]}
				fontFamily='"Farsan", cursive'
				fontWeight='bold'
				textAnchor='middle'
				x='50%'
				y='57.5%'>
				{number}
			</text>
			<text
				id='uvi-label'
				fontSize='18px'
				fill='hsl(0, 0%, 100%)'
				fontFamily='"Open Sans", sans-serif'
				textAnchor='middle'
				x='50%'
				y='97%'>
				UV Index
			</text>
		</svg>
	)
}

export default UviIcon
