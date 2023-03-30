import React from 'react'

const style = {
	border: '0.125rem solid hsl(0, 0%, 100%)',
	borderRadius: '25%',
}

const Day1000 = ({ temperature }) => {
	return (
		<svg
			viewBox='0 0 64 64'
			style={style}>
			<g id='weather-icon'>
				<g id='sun-full'>
					<circle
						fill='hsl(60, 100%, 50%)'
						stroke='hsl(50, 100%, 50%)'
						strokeWidth='2'
						r='16'
						cx='50%'
						cy='50%'
					/>
					<path
						stroke='hsl(50, 100%, 50%)'
						strokeWidth='2'
						strokeLinecap='round'
						d='M52 32h10M49.32050808 22l6.92820323 -4M42 14.67949192l4 -6.92820323M32 12v-10M22 14.67949192l-4 -6.92820323M14.67949192 22l-6.92820323 -4M12 32h-10M14.67949192 42l-6.92820323 4M22 49.32050808l-4 6.92820323M32 52v10M42 49.32050808l4 6.92820323M49.32050808 42l6.92820323 4'
					/>
				</g>
			</g>

			<text
				id='current-temp'
				x='50%'
				y='55%'
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

export default Day1000
