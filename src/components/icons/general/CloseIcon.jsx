import React from 'react'

const CloseIcon = ({ ...props }) => {
	return (
		<svg
			viewBox='0 0 24 24'
			{...props}>
			<path
				id='close-icon'
				d='M4.93 19.07a10 10 0 1 1 14.14 -14.14a10 10 0 0 1 -14.14 14.14zm8.47 -7.07l2.83 -2.83l-1.41 -1.41l-2.82 2.83l-2.83 -2.83l-1.41 1.41l2.83 2.83l-2.83 2.83l1.41 1.41l2.83 -2.83l2.83 2.83l1.41 -1.41l-2.83 -2.83z'
			/>
		</svg>
	)
}

export default CloseIcon
