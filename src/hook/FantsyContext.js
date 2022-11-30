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
    const { user } = useContext(AuthContext)
    // console.log(user?.uid, "UID HERE")
    // const [currentProfile, setProfile] = useState([])  

    // GET CURRENT USER
    useEffect(() => {
        const currentUser = user?.uid;
        if (user) {
            const getCurrentUser = async () => {
                const documentSnapshot = await getDocs(query(collection(fireDb, "users"), where('id', '==', currentUser)))
                console.log(documentSnapshot, "WUPPINGER")
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

    // GET USERS
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

    // GET PROFILES
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

    // useEffect(() => {

    //     const getProfile = async () => {
    //         const querySnapshot = await getDoc(doc(fireDb, "profiles", user.profileId))

    //         setProfile(querySnapshot.docs.map(doc => {
    //             console.log(doc.id, "gimme that PROFILE ID")
    //             return {
    //                 id: doc.id,
    //                 data: {
    //                     userProfileUrl: doc.data().userProfileUrl,
    //                     displayName: doc.data().displayName,
    //                     likesCount: doc.data().likesCount,
    //                     bio: doc.data().bio
    //                 }
    //             }
    //         }))
    //     }

    //     getProfile()

    // }, [])

    return (
        <FantsyContext.Provider
            value={{ profiles, users, currentLoggedUser }}
        >{children}</FantsyContext.Provider>
    )
}



export { FantsyContext, FantsyProvider }