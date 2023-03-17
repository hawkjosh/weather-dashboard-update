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
			fill={numColor}
			fontSize='16'
			fontWeight='bold'
			fontFamily="'Open Sans', sans-serif">
			<textPath
				href='#arc'
				startOffset='50%'
				textAnchor='middle'>
				UV Index
			</textPath>
		</text>
		<path
			id='arc'
			d='M 20 60 A 30 30 0 0 1 92 60'
			fill='none'
		/>
		<text
			x='50%'
			y='77.5%'
			fill={numColor}
			fontSize='3.75rem'
			fontWeight='bold'
			fontFamily="'Open Sans', sans-serif"
			textAnchor='middle'>
			{number}
		</text>
	</svg>
)
