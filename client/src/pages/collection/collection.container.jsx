import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';

import {selectIsCollectionLoaded} from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

const mapStateToProps = createStructuredSelector({
isLoading :state=> !selectIsCollectionLoaded(state)
// the function that pass the state into selector
});
// hold CollectionsOverview in withSpinner container 
// then pass them to connect connainer

/* const CollectionsOverviewContainer = 
      connect (mapStateToProps)(WithSpinner(CollectionsOverview));
 */
const CollectionPageContainer = 
      compose (
          connect (mapStateToProps),
          WithSpinner)(CollectionPage);

export default CollectionPageContainer;

