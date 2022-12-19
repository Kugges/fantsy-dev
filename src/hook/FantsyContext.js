import { createContext, useEffect, useState, useContext } from "react"
import { collection, getDocs, getDoc, doc, where, query, } from "firebase/firestore"
import { fireDb } from "../../firebaseClient"
import { AuthContext } from "./auth"
import firebase from "firebase/compat/app";
import getOtherEmail from "../../utils/getOtherEmail";

const FantsyContext = createContext()

const FantsyProvider = ({ children }) => {

    const [users, setUsers] = useState([])
    const [currentLoggedUser, setCurrentUser] = useState([])
    const [profiles, setProfiles] = useState([])  
    const [workerProfiles, setWorkerProfiles] = useState([])
    const [currentProfile, setCurrentProfile] = useState([])   

    const { user } = useContext(AuthContext)        
    // var variable = getOtherEmail(chat.users, user);
    // console.log(variable, "VARIABEL")

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
    useEffect(() => {
        const currentUser = user?.uid
        if (user) {
            const getCurrentProfile = async () => {
                const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('id', '==', currentUser)))
                // const querySnapshot = await getDoc(doc(fireDb, "profiles", currentUser))
                setCurrentProfile(querySnapshot?.docs.map(doc => {
                    return {
                        id: doc.id,
                        data: {
                            ...doc.data()
                        }
                    }
                })[0])
            }
            getCurrentProfile()
        }
    }, [])

    // GET ALL WORKER PROFILE DOCUMENTS
    useEffect(() => {
        const getWorkerProfiles = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('workerProfile', '==', true)))
            // console.log(querySnapshot, "CHECK OUT")
            setWorkerProfiles(querySnapshot?.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        ...doc.data()
                    }
                }
            }))
        }
        getWorkerProfiles()
    }, [])

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
            value={{ profiles, workerProfiles, users, currentLoggedUser, currentProfile }}
        >{children}</FantsyContext.Provider>
    )
}



export { FantsyContext, FantsyProvider }