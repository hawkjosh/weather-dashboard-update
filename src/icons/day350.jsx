export default ({ ...props }) => (
	<svg
		viewBox='0 0 64 64'
		{...props}>
		<path
			fill='hsl(0, 0%, 75%)'
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
		<circle
			r='2.5'
			cx='32'
			cy='52.5'
			fill='hsl(0, 0%, 90%)'
		/>

		<rect
			width='60'
			height='60'
			x='2'
			y='2'
			fill='none'
			stroke='hsl(0, 0%, 100%)'
			strokeWidth='2.5'
			rx='15'
		/>
	</svg>
)
