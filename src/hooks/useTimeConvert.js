export default function useTimeConvert(time) {
	const date = new Date(`01/01/2000 ${time}`)
	const hours = date.getHours()
	const minutes = date.getMinutes()
	const ampm = hours >= 12 ? 'pm' : 'am'
	const formattedHours = hours % 12 === 0 ? 12 : hours % 12
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

	return `${formattedHours}:${formattedMinutes}${ampm}`
}
