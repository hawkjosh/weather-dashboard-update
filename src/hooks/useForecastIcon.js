import day1000 from '../components/icons/conditions/Day1000.jsx'
import day1003 from '../components/icons/conditions/Day1003.jsx'
import day1063 from '../components/icons/conditions/Day1063.jsx'
import day1066 from '../components/icons/conditions/Day1066.jsx'
import day1069 from '../components/icons/conditions/Day1069.jsx'
import day1087 from '../components/icons/conditions/Day1087.jsx'
import day1192 from '../components/icons/conditions/Day1192.jsx'
import day1222 from '../components/icons/conditions/Day1222.jsx'
import day1246 from '../components/icons/conditions/Day1246.jsx'
import day1252 from '../components/icons/conditions/Day1252.jsx'
import day1261 from '../components/icons/conditions/Day1261.jsx'
import day1264 from '../components/icons/conditions/Day1264.jsx'
import day1279 from '../components/icons/conditions/Day1279.jsx'
import multi1009 from '../components/icons/conditions/Multi1009.jsx'
import multi1030 from '../components/icons/conditions/Multi1030.jsx'
import multi1072 from '../components/icons/conditions/Multi1072.jsx'
import multi1114 from '../components/icons/conditions/Multi1114.jsx'
import multi1117 from '../components/icons/conditions/Multi1117.jsx'
import multi1135 from '../components/icons/conditions/Multi1135.jsx'
import multi1147 from '../components/icons/conditions/Multi1147.jsx'
import multi1171 from '../components/icons/conditions/Multi1171.jsx'

const forecastMap = {
	1000: day1000,
	1003: day1003,
	1006: day1003,
	1009: multi1009,
	1030: multi1030,
	1063: day1063,
	1066: day1066,
	1069: day1069,
	1072: multi1072,
	1087: day1087,
	1114: multi1114,
	1117: multi1117,
	1135: multi1135,
	1147: multi1147,
	1150: day1192,
	1153: day1192,
	1168: multi1072,
	1171: multi1171,
	1180: day1063,
	1183: day1063,
	1186: day1063,
	1189: day1063,
	1192: day1192,
	1195: day1192,
	1198: multi1072,
	1201: multi1072,
	1204: day1069,
	1207: day1069,
	1210: day1066,
	1213: day1066,
	1216: day1066,
	1219: day1066,
	1222: day1222,
	1225: day1222,
	1237: day1261,
	1240: day1063,
	1243: day1192,
	1246: day1246,
	1249: day1069,
	1252: day1252,
	1255: day1066,
	1258: day1222,
	1261: day1261,
	1264: day1264,
	1273: day1087,
	1276: day1087,
	1279: day1279,
	1282: day1279,
}

export default function useForecastIcon(iconCode) {
	const forecastIcon = forecastMap[iconCode]

	if (!forecastIcon) {
		return null
	}

	return forecastIcon
}
