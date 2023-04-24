import { AuthContext, AuthProvider } from "../src/hook/auth"
import { FantsyProvider } from "../src/hook/FantsyContext"
import '../styles/globals.css'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter, Router } from 'next/router'
import { useContext, useEffect, useState } from "react"
import Loader from "../components/loader"
import Chat from "./chat/chat"
import Head from "next/head"
import Nprogress from 'nprogress'
// import auth from "@react-native-firebase/auth"
// import database from "@react-native-firebase/database"

function MyApp({ Component, pageProps }) {

  // LOADING STATE CHECK AND SHOW LOADER COMPONENT
  const [isLoading, setIsLoading] = useState(false)
  // const router = useRouter()

  // // // const { user } = useContext(AuthContext)

  // useEffect(() => {
  //   router.isReady && setIsLoading(false)
  // }, [])

  // ADD FLOWBITE IF NEEDED
  // useEffect(() => {
  //   import("flowbite")
  // }, [])

  // useEffect(() => {
  //   // Assuming user is logged in
  //   // const userId = auth().currentUser.uid
  //   const userId = user.uid

  //   const reference = database().ref(`/online/${userId}`)

  //   // Set the /users/:userId value to true
  //   reference.set(true).then(() => console.log("Online presence set"))
  // })


  
  // <>{isLoading ?
  //   <Loader />
  //   :
  //   <>
  //     <Navbar />
  //     <Component {...pageProps} />
  //     <Chat />
  //     <Footer />
  //   </>
  // }</>

  useEffect(() => {
      Router.events.on("routeChangeStart", (url) => {
        setIsLoading(true)
      });
      Router.events.on("routeChangeComplete", (url) => {
        setIsLoading(false)
      });
      Router.events.on("routeChangeError", (url) => {
          setIsLoading(false)
      });

  }, [Router])

  return (

    <>
      <Head>
        <title>fantsy.net</title>
        <meta charSet="UTF-8" name="description" content="Social Media Platform for Fantsy People!" />
        <link rel="document" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      <AuthProvider>
        <FantsyProvider>
          <>
            <Navbar />
            {isLoading && <Loader/>}
            <Component {...pageProps} />
            <Chat />
            <Footer />
          </>
        </FantsyProvider>
      </AuthProvider>
    </>
  )

}

export default MyApp
