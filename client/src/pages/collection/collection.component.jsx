import React/* ,{useEffect} */ from 'react';
import { connect } from 'react-redux';
//import {firestore} from '../../firebase/firebase.utils';
import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
  // unmount life cycle method implementation
  /* useEffect(()=>{
            console.log("I am subscribing");
            //we don't use async 
            const unsubscribeFromCollection = firestore
            .collection("collections")
            .onSnapshot(snapShot=> console.log(snapShot));

            // return clean up  funct (unmount ) 
            return ()=> {
              console.log("I am unsubscring ");
              unsubscribeFromCollection();
            }
            },[]); */
  const { title, items } = collection;
  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
