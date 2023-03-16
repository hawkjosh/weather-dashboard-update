export default ({ direction, ...props }) => (
	<svg
		viewBox='0 0 45 45'
		{...props}>
		<rect
			x='1.5'
			y='1.5'
			width='42'
			height='42'
			fill='hsl(0, 0%, 100%)'
			rx='10'
			ry='10'
		/>

		<text
			x='50%'
			y='42.5%'
			fill='hsl(200, 100%, 50%)'
			fontSize='0.9rem'
			fontWeight='bold'
			fontFamily="'Open Sans', sans-serif"
			textAnchor='middle'>
			{direction}
		</text>

		<path
			fill='none'
			stroke='hsl(200, 100%, 50%)'
			strokeWidth='1.5'
			strokeLinecap='round'
			d='M7.5 27 q5 5 15 0 t15 0'
		/>

		<path
			fill='none'
			stroke='hsl(200, 100%, 50%)'
			strokeWidth='1.5'
			strokeLinecap='round'
			d='M7.5 31 q5 5 15 0 t15 0'
		/>

		<path
			fill='none'
			stroke='hsl(200, 100%, 50%)'
			strokeWidth='1.5'
			strokeLinecap='round'
			d='M7.5 35 q5 5 15 0 t15 0'
		/>

	</svg>
)
