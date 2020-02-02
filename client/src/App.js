import React,{useEffect, lazy, Suspense} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import './App.css';
import {GlobalStyle} from './global.styles';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
//import HomePage from './pages/homepage/homepage.component';
// import ShopPage from './pages/shop/shop.component';
// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

//import { auth, createUserProfileDocument/* ,addCollectionAndDocuments  */} from './firebase/firebase.utils';

//import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession }  from './redux/user/user.actions';
/* import {selectCollectionsForPreview} from './redux/shop/shop.selectors' 
 */

const HomePage = lazy(()=> import('./pages/homepage/homepage.component'));
const ShopPage = lazy(()=> import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(()=> import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(()=> import('./pages/checkout/checkout.component'));


const App =({checkUserSession,currentUser}) =>{
  useEffect(()=>
             {
               checkUserSession()
              },[checkUserSession]
            );
/* class App extends React.Component {
 
  componentDidMount() {
    const {checkUserSession} = this.props;
    checkUserSession();
 */
  /*   const { setCurrentUser//,collectionsArray  
    } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
      //addCollectionAndDocuments('collections',collectionsArray.map(({title,items})=>({title,items})));
    }); */
  //}

 /*  componentWillUnmount() {
    this.unsubscribeFromAuth();
  } */

  /* render() {
   */  return (
      <div>
        <GlobalStyle/>
        <Header />
        <Switch>
          <ErrorBoundary>
           <Suspense fallback ={<Spinner/>}>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route
            exact
            path='/signin'
            render={() =>
              /* this.props. */currentUser ? (
                         <Redirect to='/' />
                          ) : (
                          <SignInAndSignUpPage />
                          )
                    }/>
           </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );
  }
//}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser/* ,
  collectionsArray: selectCollectionsForPreview  */
});

/* const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
}); */
const mapDispatchToProps = dispatch =>({
  checkUserSession : ()=>dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
