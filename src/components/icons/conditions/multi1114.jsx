const style = {
	border: '0.125rem solid hsl(0, 0%, 100%)',
	borderRadius: '25%',
}

export default (temp) => {
	return (
		<svg
			viewBox='0 0 64 64'
			style={style}>
			<g id='weather-icon'>
				<path
					id='cloud-large'
					fill='hsl(0, 0%, 75%)'
					stroke='hsl(0, 0%, 50%)'
					strokeWidth='2'
					d='M54 47h-42.5a1 1 0 0 1 -1 -16a11.5 11.5 0 0 1 14 -11.5a5 5 0 0 1 27.5 8a10 10 0 0 1 2 19.5z'
				/>
				<path
					id='snowflake'
					stroke='hsl(0, 0%, 85%)'
					strokeWidth='0.75'
					strokeLinecap='round'
					d='M18 56h5m-2.5 -2.5v5m-2 -0.5l4 -4m0 4l-4 -4'
				/>
				<g
					id='wavy-line'
					fill='transparent'
					stroke='hsl(0, 0%, 85%)'
					strokeWidth='1.25'
					strokeLinecap='round'>
					<path d='M25.5 54q5 -2.5 10 0q5 2.5 10 0' />
					<path d='M25.5 58q5 -2.5 10 0q2.5 1.25 5 1' />
				</g>
			</g>

			<text
				id='current-temp'
				x='50%'
				y='60%'
				fill='hsl(263, 80%, 22%)'
				fontSize='0.5rem'
				fontFamily='"Open Sans", sans-serif'
				fontWeight='bold'
				textAnchor='middle'
				textLength='24'>
				{temp}
			</text>
		</svg>
	)
}
