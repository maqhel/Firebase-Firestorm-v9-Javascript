// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import {
	collection,
	doc,
	getFirestore,
	addDoc,
	getDocs,
	onSnapshot,
	deleteDoc,
	getDoc,
	updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'XXXXXXXXXXX',
	authDomain: 'XXXXXXXXXXXX',
	databaseURL: 'XXXXXXXXXXXXX',
	projectId: 'XXXXXXXXXXXX',
	storageBucket: 'XXXXXXXXXXXX',
	messagingSenderId: 'XXXXXXXXXXXX',
	appId: 'XXXXXXXXXXXX',
	measurementId: 'XXXXXXXXXXXX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const saveTask = (title, description) => {
	addDoc(collection(db, 'tasks'), { title, description });
};

export const getTasks = () => {
	return getDocs(collection(db, 'tasks'));
};

export const onGetTasks = callback => {
	onSnapshot(collection(db, 'tasks'), callback);
};

export const deleteTask = id => {
	deleteDoc(doc(db, `tasks`, id));
};

export const getTask = id => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newData) => {
	updateDoc(doc(db, 'tasks', id), newData);
}
