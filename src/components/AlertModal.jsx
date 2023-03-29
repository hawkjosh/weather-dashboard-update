import React from 'react'
import ReactDOM from 'react-dom'

import CloseIcon from '../components/icons/CloseIcon.jsx'
import WarningIcon from '../components/icons/WarningIcon.jsx'

import './AlertModal.css'

export default ({ isOpen, onClose, children }) => {
	if (!isOpen) {
		return null
	}

	return ReactDOM.createPortal(
		<div className='modal-overlay'>
			<div className='modal-container'>
				<div className='modal-close-btn'>
					<CloseIcon onClick={onClose} />
				</div>
				<div className='modal-title-wrapper'>
					<div className='modal-title-icon'>
						<WarningIcon />
					</div>
					<div className='modal-title'>Error</div>
					<div className='modal-title-icon'>
						<WarningIcon />
					</div>
				</div>
				<div className='modal-content'>{children}</div>
			</div>
		</div>,
		document.getElementById('alert-modal')
	)
}
