import ShopActionTypes from './shop.types';
import {firestore,convertCollectionsSnapshotToMap}  from '../../firebase/firebase.utils';
/* export const updateCollections = (collectionsMap)=>({
type        : ShopActionTypes.UPDATE_COLLECTIONS,
payload     : collectionsMap
}); */

// We shoul convert action objects to action functions
export const fetchCollectionsStart = ()=>({
type        : ShopActionTypes.FETCH_COLLECTIONS_START,
     });

export const fetchCollectionsSuccess = collectionsMap=>({
type        : ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
payload     : collectionsMap
});

export const fetchCollectionsFailure = errorMessage=>({
type        : ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
payload     : errorMessage
    });
        
// the async actiion creator 
// the benefits of using thunk
export const fetchCollectionsStartAsync = ()=>{
    return dispatch => {
        const collectionRef =firestore.collection('collections');
        // action-start the moment the funct is called
        dispatch(fetchCollectionsStart());

        collectionRef.get()
        .then(async snapshot=> {
            const collectionsMap =convertCollectionsSnapshotToMap(snapshot)
            dispatch(fetchCollectionsSuccess(collectionsMap)); 
        })
        .catch (error => dispatch(fetchCollectionsFailure(error.message))); 
    }
};

export const updateCollections = (collectionsMap)=>({
type        : ShopActionTypes.UPDATE_COLLECTIONS,
payload     : collectionsMap
            });