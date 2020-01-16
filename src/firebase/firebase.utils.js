import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDMkhuFQxRYLe41Qv-LG0RP454ssnxwVm0",
  authDomain: "crown-98d7f.firebaseapp.com",
  databaseURL: "https://crown-98d7f.firebaseio.com",
  projectId: "crown-98d7f",
  storageBucket: "crown-98d7f.appspot.com",
  messagingSenderId: "509021124659",
  appId: "1:509021124659:web:0417a738f6ba7da281cb46",
  measurementId: "G-ES37CJT3ZG"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  //const userRef = firestore.doc(`users/45454dfdf5dfdfd`);
  //console.log (userRef);

  //const collectionRef = firestore.collection('users');
  //console.log(collectionRef);

  const snapShot = await userRef.get();
  //console.log ({snapShot});

  //const CollectionSnapShot = await collectionRef.get();
  //console.log ({ collection : CollectionSnapShot.docs.map(doc=>doc.data())});
 
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  } 

  return userRef;
};

export const addCollectionAndDocuments = async (collectionkey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionkey);
  console.log(collectionRef);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef,obj);

    console.log(newDocRef);
    
  });
  //show the results

  return await batch.commit();
}
 
export const convertCollectionsSnapshotToMap = (collections)=>{

  const transformedCollection = collections.docs.map(doc=>{
    const {title, items} =doc.data();

    return {
      routeName : encodeURI(title.toLowerCase()),
      id        : doc.id,
      title,
      items

    }
  });

  return  transformedCollection.reduce((accumulator,collection)=>{
    accumulator[collection.title.toLowerCase()] = collection;
    return  accumulator;
  },{});

}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
