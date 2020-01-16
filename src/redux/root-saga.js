import {all, call} from 'redux-saga/effects';

import {fetchCollectionsStart} from './shop/shop.sagas';
import {userSagas}             from './user/user.sagas';
// Using one main root sagas
export default function* rootSaga() {
// run sagas middleWares concurently
yield all([call(fetchCollectionsStart),call(userSagas)]);

}