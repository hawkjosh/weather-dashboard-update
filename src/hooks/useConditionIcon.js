import day1000 from '../icons/day1000.jsx'
import day1003 from '../icons/day1003.jsx'
import day1063 from '../icons/day1063.jsx'
import day1066 from '../icons/day1066.jsx'
import day1069 from '../icons/day1069.jsx'
import day1087 from '../icons/day1087.jsx'
import day1192 from '../icons/day1192.jsx'
import day1222 from '../icons/day1222.jsx'
import day1246 from '../icons/day1246.jsx'
import day1252 from '../icons/day1252.jsx'
import day1261 from '../icons/day1261.jsx'
import day1264 from '../icons/day1264.jsx'
import day1279 from '../icons/day1279.jsx'
import multi1009 from '../icons/multi1009.jsx'
import multi1030 from '../icons/multi1030.jsx'
import multi1072 from '../icons/multi1072.jsx'
import multi1114 from '../icons/multi1114.jsx'
import multi1117 from '../icons/multi1117.jsx'
import multi1135 from '../icons/multi1135.jsx'
import multi1147 from '../icons/multi1147.jsx'
import multi1171 from '../icons/multi1171.jsx'
import night1000 from '../icons/night1000.jsx'
import night1003 from '../icons/night1003.jsx'
import night1063 from '../icons/night1063.jsx'
import night1066 from '../icons/night1066.jsx'
import night1069 from '../icons/night1069.jsx'
import night1087 from '../icons/night1087.jsx'
import night1192 from '../icons/night1192.jsx'
import night1222 from '../icons/night1222.jsx'
import night1246 from '../icons/night1246.jsx'
import night1252 from '../icons/night1252.jsx'
import night1261 from '../icons/night1261.jsx'
import night1264 from '../icons/night1264.jsx'
import night1279 from '../icons/night1279.jsx'

const iconMap = {
	'1000-1': day1000,
	'1003-1': day1003,
	'1006-1': day1003,
	'1009-1': multi1009,
	'1030-1': multi1030,
	'1063-1': day1063,
	'1066-1': day1066,
	'1069-1': day1069,
	'1072-1': multi1072,
	'1087-1': day1087,
	'1114-1': multi1114,
	'1117-1': multi1117,
	'1135-1': multi1135,
	'1147-1': multi1147,
	'1150-1': day1192,
	'1153-1': day1192,
	'1168-1': multi1072,
	'1171-1': multi1171,
	'1180-1': day1063,
	'1183-1': day1063,
	'1186-1': day1063,
	'1189-1': day1063,
	'1192-1': day1192,
	'1195-1': day1192,
	'1198-1': multi1072,
	'1201-1': multi1072,
	'1204-1': day1069,
	'1207-1': day1069,
	'1210-1': day1066,
	'1213-1': day1066,
	'1216-1': day1066,
	'1219-1': day1066,
	'1222-1': day1222,
	'1225-1': day1222,
	'1237-1': day1261,
	'1240-1': day1063,
	'1243-1': day1192,
	'1246-1': day1246,
	'1249-1': day1069,
	'1252-1': day1252,
	'1255-1': day1066,
	'1258-1': day1222,
	'1261-1': day1261,
	'1264-1': day1264,
	'1273-1': day1087,
	'1276-1': day1087,
	'1279-1': day1279,
	'1282-1': day1279,
	'1000-0': night1000,
	'1003-0': night1003,
	'1006-0': night1003,
	'1009-0': multi1009,
	'1030-0': multi1030,
	'1063-0': night1063,
	'1066-0': night1066,
	'1069-0': night1069,
	'1072-0': multi1072,
	'1087-0': night1087,
	'1114-0': multi1114,
	'1117-0': multi1117,
	'1135-0': multi1135,
	'1147-0': multi1147,
	'1150-0': night1192,
	'1153-0': night1192,
	'1168-0': multi1072,
	'1171-0': multi1171,
	'1180-0': night1063,
	'1183-0': night1063,
	'1186-0': night1063,
	'1189-0': night1063,
	'1192-0': night1192,
	'1195-0': night1192,
	'1198-0': multi1072,
	'1201-0': multi1072,
	'1204-0': night1069,
	'1207-0': night1069,
	'1210-0': night1066,
	'1213-0': night1066,
	'1216-0': night1066,
	'1219-0': night1066,
	'1222-0': night1222,
	'1225-0': night1222,
	'1237-0': night1261,
	'1240-0': night1063,
	'1243-0': night1192,
	'1246-0': night1246,
	'1249-0': night1069,
	'1252-0': night1252,
	'1255-0': night1066,
	'1258-0': night1222,
	'1261-0': night1261,
	'1264-0': night1264,
	'1273-0': night1087,
	'1276-0': night1087,
	'1279-0': night1279,
	'1282-0': night1279,
}

export default function useConditionIcon(iconCode, isDay) {
	const fileRef = `${iconCode}-${isDay}`
	const IconComponent = iconMap[fileRef]

	if (!IconComponent) {
		return null
	}

	return IconComponent
}
