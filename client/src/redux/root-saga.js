import {all, call} from 'redux-saga/effects';

import {userSagas} from './user/user.sagas';
import {cartSagas} from './cart/cart.sagas';
import {shopSagas} from './shop/shop.sagas';
// Using one main root sagas
export default function* rootSaga() {
// run sagas middleWares concurently
yield all([
           call(userSagas),
           call(cartSagas),
           call(shopSagas)]);

}