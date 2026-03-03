import { collection, getDocs, getFirestore} from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

export async function retriveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}