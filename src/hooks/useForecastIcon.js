import Forecast1000 from '../components/icons/forecast-condition/Forecast1000.jsx'
import Forecast1003 from '../components/icons/forecast-condition/Forecast1003.jsx'
import Forecast1063 from '../components/icons/forecast-condition/Forecast1063.jsx'
import Forecast1066 from '../components/icons/forecast-condition/Forecast1066.jsx'
import Forecast1069 from '../components/icons/forecast-condition/Forecast1069.jsx'
import Forecast1087 from '../components/icons/forecast-condition/Forecast1087.jsx'
import Forecast1192 from '../components/icons/forecast-condition/Forecast1192.jsx'
import Forecast1222 from '../components/icons/forecast-condition/Forecast1222.jsx'
import Forecast1246 from '../components/icons/forecast-condition/Forecast1246.jsx'
import Forecast1252 from '../components/icons/forecast-condition/Forecast1252.jsx'
import Forecast1261 from '../components/icons/forecast-condition/Forecast1261.jsx'
import Forecast1264 from '../components/icons/forecast-condition/Forecast1264.jsx'
import Forecast1279 from '../components/icons/forecast-condition/Forecast1279.jsx'
import Forecast1009 from '../components/icons/forecast-condition/Forecast1009.jsx'
import Forecast1030 from '../components/icons/forecast-condition/Forecast1030.jsx'
import Forecast1072 from '../components/icons/forecast-condition/Forecast1072.jsx'
import Forecast1114 from '../components/icons/forecast-condition/Forecast1114.jsx'
import Forecast1117 from '../components/icons/forecast-condition/Forecast1117.jsx'
import Forecast1135 from '../components/icons/forecast-condition/Forecast1135.jsx'
import Forecast1147 from '../components/icons/forecast-condition/Forecast1147.jsx'
import Forecast1171 from '../components/icons/forecast-condition/Forecast1171.jsx'

const iconMap = {
	1000: Forecast1000,
	1003: Forecast1003,
	1006: Forecast1003,
	1009: Forecast1009,
	1030: Forecast1030,
	1063: Forecast1063,
	1066: Forecast1066,
	1069: Forecast1069,
	1072: Forecast1072,
	1087: Forecast1087,
	1114: Forecast1114,
	1117: Forecast1117,
	1135: Forecast1135,
	1147: Forecast1147,
	1150: Forecast1192,
	1153: Forecast1192,
	1168: Forecast1072,
	1171: Forecast1171,
	1180: Forecast1063,
	1183: Forecast1063,
	1186: Forecast1063,
	1189: Forecast1063,
	1192: Forecast1192,
	1195: Forecast1192,
	1198: Forecast1072,
	1201: Forecast1072,
	1204: Forecast1069,
	1207: Forecast1069,
	1210: Forecast1066,
	1213: Forecast1066,
	1216: Forecast1066,
	1219: Forecast1066,
	1222: Forecast1222,
	1225: Forecast1222,
	1237: Forecast1261,
	1240: Forecast1063,
	1243: Forecast1192,
	1246: Forecast1246,
	1249: Forecast1069,
	1252: Forecast1252,
	1255: Forecast1066,
	1258: Forecast1222,
	1261: Forecast1261,
	1264: Forecast1264,
	1273: Forecast1087,
	1276: Forecast1087,
	1279: Forecast1279,
	1282: Forecast1279,
}

export const useForecastIcon = (iconCode) => {
	const forecastIcon = iconMap[iconCode]

	if (!forecastIcon) {
		return null
	}

	return forecastIcon
}
