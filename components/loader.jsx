import React from 'react'

const Loader = () => {
    return (
        <div className="w-screen h-screen fixed bg-black bg-opacity-25 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="h-28 w-28 border-white border-8 rounded-full  border-t-transparent animate-spin">
            </div>
        </div>
    )
}

export default Loader