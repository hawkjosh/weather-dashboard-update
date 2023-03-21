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

export default function useConditionText(iconCode) {
	const ConditionText = textMap[iconCode]

	if (!ConditionText) {
		return null
	}

	return ConditionText
}
