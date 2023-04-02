import React, { Fragment } from 'react'

import UviZeroIcon from '../components/icons/UviZeroIcon.jsx'
import UviOneIcon from '../components/icons/UviOneIcon.jsx'
import UviTwoIcon from '../components/icons/UviTwoIcon.jsx'
import UviThreeIcon from '../components/icons/UviThreeIcon.jsx'
import UviFourIcon from '../components/icons/UviFourIcon.jsx'
import UviFiveIcon from '../components/icons/UviFiveIcon.jsx'
import UviSixIcon from '../components/icons/UviSixIcon.jsx'
import UviSevenIcon from '../components/icons/UviSevenIcon.jsx'
import UviEightIcon from '../components/icons/UviEightIcon.jsx'
import UviNineIcon from '../components/icons/UviNineIcon.jsx'
import UviTenIcon from '../components/icons/UviTenIcon.jsx'

const iconMap = {
	'icon-0': UviZeroIcon,
	'icon-1': UviOneIcon,
	'icon-2': UviTwoIcon,
	'icon-3': UviThreeIcon,
	'icon-4': UviFourIcon,
	'icon-5': UviFiveIcon,
	'icon-6': UviSixIcon,
	'icon-7': UviSevenIcon,
	'icon-8': UviEightIcon,
	'icon-9': UviNineIcon,
	'icon-10': UviTenIcon,
}

const useUviNumberIcon = (number) => {
	const fileRef = `icon-${number}`
	const IconComponent = iconMap[fileRef]

	if (!IconComponent) {
		return null
	}

	return <IconComponent number={number} />
}

export default useUviNumberIcon
