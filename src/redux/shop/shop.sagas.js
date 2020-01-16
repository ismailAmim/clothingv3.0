import {takeLatest/* takeEvery */, call,put} from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap} 
        from '../../firebase/firebase.utils';

import {fetchCollectionsSuccess,
        fetchCollectionsFailure}
        from './shop.actions';

import ShopActionTypes from './shop.types';
// sagas generator function 
export function* fetchCollectionsAsync () {
    try {
        const collectionRef  = firestore.collection('collections');
        // getting snapshot of the yielded  collection 
        const snapshot       = yield collectionRef.get();
        // We use call effect to yield convertCollectionsSnapshotToMap funct
        // in case when it takes much time
        const collectionsMap = yield call(convertCollectionsSnapshotToMap,snapshot);
        // put in sagas in replace thunk /dispatch 
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
       /*  collectionRef.get()
        .then(async snapshot=> {
            const collectionsMap =convertCollectionsSnapshotToMap(snapshot)
            dispatch(fetchCollectionsSuccess(collectionsMap)); 
        })
        .catch (error => dispatch(fetchCollectionsFailure(error.message))); 
    */
    }

export function* fetchCollectionsStart () {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}