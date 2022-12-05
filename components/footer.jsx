import React from 'react'

import Image from 'next/image'
import logo from '../images/peach-logo.png'

const Footer = () => {
    return (
        <div className="relative">
            <div className="text-black bg-white grid gap-2 grid-cols-1 grid-rows-1 sm:grid-cols-4 sm:gap-40 text-center p-10 items-center justify-center">
                <div className="">
                    <h4 className="text-xl mb-5 font-bold">Partner</h4>
                    <ul className="cursor-pointer">
                        <li>
                            <a className="hover:underline" href="/">partner123.de</a>
                        </li>

                        <li>
                            <a className="hover:underline" href="/">deranderepartner.com</a>
                        </li>

                        <li>
                            <a className="hover:underline" href="/">viele-guter-partner.com</a>
                        </li>
                    </ul>

                </div>
                <div className="">
                    <h4 className="text-xl mb-5 font-bold">Community</h4>
                    <ul className="cursor-pointer">
                        <li>
                            <a className="hover:underline" href="/">partner123.de</a>
                        </li>

                        <li>
                            <a className="hover:underline" href="/">deranderepartner.com</a>
                        </li>

                        <li>
                            <a className="hover:underline" href="/">viele-guter-partner.com</a>
                        </li>
                    </ul>

                </div>
                <div className="">
                    <h4 className="text-xl mb-5 font-bold">Werde Fantsy!</h4>
                    <ul className="cursor-pointer">
                        <li>
                            <a className="hover:underline" href="/">Kontakt</a>
                        </li>

                        <li>
                            <a className="hover:underline" href="/">Hotline</a>
                        </li>

                        <li>
                            <a className="hover:underline" href="/impressum">Impressum</a>
                        </li>
                    </ul>

                </div>
                <div className="place-self-center">
                    <Image
                        src={logo}
                        alt="fantsy logo"
                        width="600px"
                        height="200px"
                        placeholder="empty"
                        priority="eager"
                    />

                </div>

            </div>
            
        <div className="px-10 py-4 bg-fantsy-orange-500 text-center justify-center">
            <p>© Copyright 2022 Fantsy. All Rights Reserved.</p>
        </div>
        </div>
        
    )
}

export default Footer