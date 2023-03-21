export default ({ ...props }) => (
	<svg
		viewBox='0 0 64 64'
		{...props}>
		<path
			fill='hsl(0, 0%, 100%)'
			stroke='hsl(240, 100%, 50%)'
			strokeWidth='1.5'
			d='M16 5 a5 5 0 1 0 0 20 a15 15 0 0 1 0 -20z
  '
		/>
		<path
			fill='hsl(0, 0%, 100%)'
			stroke='hsl(0, 0%, 75%)'
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
