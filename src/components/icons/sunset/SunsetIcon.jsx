import React from 'react'

const SunsetIcon = ({ time, ...props }) => {
	return (
		<svg
			viewBox='0 0 108 24'
			{...props}>
			<path
				id='sunrise-icon'
				fill='transparent'
				stroke='hsl(333, 100%, 50%)'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M2 22h20m-15 -4a5 5 0 0 1 10 0m-13 0h-2m3.072 -4l-1.732 -1m4.66 -1.928l-1 -1.732m9 1.732l1 -1.732m1.928 4.66l1.732 -1m-0.66 5h2m-10 -16v7m-3 -3l3 3l3 -3'
			/>

			<text
				fontSize='19px'
				fontWeight='600'
				fontFamily='"Open Sans", sans-serif'
				fill='hsl(263, 80%, 22%)'
				textAnchor='middle'
				x='62%'
				y='82%'>
				{time}
			</text>
		</svg>
	)
}

export default SunsetIcon
