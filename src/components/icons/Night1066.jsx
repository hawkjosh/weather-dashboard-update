import React from 'react'

const style = {
	border: '0.125rem solid hsl(0, 0%, 100%)',
	borderRadius: '25%',
}

const Night1066 = ({ temperature }) => {
	return (
		<svg
			viewBox='0 0 64 64'
			style={style}>
			<g id='weather-icon'>
				<path
					id='moon-partial'
					fill='hsl(0, 0%, 100%)'
					stroke='hsl(240, 100%, 50%)'
					strokeWidth='2'
					d='M27 5a17.5 17.5 0 1 0 0 34a20 20 0 0 1 0 -34z'
				/>
				<path
					id='cloud-small'
					fill='hsl(0, 0%, 75%)'
					stroke='hsl(0, 0%, 50%)'
					strokeWidth='2'
					d='M56 51h-37a1 1 0 0 1 -1 -14a10 10 0 0 1 12 -10a5 5 0 0 1 24 7a8.7 8.7 0 0 1 2 17z'
				/>
				<path
					id='snowflake'
					stroke='hsl(0, 0%, 90%)'
					strokeWidth='0.75'
					strokeLinecap='round'
					d='M34.5 58h5m-2.5 -2.5v5m-2 -0.5l4 -4m0 4l-4 -4'
				/>
			</g>

			<text
				id='current-temp'
				x='58%'
				y='68%'
				fill='hsl(263, 80%, 22%)'
				fontSize='0.5rem'
				fontFamily='"Open Sans", sans-serif'
				fontWeight='bold'
				textAnchor='middle'
				textLength='24'>
				{temperature}
			</text>
		</svg>
	)
}

export default Night1066
