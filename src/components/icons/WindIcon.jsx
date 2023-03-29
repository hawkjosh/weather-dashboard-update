export default ({ direction, ...props }) => {
	return (
		<svg
			viewBox='0 0 38 38'
			style={{ backgroundColor: 'hsl(0, 0%, 100%)', borderRadius: '25%' }}
			{...props}>
			<path
				id='wind-icon'
				fill='transparent'
				stroke='hsl(219, 57%, 47%)'
				strokeWidth='1.75'
				strokeLinecap='round'
				d='M4.25 22.5q5 5 15 0t15 0m-30 4q5 5 15 0t15 0m-30 4q5 5 15 0t15 0'
			/>

			<text
				id='wind-icon-text'
				x='50%'
				y='42.5%'
				fill='hsl(263, 80%, 22%)'
				fontSize='0.875rem'
				fontWeight='bold'
				fontFamily='"Open Sans", sans-serif'
				textAnchor='middle'>
				{direction}
			</text>
		</svg>
	)
}
