export const useTimeFormat = (timeStr) => {
	const date = new Date(`01/01/2000 ${timeStr}`)
	const formatDate = date.toLocaleTimeString([], { timeStyle: 'short' })

	return formatDate
}
