import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBik0vIXlF2jwNS1bmeigwnWG0QYOTbNg4',
  authDomain: 'divybe-b9c65.firebaseapp.com',
  projectId: 'divybe-b9c65',
  storageBucket: 'divybe-b9c65.appspot.com',
  messagingSenderId: '974295129406',
  appId: '1:974295129406:web:6daf854ad64197faa7206f',
  measurementId: 'G-W6Y85PYF6X',
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
