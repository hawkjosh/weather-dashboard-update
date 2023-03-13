import React from 'react'
import ReactDOM from 'react-dom'

import CloseIcon from '../icons/CloseIcon.jsx'
import WarningIcon from '../icons/WarningIcon.jsx'

import './AlertModal.css'

export default ({ isOpen, onClose, children }) => {
	if (!isOpen) {
		return null
	}

	return ReactDOM.createPortal(
		<div className='modal-overlay'>
			<div className='modal-container'>
				<CloseIcon
					className='modal-close-btn'
					onClick={onClose}
				/>
				<div className='modal-title-wrapper'>
					<WarningIcon className='modal-title-icon' />
					<div className='modal-title'>Error</div>
					<WarningIcon className='modal-title-icon' />
				</div>
				<div className='modal-content'>{children}</div>
			</div>
		</div>,
		document.getElementById('alert-modal')
	)
}
