import UviZeroIcon from '../components/icons/uvi/UviZeroIcon.jsx'
import UviOneIcon from '../components/icons/uvi/UviOneIcon.jsx'
import UviTwoIcon from '../components/icons/uvi/UviTwoIcon.jsx'
import UviThreeIcon from '../components/icons/uvi/UviThreeIcon.jsx'
import UviFourIcon from '../components/icons/uvi/UviFourIcon.jsx'
import UviFiveIcon from '../components/icons/uvi/UviFiveIcon.jsx'
import UviSixIcon from '../components/icons/uvi/UviSixIcon.jsx'
import UviSevenIcon from '../components/icons/uvi/UviSevenIcon.jsx'
import UviEightIcon from '../components/icons/uvi/UviEightIcon.jsx'
import UviNineIcon from '../components/icons/uvi/UviNineIcon.jsx'
import UviTenIcon from '../components/icons/uvi/UviTenIcon.jsx'

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

export default function useUviNumberIcon(number) {
	const fileRef = `icon-${number}`
	const IconComponent = iconMap[fileRef]

	if (!IconComponent) {
		return null
	}

	return IconComponent
}
