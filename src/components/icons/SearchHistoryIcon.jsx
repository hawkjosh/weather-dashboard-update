import React from 'react'

const SearchHistoryIcon = ({ ...props }) => {
	return (
		<svg
			viewBox='0 0 41 41'
			{...props}>
			<g
				id='search-history-icon'
				fill='transparent'
				stroke='currentColor'
				strokeWidth='4'
				strokeLinecap='round'
				strokeLinejoin='round'>
				<path d='M38.5 20.5v-15a3 3 0 0 0 -3 -3h-30a3 3 0 0 0 -3 3v30a3 3 0 0 0 3 3h15m13 -6l5 4m-28 -24h20m-20 8h8' />
				<circle
					cx='28.5'
					cy='28.5'
					r='6'
				/>
			</g>
		</svg>
	)
}

export default SearchHistoryIcon
