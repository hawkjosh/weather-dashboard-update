export default function useDateFormat(dateStr) {
	const date = new Date(dateStr)
	const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	const month = date.getMonth() + 1
	const day = date.getDate()
	const weekday = weekdays[date.getDay()]
	return `${weekday}, ${month}/${day}`
}
