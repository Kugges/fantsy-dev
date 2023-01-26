import { createContext, useEffect, useState, useContext } from "react"
import { collection, getDocs, getDoc, doc, where, query, orderBy } from "firebase/firestore"
import { fireDb } from "../../firebaseClient"
import { AuthContext } from "./auth"

const FantsyContext = createContext()

const FantsyProvider = ({ children }) => {

    const [users, setUsers] = useState([])
    const [profiles, setProfiles] = useState([])
    // const [workerProfiles, setWorkerProfiles] = useState([])
    const [currentProfile, setCurrentProfile] = useState([])

    const { user } = useContext(AuthContext)

    // GET ALL USER DOCUMENTS
    useEffect(() => {
        const getUsers = async () => {
            const querySnapshot = await getDocs(collection(fireDb, "users"))
            // console.log(querySnapshot, "WUPPINGER")
            setUsers(querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            }))
        }
        getUsers()
    }, [])

    // GET CURRENT PROFILE DOCUMENT
    // useEffect(() => {
    //     const currentUser = user?.uid
    //     if (user) {
    //         const getCurrentProfile = async () => {
    //             const profileRef = doc(fireDb, "profiles", currentUser)
    //             const docSnap = await getDoc(profileRef)
    //             // console.log("Document data:", docSnap.data());
    //             setCurrentProfile(docSnap.data())
    //         }
    //         getCurrentProfile();
    //     }
    // }, [])

    // // GET ALL WORKER PROFILE DOCUMENTS
    // useEffect(() => {
    //     const getWorkerProfiles = async () => {
    //         const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('workerProfile', '==', true)))
    //         // const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('workerProfile', '==', true), orderBy("location", "near")))
    //         console.log(querySnapshot, "CHECK OUT")
    //         setWorkerProfiles(querySnapshot?.docs.map(doc => {
    //             return {
    //                 id: doc.id,
    //                 data: {
    //                     ...doc.data()
    //                 }
    //             }
    //         }))
    //     }
    //     getWorkerProfiles()
    // }, [])

    // GET ALL PROFILE DOCUMENTS
    useEffect(() => {
        const getProfiles = async () => {
            const querySnapshot = await getDocs(collection(fireDb, "profiles"))
            // console.log(querySnapshot, "CHECK OUT")
            setProfiles(querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            }))
        }
        getProfiles()
    }, [])

    return (
        <FantsyContext.Provider
            value={{ profiles, users }}
        >{children}</FantsyContext.Provider>
    )
}



export { FantsyContext, FantsyProvider }