import React from 'react'

const WindIcon = ({ speed, direction, ...props }) => {
	return (
		<svg
			viewBox='0 0 108 130'
			{...props}>
			<defs>
				<marker
					id='arrow-one'
					viewBox='0 0 10 10'
					refX='5'
					refY='5'
					markerWidth='8'
					markerHeight='8'
					orient='auto'>
					<path
						d='M0 0l10 5l-10 5z'
						fill='hsl(0, 0%, 100%)'
					/>
				</marker>
				<marker
					id='arrow-two'
					viewBox='0 0 10 10'
					refX='5'
					refY='5'
					markerWidth='6'
					markerHeight='6'
					orient='auto'>
					<path
						d='M0 0l10 5l-10 5z'
						fill='hsl(60, 100%, 50%)'
					/>
				</marker>
				<marker
					id='circle'
					viewBox='0 0 10 10'
					refX='5'
					refY='5'
					markerWidth='8'
					markerHeight='8'>
					<path
						d='M5 2a1 1 0 0 0 0 6a1 1 0 0 0 0 -6z'
						fill='hsl(60, 100%, 50%)'
					/>
				</marker>
			</defs>

			<circle
				fill='transparent'
				strokeDasharray='0.75'
				stroke='hsl(0, 0%, 100%)'
				r='48'
				cx='54'
				cy='52'
			/>
			<g
				stroke='hsl(0, 0%, 100%)'
				strokeWidth='1.25'>
				<path
					d='M54 102v-99'
					strokeWidth='0.625'
					markerEnd='url(#arrow-one)'
				/>
				<path d='M4 52h100m-50 -50v100' />
				<path d='M7.806 71.134l92.388 -38.268' />
				<path d='M18.645 87.356l70.711 -70.711' />
				<path d='M34.866 98.194l38.268 -92.388 ' />
				<path d='M73.134 98.194l-38.268 -92.388' />
				<path d='M89.355 87.355l-70.711 -70.711' />
				<path d='M100.194 71.134l-92.388 -38.268' />
			</g>
			<circle
				r='46.5'
				cx='54'
				cy='52'
				fill='hsl(200, 100%, 50%)'
			/>

			<g
				id='wind-label-text'
				fill='hsl(263, 80%, 22%)'
				fontSize='14px'
				fontWeight='bold'
				fontFamily='"Farsan", cursive'
				textAnchor='middle'>
				<text
					id='north-label'
					x='50%'
					y='15%'>
					N
				</text>
				<text
					id='east-label'
					x='85%'
					y='44%'>
					E
				</text>
				<text
					id='south-label'
					x='50%'
					y='73%'>
					S
				</text>
				<text
					id='west-label'
					x='15%'
					y='44%'>
					W
				</text>
			</g>

			<g
				stroke='hsl(60, 100%, 50%)'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				markerEnd='url(#arrow-two)'
				markerStart='url(#circle)'>
				{direction === 'E' && (
					<path
						id='DueE'
						d='M4 52h100'
					/>
				)}
				{direction === 'ENE' && (
					<path
						id='ENE'
						d='M7.806 71.134l92.388 -38.268'
					/>
				)}
				{direction === 'NE' && (
					<path
						id='NE'
						d='M18.645 87.356l70.711 -70.711'
					/>
				)}
				{direction === 'NNE' && (
					<path
						id='NNE'
						d='M34.866 98.194l38.268 -92.388 '
					/>
				)}
				{direction === 'N' && (
					<path
						id='DueN'
						d='M54 102v-100'
					/>
				)}
				{direction === 'NNW' && (
					<path
						id='NNW'
						d='M73.134 98.194l-38.268 -92.388'
					/>
				)}
				{direction === 'NW' && (
					<path
						id='NW'
						d='M89.355 87.355l-70.711 -70.711'
					/>
				)}
				{direction === 'WNW' && (
					<path
						id='WNW'
						d='M100.194 71.134l-92.388 -38.268'
					/>
				)}
				{direction === 'W' && (
					<path
						id='DueW'
						d='M104 52h-100'
					/>
				)}
				{direction === 'WSW' && (
					<path
						id='WSW'
						d='M100.194 32.866l-92.388 38.268'
					/>
				)}
				{direction === 'SW' && (
					<path
						id='SW'
						d='M89.356 16.645l-70.711 70.711'
					/>
				)}
				{direction === 'SSW' && (
					<path
						id='SSW'
						d='M73.134 5.806l-38.268 92.388'
					/>
				)}
				{direction === 'S' && (
					<path
						id='DueS'
						d='M54 2v100'
					/>
				)}
				{direction === 'SSE' && (
					<path
						id='SSE'
						d='M34.866 5.806l38.268 92.388'
					/>
				)}
				{direction === 'SE' && (
					<path
						id='SE'
						d='M18.645 16.645l70.711 70.711'
					/>
				)}
				{direction === 'ESE' && (
					<path
						id='ESE'
						d='M7.806 32.866l92.388 38.268'
					/>
				)}
			</g>

			<circle
				r='30'
				cx='54'
				cy='52'
				fill='hsl(263, 80%, 22%)'
			/>

			<g
				id='wind-text'
				fontFamily='"Farsan", cursive'
				fill='hsl(60, 100%, 50%)'
				textAnchor='middle'>
				<text
					id='speed-text'
					fontSize='30px'
					fontWeight='bold'
					x='50%'
					y='44%'>
					{speed}
				</text>
				<text
					id='mph-label'
					fontSize='16px'
					fontStyle='italic'
					x='50%'
					y='56%'>
					mph
				</text>
				<text
					id='wind-label'
					fontSize='20px'
					fill='hsl(0, 0%, 100%)'
					fontFamily='"Open Sans", sans-serif'
					x='50%'
					y='97%'>
					Wind
				</text>
			</g>
		</svg>
	)
}

export default WindIcon
