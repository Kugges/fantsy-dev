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

function MyApp({ Component, pageProps }) {

  // LOADING STATE CHECK AND SHOW LOADER COMPONENT
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    router.isReady && setIsLoading(false)
  }, [])

  return (

    <>
      <ToastContainer />
      <AuthProvider>
        <FantsyProvider>
          <Navbar />
          <>{isLoading ? <Loader/> : <Component {...pageProps} />}</>
          <Footer />
        </FantsyProvider>
      </AuthProvider>
    </>
  )

}

export default MyApp
