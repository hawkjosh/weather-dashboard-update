import React, { Fragment } from 'react'

import './CurrentWeatherCondition.css'

const CurrentWeatherIcon = ({ ConditionIcon, temperature, ConditionText }) => {
	return (
		<Fragment>
			<div className='cwc-condition-wrapper'>
				<div className='cwc-condition-icon'>
					<ConditionIcon temperature={temperature} />
				</div>
				<div className='cwc-condition-text'>{ConditionText}</div>
			</div>
		</Fragment>
	)
}

export default CurrentWeatherIcon
