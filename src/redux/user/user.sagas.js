import {takeLatest, put,all,call} from 'redux-saga/effects';
import UserActionTypes from './user.types';

import {/* googleSignInSuccess,
        googleSignInFailure, 
        emailSignInSuccess,
        emailSignInFailure*/
        signInSuccess,
        signInFailure,
        signOutSuccess,
        signOutFailure,
        signUpSuccess,
        signUpFailure
        } 
       from './user.actions'; 
import { auth,
         googleProvider, 
         createUserProfileDocument,
         getCurrentUser} from '../../firebase/firebase.utils';

//we pass additionalData as optional data
export function* getSnapshotFromUserAuth (userAuth,additionalData) {
  
    try {
        const userRef = yield call(createUserProfileDocument,userAuth,additionalData);
        // get the snapshot
        const userSnapshot = yield userRef.get();
        yield put (
            signInSuccess({
                id      :userSnapshot.id,
                ...userSnapshot.data()
            })
        );
    }catch(error) {
        yield put (signInFailure(error));
    }
       
} 

export function* SignInWithGoogle () {
try {
    const {user}  = yield auth.signInWithPopup(googleProvider);
    yield  getSnapshotFromUserAuth (user);
}catch(error) {
    yield put (signInFailure(error));
}
}

export function* SignInWithEmail({payload:{email,password}}) {
    try {
        const {user}  = yield auth.signInWithEmailAndPassword(email,password);
        yield  getSnapshotFromUserAuth (user);
    }catch(error) {
        yield put (signInFailure(error));
    }
}


export function*  onGoogleSignInStart() {
yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,SignInWithGoogle );
}

export function*  onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,SignInWithGoogle );
}

export function* isUserAuthenticated() {
try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth (userAuth);
}catch(error) {
    yield put (signInFailure(error));
}
    }    
export function* onCheckUserSession () {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,SignInWithGoogle );    
}

export function* signOut(){

    try{
        yield auth.signOut();
        yield put(signOutSuccess());
    }catch(error) {
        yield put(signOutFailure(error));
    }

}

export function* onSignOutStart () {
    yield takeLatest(UserActionTypes.SIGN_OUT_START,signOut);    
}

export function* signUp({payload: {email,password,displayName}}){
    try {
          const {user} =yield auth.createUserWithEmailAndPassword(
                email,
                password
                );
       
          yield createUserProfileDocument(user, displayName);
  
        /* this.setState({
          displayName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }); */
        yield put(signUpSuccess({user,additionalData:{displayName}}));
    }catch(error) {
        yield put(signUpFailure(error));
    }

}

export function* signInAfterSignup({payload:{user,additionalData}}){
    // we pass additionalData as optional data
    yield getSnapshotFromUserAuth(user,additionalData);
}
export function* onSignUpStart () {
    yield takeLatest(UserActionTypes.SIGN_UP_START,signUp);    
}

export function* onSignUpSuccess () {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS,signInAfterSignup);    
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart),
               call(onEmailSignInStart),
               call(isUserAuthenticated),
               call(onSignOutStart),
               call(onSignUpStart),
               call(onSignUpSuccess)]);
}