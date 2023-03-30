import React, { Fragment } from 'react'

import './CurrentWeatherIcon.css'

export default CurrentWeatherIcon = ({ IconComponent, temperature, conditionText }) => {
	return (
		<Fragment>
		  <div className='cwc-condition-wrapper'>
		    <div className='cwc-condition-icon'>
    			<IconComponent temperature={temperature} />
    		</div>
        <div className='cwc-condition-text'>
          {conditionText}
        </div>
		  </div>
		</Fragment>
	)
}
