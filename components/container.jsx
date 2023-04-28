import React from 'react'

const Container = ({ children }) => {
    return (

        <div className="w-full min-h-screen px-4 pb-10 sm:py-40 mx-auto">
            <div className="flex justify-center py-20 sm:py-0">
                <div className="p-4 sm:p-10 w-screen md:w-2/3 rounded-lg bg-white shadow-lg flex justify-center">
                    <div className="w-full sm:w-10/12">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Container