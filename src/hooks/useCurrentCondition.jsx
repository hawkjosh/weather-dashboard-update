import React, { Fragment } from 'react'

import Day1000 from '../components/icons/current-condition/Day1000.jsx'
import Day1003 from '../components/icons/current-condition/Day1003.jsx'
import Day1063 from '../components/icons/current-condition/Day1063.jsx'
import Day1066 from '../components/icons/current-condition/Day1066.jsx'
import Day1069 from '../components/icons/current-condition/Day1069.jsx'
import Day1087 from '../components/icons/current-condition/Day1087.jsx'
import Day1192 from '../components/icons/current-condition/Day1192.jsx'
import Day1222 from '../components/icons/current-condition/Day1222.jsx'
import Day1246 from '../components/icons/current-condition/Day1246.jsx'
import Day1252 from '../components/icons/current-condition/Day1252.jsx'
import Day1261 from '../components/icons/current-condition/Day1261.jsx'
import Day1264 from '../components/icons/current-condition/Day1264.jsx'
import Day1279 from '../components/icons/current-condition/Day1279.jsx'
import Multi1009 from '../components/icons/current-condition/Multi1009.jsx'
import Multi1030 from '../components/icons/current-condition/Multi1030.jsx'
import Multi1072 from '../components/icons/current-condition/Multi1072.jsx'
import Multi1114 from '../components/icons/current-condition/Multi1114.jsx'
import Multi1117 from '../components/icons/current-condition/Multi1117.jsx'
import Multi1135 from '../components/icons/current-condition/Multi1135.jsx'
import Multi1147 from '../components/icons/current-condition/Multi1147.jsx'
import Multi1171 from '../components/icons/current-condition/Multi1171.jsx'
import Night1000 from '../components/icons/current-condition/Night1000.jsx'
import Night1003 from '../components/icons/current-condition/Night1003.jsx'
import Night1063 from '../components/icons/current-condition/Night1063.jsx'
import Night1066 from '../components/icons/current-condition/Night1066.jsx'
import Night1069 from '../components/icons/current-condition/Night1069.jsx'
import Night1087 from '../components/icons/current-condition/Night1087.jsx'
import Night1192 from '../components/icons/current-condition/Night1192.jsx'
import Night1222 from '../components/icons/current-condition/Night1222.jsx'
import Night1246 from '../components/icons/current-condition/Night1246.jsx'
import Night1252 from '../components/icons/current-condition/Night1252.jsx'
import Night1261 from '../components/icons/current-condition/Night1261.jsx'
import Night1264 from '../components/icons/current-condition/Night1264.jsx'
import Night1279 from '../components/icons/current-condition/Night1279.jsx'

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

const textMap = {
	1000: 'Clear Skies',
	1003: 'Partly Cloudy',
	1006: 'Partly Cloudy',
	1009: 'Overcast',
	1030: 'Misty',
	1063: 'Light Rain Showers',
	1066: 'Light Snow Showers',
	1069: 'Light Sleet Showers',
	1072: 'Light Freezing Rain',
	1087: 'Thunderstorms',
	1114: 'Blowing Snow',
	1117: 'Blizzard',
	1135: 'Foggy',
	1147: 'Freezing Fog',
	1150: 'Light Rain Showers',
	1153: 'Light Rain Showers',
	1168: 'Light Freezing Rain',
	1171: 'Heavy Freezing Rain',
	1180: 'Light Rain Showers',
	1183: 'Light Rain Showers',
	1186: 'Light Rain Showers',
	1189: 'Light Rain Showers',
	1192: 'Heavy Rain Showers',
	1195: 'Heavy Rain Showers',
	1198: 'Light Freezing Rain',
	1201: 'Heavy Freezing Rain',
	1204: 'Light Sleet Showers',
	1207: 'Heavy Sleet Showers',
	1210: 'Light Snow Showers',
	1213: 'Light Snow Showers',
	1216: 'Light Snow Showers',
	1219: 'Light Snow Showers',
	1222: 'Heavy Snow Showers',
	1225: 'Heavy Snow Showers',
	1237: 'Light Ice Showers',
	1240: 'Light Rain Showers',
	1243: 'Heavy Rain Showers',
	1246: 'Torrential Rain Showers',
	1249: 'Light Sleet Showers',
	1252: 'Heavy Sleet Showers',
	1255: 'Light Snow Showers',
	1258: 'Heavy Snow Showers',
	1261: 'Light Ice Showers',
	1264: 'Heavy Ice Showers',
	1273: 'Light Rain & Thunder',
	1276: 'Heavy Rain & Thunder',
	1279: 'Light Snow & Thunder',
	1282: 'Heavy Snow & Thunder',
}

const useCurrentCondition = (iconCode, isDay, temp) => {
	const fileRef = `${iconCode}-${isDay}`
	const IconComponent = iconMap[fileRef]
	const iconText = textMap[iconCode]

	if (!IconComponent) {
		return null
	}

	return (
		<Fragment>
			<div className='condition-icon'>
				<IconComponent
					temperature={temp}
					conditionText={iconText}
				/>
			</div>
		</Fragment>
	)
}

export default useCurrentCondition
