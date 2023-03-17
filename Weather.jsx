export default ({ fill, ...props }) => (
	<svg
		viewBox='0 0 64 64'
		{...props}>
		<filter
			id='shadow'
			colorInterpolationFilters='sRGB'>
			<feDropShadow
				dx='2'
				dy='2'
				stdDeviation='0.5'
				floodOpacity='0.5'
        floodColor='hsl(0, 0%, 100%)'
			/>
		</filter>

		<path
			fill='hsl(0, 0%, 85%)'
			stroke='hsl(0, 0%, 50%)'
			strokeWidth='2'
			d='M 47 44
      h -31
      a 6 6 0 0 1 -1 -12
      a 10 10 0 0 1 11 -9
      a 5 5 0 0 1 21 6
      a 7 7 0 0 1 0 15
      z
    '
		/>

		<rect
      filter='url(#shadow)'
			width='60'
			height='60'
			x='2'
			y='2'
			fill='none'
			stroke='hsl(0, 0%, 100%)'
			strokeWidth='1'
			rx='15'
      ry='15'
		/>
	</svg>
)
