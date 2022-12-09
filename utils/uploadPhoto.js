import { storage } from '../firebaseClient'

export async function uploadPhoto(file, user, setLoading) {
    const userId = user.uid
    const path = `/images/${userId}/${file.name}`;
    const ref = storage.ref(path)

    setLoading(true);

    const snapshot = await ref.put(file);

    setLoading(false);
    alert("upload done!")
    return  ref
}