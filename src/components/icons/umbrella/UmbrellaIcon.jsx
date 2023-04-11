import React from 'react'

const UmbrellaIcon = ({ number, ...props }) => {
	return (
		<svg
			viewBox='0 0 80 64'
			{...props}>
			<g id='umbrella-icon'>
				<path
					fill='hsl(16, 100%, 50%)'
					d='M2 40a10 10 0 0 1 7 -3a10 10 0 0 1 8 4a10 10 0 0 1 7 -4a10 10 0 0 1 7 3v9h-1v6a4 4 0 0 1 -4 3a4 4 0 0 1 -3 -3a2 2 0 0 0 -4 0c0 4 3 7 7 7c4 0 8 -3 8 -7v-6h-1v-9a10 10 0 0 1 7 -3a10 10 0 0 1 7 4a10 10 0 0 1 8 -4a10 10 0 0 1 7 3a31 31 0 0 0 -29 -23v-4a1 1 0 0 0 -2 0v4a31 31 0 0 0 -29 23Z'
				/>
				<path
					fill='hsl(200, 100%, 50%)'
					d='M7 29c3 0 5 -2 5 -5c0 -3 -2 -7 -5 -11c-3 4 -5 8 -5 11c0 3 2 5 5 5zm17 -11c3 0 5 -2 5 -5c0 -3 -2 -7 -5 -11c-3 4 -5 8 -5 11c0 3 2 5 5 5zm16 10c3 0 5 -2 5 -5c0 -3 -2 -7 -5 -11c-3 4 -5 8 -5 11c0 3 2 5 5 5zm17 -10c3 0 5 -2 5 -5c0 -3 -2 -7 -5 -11c-3 4 -5 8 -5 11c0 3 2 5 5 5z'
				/>
			</g>

			<text
				fontSize='16px'
				fontWeight='600'
				fontFamily='"Open Sans", sans-serif'
				fill='hsl(263, 80%, 22%)'
				x='72.5%'
				y='91%'
				textAnchor='middle'>
				{number}
			</text>
		</svg>
	)
}

export default UmbrellaIcon
