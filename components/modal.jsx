import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 z-40 bg-shade-900 bg-opacity-25 flex justify-center backdrop-blur-sm items-center">
      <div className="w-full m-4 lg:w-1/3 bg-white rounded-lg p-4 shadow-lg">
        <div className="">
          <div className="flex justify-end">
            <button className="text-shade-500 text-xl" onClick={() => onClose()}><AiOutlineClose /></button>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal