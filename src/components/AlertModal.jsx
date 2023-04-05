import React from 'react'
import ReactDOM from 'react-dom'

import CloseIcon from '../components/icons/general/CloseIcon.jsx'
import WarningIcon from '../components/icons/general/WarningIcon.jsx'

const AlertModal = ({ isOpen, onClose, children }) => {
	if (!isOpen) {
		return null
	}

	return ReactDOM.createPortal(
		<div className='am-overlay'>
			<div className='am-container'>
				<div className='am-close-btn'>
					<CloseIcon onClick={onClose} />
				</div>
				<div className='am-title-wrapper'>
					<div className='am-title-icon'>
						<WarningIcon />
					</div>
					<div className='am-title'>Error</div>
					<div className='am-title-icon'>
						<WarningIcon />
					</div>
				</div>
				<div className='am-content'>{children}</div>
			</div>
		</div>,
		document.getElementById('alert-modal')
	)
}

export default AlertModal
