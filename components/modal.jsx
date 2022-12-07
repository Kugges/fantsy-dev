import React from 'react'

const Modal = () => {
  return (
    <div className="fixed inset-0 bg-shade-900 bg-opacity-25 flex justify-center backdrop-blur-sm items-center">
        <div className="w-1/3">
            <div className="bg-white rounded-lg p-4 shadow-lg">
                modal
            </div>
        </div>
    </div>
  )
}

export default Modal