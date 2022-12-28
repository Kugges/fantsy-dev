import { AuthContext, AuthProvider } from "../src/hook/auth"
import { FantsyProvider } from "../src/hook/FantsyContext"
import '../styles/globals.css'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from "react"
import Loader from "../components/loader"
import Chat from "./chat/chat"
import Head from "next/head"
// import auth from "@react-native-firebase/auth"
// import database from "@react-native-firebase/database"

function MyApp({ Component, pageProps }) {

  // LOADING STATE CHECK AND SHOW LOADER COMPONENT
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // const { user } = useContext(AuthContext)

  useEffect(() => {
    router.isReady && setIsLoading(false)
  }, [])

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


  return (

    <>
      <Head>
        <title>fantsy.net</title>
            <meta charSet="UTF-8" name="description" content="Social Media for Sexworking" />
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
