import React from 'react'
import ReactDOM from 'react-dom'

import './AlertModal.css'

export default ({ isOpen, onClose, children }) => {
	if (!isOpen) {
		return null
	}

	return ReactDOM.createPortal(
		<div className='modal-overlay'>
			<div className='modal-container'>
				<button
					className='modal-close-btn'
					onClick={onClose}>
					X
				</button>
				<div className='modal-content'>{children}</div>
			</div>
		</div>,
		document.getElementById('alert-modal')
	)
}
