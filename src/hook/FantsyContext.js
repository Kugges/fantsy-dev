import { createContext, useEffect, useState, useContext } from "react"
import { collection, getDocs, getDoc, doc, where, query, setDoc } from "firebase/firestore"
import { fireDb } from "../../firebaseClient"
import { AuthContext } from "./auth"
import firebase from "firebase/compat/app";

const FantsyContext = createContext()

const FantsyProvider = ({ children }) => {

    const [users, setUsers] = useState([])
    const [currentLoggedUser, setCurrentUser] = useState([])
    const [profiles, setProfiles] = useState([])
    const [currentProfile, setCurrentProfile] = useState([])
    const { user } = useContext(AuthContext)
    // console.log(user?.uid, "UID HERE")

    // GET CURRENT USER
    useEffect(() => {
        const currentUser = user?.uid
        if (user) {
            const getCurrentUser = async () => {
                const documentSnapshot = await getDocs(query(collection(fireDb, "users"), where('id', '==', currentUser)))
                // console.log(documentSnapshot, "WUPPINGER")
                setCurrentUser(documentSnapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        data: {
                            email: doc.data().email,
                            hasSubscription: doc.data().hasSubscription,
                            profileId: doc.data().profileId
                        }
                    }
                }))
            }
            getCurrentUser()
        }
    }, [])

    // GET ALL USERS
    useEffect(() => {
        const getUsers = async () => {
            const querySnapshot = await getDocs(collection(fireDb, "users"))
            // console.log(querySnapshot, "WUPPINGER")
            setUsers(querySnapshot.docs.map(doc => {
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

    // GET CURRENT PROFILE
    useEffect(() => {
        
        const currentUser = user?.email
        if (user) {            
        const getCurrentProfile = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('email', '==', currentUser)))

            setCurrentProfile(querySnapshot.docs.map(doc => {
                console.log(querySnapshot, "PROFILE DOC")
                return {
                    id: doc.id,
                    data: {
                        displayName: doc.data().displayName,
                        userProfileUrl: doc.data().userProfileUrl,
                        userGender: doc.data().userGender,
                        likesCount: doc.data().likesCount,
                        bio: doc.data().bio
                    }
                }
            }))
            console.log(querySnapshot?.id, "PROFILE DOC")            
        }
        getCurrentProfile()
        }
    }, [])

    // GET ALL WORKER PROFILES
    useEffect(() => {
        const getProfiles = async () => {
            const querySnapshot = await getDocs(query(collection(fireDb, "profiles"), where('workerProfile', '==', true)))
            // console.log(querySnapshot, "CHECK OUT")
            setProfiles(querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    data: {
                        userProfileUrl: doc.data().userProfileUrl,
                        displayName: doc.data().displayName,
                        likesCount: doc.data().likesCount,
                        bio: doc.data().bio
                    }
                }
            }))
        }
        getProfiles()
    }, [])


    return (
        <FantsyContext.Provider
            value={{ profiles, users, currentLoggedUser, currentProfile }}
        >{children}</FantsyContext.Provider>
    )
}



export { FantsyContext, FantsyProvider }