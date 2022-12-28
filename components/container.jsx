import React from 'react'

const Container = ({ children }) => {
    return (

        <div className="w-full min-h-screen px-4 py-10 sm:py-40 mx-auto">
            <div className="flex justify-center py-28 sm:py-0">
                <div className="p-4 sm:p-10 w-screen sm:w-1/2 rounded-lg bg-white shadow-lg flex justify-center">
                    <div className="w-3/4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Container