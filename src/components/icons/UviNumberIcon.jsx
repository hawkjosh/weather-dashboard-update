export default ({ bgColor, numColor, number, ...props }) => (
	<svg
		viewBox='0 0 110 110'
		{...props}>
		<circle
			cx='55'
			cy='55'
			r='52.5'
			fill={numColor}
		/>
		<circle
			cx='55'
			cy='55'
			r='50'
			fill={bgColor}
		/>
		<text
			x='50%'
			y='30%'
			fill={numColor}
			fontSize='3.75rem'
			fontWeight='bold'
			fontFamily="'Farsan', cursive"
			textAnchor='middle'>
			UVI
		</text>
		<text
			x='50%'
			y='85%'
			fill={numColor}
			fontSize='3.75rem'
			fontWeight='bold'
			fontFamily="'Farsan', cursive"
			textAnchor='middle'>
			{number}
		</text>
	</svg>
)
