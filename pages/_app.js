import { AuthProvider } from "../src/hook/auth"
import { FantsyProvider } from "../src/hook/FantsyContext"
import '../styles/globals.css'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import Loader from "../components/loader"
import Chat from "./chat/chat"
import Head from "next/head"

function MyApp({ Component, pageProps }) {

  // LOADING STATE CHECK AND SHOW LOADER COMPONENT
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    router.isReady && setIsLoading(false)
  }, [])


  return (

    <>
      <Head>
        <title>fantsy.net</title>
        <meta name="description" content="Social Media for Sexworking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
        <AuthProvider>
          <FantsyProvider>
            <>{isLoading ?
              <Loader />
              :
              <>
                <Navbar />
                <Component {...pageProps} />
                <Chat />
                <Footer />
              </>
            }</>
          </FantsyProvider>
        </AuthProvider>
    </>
  )

}

export default MyApp
