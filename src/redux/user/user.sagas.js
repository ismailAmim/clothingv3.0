import {takeLatest, put,all,call} from 'redux-saga/effects';
import UserActionTypes from './user.types';

import {/* googleSignInSuccess,
        googleSignInFailure, 
        emailSignInSuccess,
        emailSignInFailure*/
        signInSuccess,
        signInFailure,
        } 
       from './user.actions'; 
import { auth, googleProvider, createUserProfileDocument} from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth (userAuth) {
  
    try {
        const userRef = yield call(createUserProfileDocument,userAuth);
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

export function* userSagas() {
    yield all([call(onGoogleSignInStart),
               call(onEmailSignInStart)]);
}