import { createContext, useEffect, useState, useContext } from "react"
import { collection, getDocs, getDoc, doc, where, query, } from "firebase/firestore"
import { fireDb } from "../../firebaseClient"

const FantsyContext = createContext()

const FantsyProvider = ({ children }) => {

    const [profiles, setProfiles] = useState([])  
    const [workerProfiles, setWorkerProfiles] = useState([]) 

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