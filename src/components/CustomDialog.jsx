import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useDialog } from '../hooks/useDialog'

export default function CustomDialog() {
  const { isOpenDialog, dialogData, setIsOpenDialog } = useDialog()
  
  const onClose = () => {
    setIsOpenDialog(false)
  }

  // Close on escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpenDialog) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscKey)
    
    // Prevent body scrolling when dialog is open
    if (isOpenDialog) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'auto'
    }
  }, [isOpenDialog])

  // Close when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target.id === 'dialog-backdrop') {
      onClose()
    }
  }

  return ReactDOM.createPortal(
    <div 
      id="dialog-backdrop" 
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${isOpenDialog ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`bg-white w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 max-w-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 ${isOpenDialog ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
        aria-modal="true" 
        role="dialog"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 border-b border-orange-100">
          <h2 className="text-xl font-bold text-gray-800">
            {dialogData.title || 'Thông báo'}
          </h2>
          <button 
            onClick={onClose} 
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
            aria-label="Đóng"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
          <div className="text-gray-700">
            {dialogData.content}
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          {dialogData.showCancel && (
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              {dialogData.cancelText || 'Hủy'}
            </button>
          )}
          <button 
            onClick={() => {
              if (dialogData.onConfirm) {
                dialogData.onConfirm()
              }
              onClose()
            }}
            className="px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            {dialogData.confirmText || 'OK'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
