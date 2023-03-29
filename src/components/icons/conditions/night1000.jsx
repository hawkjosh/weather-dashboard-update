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
					id='moon-full'
					fill='hsl(0, 0%, 100%)'
					stroke='hsl(240, 100%, 50%)'
					strokeWidth='2'
					d='M42 8a25 25 0 1 0 0 48a28 28 0 0 1 0 -48z'
				/>
			</g>

			<text
				id='current-temp'
				x='70%'
				y='55%'
				fill='hsl(0, 0%, 100%)'
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
