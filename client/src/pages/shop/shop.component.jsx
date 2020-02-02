import React,{useEffect, lazy, Suspense} from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../../components/spinner/spinner.component';
//import {createStructuredSelector} from 'reselect';
 //import 'firebase/firestore';
//import CollectionsOverview from '../../components/collections-overview/collections-overview.component';


/* import CollectionsOverviewContainer from '../../components/collections-overview/collection-overview.container';
import CollectionPageContainer from '../collection/collection.container';
 */


//import CollectionPage from '../collection/collection.component';
//import {firestore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
//import {fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import {fetchCollectionsStart } from "../../redux/shop/shop.actions";
/* import { selectIsCollectionFetching, 
        selectIsCollectionLoaded} from "../../redux/shop/shop.selectors";

import WithSpinner from '../../components/with-spinner/with-spinner.component';
 */
//const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
//const CollectionPageWithSpinner      = WithSpinner(CollectionPage);

const CollectionsOverviewContainer =lazy(()=>import('../../components/collections-overview/collection-overview.container'));
const CollectionPageContainer =lazy(()=>import('../collection/collection.container'));


const ShopPage =({fetchCollectionsStart,match})=>{
/* class  ShopPage extends React.Component{

  */ /* state = {
    loading : true
  };

  unsubscribeFromSnapshot = null; */
useEffect(()=>{
              fetchCollectionsStart()
              },[fetchCollectionsStart]);
  //componentDidMount(){

    // distruct the props to dispatch funct --fetchCollectionsStartAsync()
    // then  we call the funct
    /* const {fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync(); */
   /*  const {fetchCollectionsStart} = this.props;
    fetchCollectionsStart(); */
    /* const {updateCollections} = this.props;
    // fetcihing for the collection ref
    const collectionRef =firestore.collection('collections');
    
      collectionRef.get().then(async snapshot=> {
        const collectionsMap =convertCollectionsSnapshotToMap(snapshot)
        updateCollections(collectionsMap);
        this.setState({loading : false}); 
      }); */
        
    // get the snapShot collection    
    /* collectionRef.onSnapshot(async snapshot=> {
      const collectionsMap =convertCollectionsSnapshotToMap(snapshot)
      updateCollections(collectionsMap);
      this.setState({loading : false});
    });
       */

      /* 
      // using fetch function for promise pattern 
      // unnecesserly nested objects
      // a lot of works
      fetch('https://firestore.googleapis.com/v1/projects/crown-98d7f/databases/(default)/documents/collections')
      .then(response => response.json())
      .then(collections => console.log(collections)); */
  //};

 //render(){
   
  // const {match/* ,isCollectionFetching ,isCollectionLoaded*/} =this.props;
   //const {loading} = this.state;
  return(
    <div className='shop-page'>
  { /*  <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
   */}
 {/* <Route exact path={`${match.path}`} render={(props)=>(<CollectionsOverviewWithSpinner isLoading ={loading}{...props}/>)} />
 <Route path={`${match.path}/:collectionId`} render={(props)=>(<CollectionPageWithSpinner isLoading ={loading}{...props}/>)} /> */}
<Suspense fallback ={<Spinner/>} >
  <Route 
       exact path={`${match.path}`} 
      /*  render={(props)=>(<CollectionsOverviewWithSpinner isLoading ={isCollectionFetching}{...props}/>)} */ 
      component ={CollectionsOverviewContainer}/>
  <Route 
      path={`${match.path}/:collectionId`} 
      /*  render={(props)=>(<CollectionPageWithSpinner isLoading ={!isCollectionLoaded}{...props}/>)}  */
      component ={CollectionPageContainer}/>
</Suspense>
</div>
);
//};
}


/* const mapStateToProps = createStructuredSelector({
//isCollectionFetching : selectIsCollectionFetching,
//isCollectionLoaded   : selectIsCollectionLoaded
});
 */
const  mapDispacthToProps = dispatch => ({
  //updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
  fetchCollectionsStart : ()=>dispatch(fetchCollectionsStart())
});

export default connect(null,mapDispacthToProps)(ShopPage);
