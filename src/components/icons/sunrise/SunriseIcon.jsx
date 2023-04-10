import React from 'react'

const SunriseIcon = ({ ...props }) => {
	return (
		<svg
			viewBox='0 0 24 24'
			{...props}>
			<path
				id='sunrise-icon'
				fill='transparent'
				stroke='hsl(78, 50%, 45%)'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				d='M3 17h1m16 0h1M5.6 10.6l.7.7m12.1-.7l-.7.7M8 17a4 4 0 0 1 8 0M3 21h18M12 9V3l3 3M9 6l3-3'
			/>
		</svg>
	)
}

export default SunriseIcon
