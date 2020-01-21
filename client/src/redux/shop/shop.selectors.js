import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections =>collections ? Object.keys(collections).map(key => collections[key]):[]
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    // if collections exits we pass collectionUrlParam 
    collections => collections ? collections[collectionUrlParam] : null
  );

export const selectIsCollectionFetching = collectionUrlParam =>
  createSelector(
    [selectShop],
    // if collections exits we pass collectionUrlParam 
    shop => shop.isFetching  
    );

export const selectIsCollectionLoaded = createSelector(
      [selectShop],
      // if collections exits we pass true
      // else we pass null 
      shop => !!shop.collections  
      );