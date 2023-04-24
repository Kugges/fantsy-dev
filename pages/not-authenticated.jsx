import Link from 'next/link'
import React, { useState } from 'react'
import Container from "../components/container"
import Image from 'next/image'
import pic from "../images/peach-logo-white.png"

import Modal from '../components/modal'
import Login from './login'

const NotAuthenticated = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        
        <Container>
            <>
                <h1 className="text-4xl text-center font-bold">Ups... nicht eingeloggt!</h1>
                <Image
                    src={pic}
                    height={100}
                    width={100}
                    alt="sryImage"
                    className="mx-auto"
                >
                </Image>
                <p className="text-center">Nur registrierte Benutzer dürfen die Profile näher anschauen.</p>

                <div className="mt-4 grid grid-rows-1 w-full sm:w-1/2 mx-auto">
                    <div className="flex py-2 flex-row row-span-1">
                        <p>Kein Account?</p>
                        <button className="px-4 rounded-lg text-fantsy-blue-500"><Link className="hover:underline" href="/join/register">Registriere dich</Link></button>
                    </div>
                    <button onClick={() => setShowModal(true)} className="py-2 px-4 row-span-1 rounded-lg border-2 text-shade-400 hover:text-white hover:bg-fantsy-green-500 hover:border-white border-fantsy-green-200 bg-white">
                        Login
                    </button>

                </div>
            </>
            <Modal isVisible={showModal} onClose={() => { setShowModal(false) }}>
                <Login />
            </Modal>
        </Container>
        </>
    )
}

export default NotAuthenticated