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
                <p className="mt-10 text-center">Nur registrierte Benutzer dürfen die Profile näher anschauen.</p>
                <Image
                    src={pic}
                    height={100}
                    width={100}
                    alt="sryImage"
                    className="mx-auto"
                >
                </Image>

                <div className="flex items-center justify-between">
                    <div className="flex py-2 flex-row">
                        <p>Kein Account?</p>
                        <button className="px-4 rounded-lg text-fantsy-green-500"><Link className="hover:underline" href="/join/register">Registriere dich</Link></button>
                    </div>
                    <button onClick={() => setShowModal(true)} className="py-2 px-4 rounded-lg border-2 text-shade-400 hover:text-fantsy-green-600 hover:bg-fantsy-green-100 hover:border-white border-fantsy-green-200 bg-white">
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