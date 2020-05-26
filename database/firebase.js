import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAOYsWGgHG-G5g50EdDmP4pIEDlhzexUhc",
    authDomain: "test-46c67.firebaseapp.com",
    databaseURL: "https://test-46c67.firebaseio.com",
    projectId: "test-46c67",
    storageBucket: "test-46c67.appspot.com",
    messagingSenderId: "416741134569",
    appId: "1:416741134569:web:41dc2faf3481fdca002078",
    measurementId: "G-TPM7S58VXN"
};

firebase.initializeApp(firebaseConfig);

export default firebase;