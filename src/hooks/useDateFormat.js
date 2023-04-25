export const useDateFormat = (dateStr) => {
	const date = new Date(dateStr)
	const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	const month = date.getUTCMonth() + 1
	const day = date.getUTCDate()
	const weekday = weekdays[date.getUTCDay()]
	return `${weekday}, ${month}/${day}`
}
