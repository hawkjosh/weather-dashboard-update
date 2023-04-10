import React from 'react'

const SunsetIcon = ({ ...props }) => {
	return (
		<svg
			viewBox='0 0 24 24'
			{...props}>
			<path
				id='sunset-icon'
				fill='transparent'
				stroke='hsl(333, 100%, 50%)'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				d='M3 17h1m16 0h1M5.6 10.6l.7.7m12.1-.7l-.7.7M8 17a4 4 0 0 1 8 0M3 21h18M12 3v6l3-3M9 6l3 3'
			/>
		</svg>
	)
}

export default SunsetIcon
