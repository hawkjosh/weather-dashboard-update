export const useTimeConvert = (dateStr) => {
	const timeSplit = dateStr.split(' ')[1].split(':')

	let convertedTime
	if (timeSplit[0] > 12) {
		timeSplit[0] = timeSplit[0] - 12
		convertedTime = `${timeSplit[0]}:${timeSplit[1]}pm`
	} else if (timeSplit[0] == 0) {
		convertedTime = `12:${timeSplit[1]}am`
	} else {
		convertedTime = `${timeSplit[0]}:${timeSplit[1]}am`
	}

	return convertedTime
}
