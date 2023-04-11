import React from 'react'

const HighTempIcon = ({ temp, ...props }) => {
	return (
		<svg
			viewBox='0 0 108 24'
			{...props}>
			<g
				id='high-temp-icon'
				stroke='hsl(15, 100%, 50%)'
				strokeLinecap='round'
				strokeLinejoin='round'>
				<path
					fill='transparent'
					strokeWidth='2.5'
					d='M3.464 13.714v-8.464a1 1 0 1 1 7.072 0v8.464a5 5 0 1 1 -7.072 0Z'
				/>
				<path
					fill='hsl(15, 100%, 50%)'
					strokeWidth='1.25'
					d='M7 5v10.5a1 1 0 0 0 0 3a1 1 0 0 0 0 -3Z'
				/>
				<path
					fill='hsl(15, 100%, 50%)'
					strokeWidth='1'
					d='M18.5 21v-14h-3l4 -5l4 5h-3v14a1 1 0 1 1 -2 0Z'
				/>
			</g>

			<text
				fontSize='19px'
				fontWeight='600'
				fontFamily='"Open Sans", sans-serif'
				fill='hsl(263, 80%, 22%)'
				textAnchor='middle'
				x='62%'
				y='82%'>
				{temp}
			</text>
		</svg>
	)
}

export default HighTempIcon
