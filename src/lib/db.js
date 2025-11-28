import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    getDoc,
    setDoc
} from "firebase/firestore";
import { db } from "./firebase";

// User Operations
export async function createUserProfile(user) {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        await setDoc(userRef, {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            familyId: null
        });
    }
    return userRef;
}

export async function getUserProfile(userId) {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
}

export async function updateUserFamily(userId, familyId) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { familyId });
}

// Family Operations
export async function createFamily(familyName, userId) {
    const familyRef = await addDoc(collection(db, "families"), {
        name: familyName,
        members: [userId]
    });
    return familyRef.id;
}

export async function joinFamily(familyId, userId) {
    const familyRef = doc(db, "families", familyId);
    const familySnap = await getDoc(familyRef);

    if (familySnap.exists()) {
        const members = familySnap.data().members || [];
        if (!members.includes(userId)) {
            await updateDoc(familyRef, {
                members: [...members, userId]
            });
        }
        return true;
    }
    return false;
}

// List Operations
export async function createList(list) {
    return await addDoc(collection(db, "lists"), list);
}

export async function getFamilyLists(familyId) {
    const q = query(collection(db, "lists"), where("familyId", "==", familyId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function deleteList(listId) {
    await deleteDoc(doc(db, "lists", listId));
}

// Item Operations
export async function addItem(item) {
    return await addDoc(collection(db, "items"), item);
}

export async function getListItems(listId) {
    const q = query(collection(db, "items"), where("listId", "==", listId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateItem(itemId, updates) {
    const itemRef = doc(db, "items", itemId);
    await updateDoc(itemRef, updates);
}

export async function deleteItem(itemId) {
    await deleteDoc(doc(db, "items", itemId));
}

export async function getList(listId) {
    const listRef = doc(db, "lists", listId);
    const listSnap = await getDoc(listRef);
    return listSnap.exists() ? { id: listSnap.id, ...listSnap.data() } : null;
}
