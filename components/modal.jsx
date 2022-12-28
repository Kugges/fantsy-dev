import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 z-40 bg-shade-900 bg-opacity-25 flex justify-center backdrop-blur-sm items-center">
        <div className="sm:w-1/3 flex flex-col">
          <button className="text-white text-xl p-1 self-end" onClick={() => onClose()}><AiOutlineClose /></button>
            <div className="bg-white rounded-lg p-4 shadow-lg">
              {children}
            </div>
        </div>
    </div>
  )
}

export default Modal