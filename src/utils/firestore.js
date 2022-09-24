import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyADiQcGpum9YssbWCv30_URG7QSLCnoQSs',
  authDomain: 'devu-s.firebaseapp.com',
  projectId: 'devu-s',
  storageBucket: 'devu-s.appspot.com',
  messagingSenderId: '1022843756697',
  appId: '1:1022843756697:web:7a087c499b490be5559808',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addData = async (data) => {
  try {
    await addDoc(collection(db, 'numbers'), {
      number: data.number,
      ua: data.ua,
    });
    return true;
  } catch (e) {
    console.error('Error adding document: ', e);
    return false;
  }
};

const login = async (email, password) => {
  let response = {};

  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      response = {
        status: true,
        user,
      };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);

      response = {
        status: false,
        user: null,
      };
    });

  return response;
};

const getNumbers = async () => {
  let response = [];

  await getDocs(collection(db, 'numbers'))
    .then((documents) => {
      documents.forEach((doc) => {
        response.push(doc.data());
      });
    })
    .catch((error) => {});

  return response;
};

export { addData, login, getNumbers };
