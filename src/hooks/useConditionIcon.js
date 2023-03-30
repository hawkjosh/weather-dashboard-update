import Day1000 from '../components/icons/conditions/Day1000.jsx'
import Day1003 from '../components/icons/conditions/Day1003.jsx'
import Day1063 from '../components/icons/conditions/Day1063.jsx'
import Day1066 from '../components/icons/conditions/Day1066.jsx'
import Day1069 from '../components/icons/conditions/Day1069.jsx'
import Day1087 from '../components/icons/conditions/Day1087.jsx'
import Day1192 from '../components/icons/conditions/Day1192.jsx'
import Day1222 from '../components/icons/conditions/Day1222.jsx'
import Day1246 from '../components/icons/conditions/Day1246.jsx'
import Day1252 from '../components/icons/conditions/Day1252.jsx'
import Day1261 from '../components/icons/conditions/Day1261.jsx'
import Day1264 from '../components/icons/conditions/Day1264.jsx'
import Day1279 from '../components/icons/conditions/Day1279.jsx'
import Multi1009 from '../components/icons/conditions/Multi1009.jsx'
import Multi1030 from '../components/icons/conditions/Multi1030.jsx'
import Multi1072 from '../components/icons/conditions/Multi1072.jsx'
import Multi1114 from '../components/icons/conditions/Multi1114.jsx'
import Multi1117 from '../components/icons/conditions/Multi1117.jsx'
import Multi1135 from '../components/icons/conditions/Multi1135.jsx'
import Multi1147 from '../components/icons/conditions/Multi1147.jsx'
import Multi1171 from '../components/icons/conditions/Multi1171.jsx'
import Night1000 from '../components/icons/conditions/Night1000.jsx'
import Night1003 from '../components/icons/conditions/Night1003.jsx'
import Night1063 from '../components/icons/conditions/Night1063.jsx'
import Night1066 from '../components/icons/conditions/Night1066.jsx'
import Night1069 from '../components/icons/conditions/Night1069.jsx'
import Night1087 from '../components/icons/conditions/Night1087.jsx'
import Night1192 from '../components/icons/conditions/Night1192.jsx'
import Night1222 from '../components/icons/conditions/Night1222.jsx'
import Night1246 from '../components/icons/conditions/Night1246.jsx'
import Night1252 from '../components/icons/conditions/Night1252.jsx'
import Night1261 from '../components/icons/conditions/Night1261.jsx'
import Night1264 from '../components/icons/conditions/Night1264.jsx'
import Night1279 from '../components/icons/conditions/Night1279.jsx'

const iconMap = {
	'1000-1': Day1000,
	'1003-1': Day1003,
	'1006-1': Day1003,
	'1009-1': Multi1009,
	'1030-1': Multi1030,
	'1063-1': Day1063,
	'1066-1': Day1066,
	'1069-1': Day1069,
	'1072-1': Multi1072,
	'1087-1': Day1087,
	'1114-1': Multi1114,
	'1117-1': Multi1117,
	'1135-1': Multi1135,
	'1147-1': Multi1147,
	'1150-1': Day1192,
	'1153-1': Day1192,
	'1168-1': Multi1072,
	'1171-1': Multi1171,
	'1180-1': Day1063,
	'1183-1': Day1063,
	'1186-1': Day1063,
	'1189-1': Day1063,
	'1192-1': Day1192,
	'1195-1': Day1192,
	'1198-1': Multi1072,
	'1201-1': Multi1072,
	'1204-1': Day1069,
	'1207-1': Day1069,
	'1210-1': Day1066,
	'1213-1': Day1066,
	'1216-1': Day1066,
	'1219-1': Day1066,
	'1222-1': Day1222,
	'1225-1': Day1222,
	'1237-1': Day1261,
	'1240-1': Day1063,
	'1243-1': Day1192,
	'1246-1': Day1246,
	'1249-1': Day1069,
	'1252-1': Day1252,
	'1255-1': Day1066,
	'1258-1': Day1222,
	'1261-1': Day1261,
	'1264-1': Day1264,
	'1273-1': Day1087,
	'1276-1': Day1087,
	'1279-1': Day1279,
	'1282-1': Day1279,
	'1000-0': Night1000,
	'1003-0': Night1003,
	'1006-0': Night1003,
	'1009-0': Multi1009,
	'1030-0': Multi1030,
	'1063-0': Night1063,
	'1066-0': Night1066,
	'1069-0': Night1069,
	'1072-0': Multi1072,
	'1087-0': Night1087,
	'1114-0': Multi1114,
	'1117-0': Multi1117,
	'1135-0': Multi1135,
	'1147-0': Multi1147,
	'1150-0': Night1192,
	'1153-0': Night1192,
	'1168-0': Multi1072,
	'1171-0': Multi1171,
	'1180-0': Night1063,
	'1183-0': Night1063,
	'1186-0': Night1063,
	'1189-0': Night1063,
	'1192-0': Night1192,
	'1195-0': Night1192,
	'1198-0': Multi1072,
	'1201-0': Multi1072,
	'1204-0': Night1069,
	'1207-0': Night1069,
	'1210-0': Night1066,
	'1213-0': Night1066,
	'1216-0': Night1066,
	'1219-0': Night1066,
	'1222-0': Night1222,
	'1225-0': Night1222,
	'1237-0': Night1261,
	'1240-0': Night1063,
	'1243-0': Night1192,
	'1246-0': Night1246,
	'1249-0': Night1069,
	'1252-0': Night1252,
	'1255-0': Night1066,
	'1258-0': Night1222,
	'1261-0': Night1261,
	'1264-0': Night1264,
	'1273-0': Night1087,
	'1276-0': Night1087,
	'1279-0': Night1279,
	'1282-0': Night1279,
}

export default function useConditionIcon(iconCode, isDay) {
	const fileRef = `${iconCode}-${isDay}`
	const IconComponent = iconMap[fileRef]

	if (!IconComponent) {
		return null
	}

	return IconComponent
}
