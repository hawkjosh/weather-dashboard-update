import { useState, useEffect } from 'react'

export function useWindowSize() {
	const [isMobile, setIsMobile] = useState(false)
	const [isTabletSm, setIsTabletSm] = useState(false)
	const [isTabletLg, setIsTabletLg] = useState(false)
	const [isLaptop, setIsLaptop] = useState(false)

	useEffect(() => {
		const handleResizeMobile = () => {
			setIsMobile(window.innerWidth < 500)
		}
		handleResizeMobile()
		window.addEventListener('resize', handleResizeMobile)
		return () => window.removeEventListener('resize', handleResizeMobile)
	}, [])

	useEffect(() => {
		const handleResizeTabletSm = () => {
			setIsTabletSm(window.innerWidth >= 500 && window.innerWidth < 750)
		}
		handleResizeTabletSm()
		window.addEventListener('resize', handleResizeTabletSm)
		return () => window.removeEventListener('resize', handleResizeTabletSm)
	}, [])

	useEffect(() => {
		const handleResizeTabletLg = () => {
			setIsTabletLg(window.innerWidth >= 750 && window.innerWidth < 1000)
		}
		handleResizeTabletLg()
		window.addEventListener('resize', handleResizeTabletLg)
		return () => window.removeEventListener('resize', handleResizeTabletLg)
	}, [])

	useEffect(() => {
		const handleResizeLaptop = () => {
			setIsLaptop(window.innerWidth >= 1000)
		}
		handleResizeLaptop()
		window.addEventListener('resize', handleResizeLaptop)
		return () => window.removeEventListener('resize', handleResizeLaptop)
	}, [])

	return { isMobile, isTabletSm, isTabletLg, isLaptop }
}
