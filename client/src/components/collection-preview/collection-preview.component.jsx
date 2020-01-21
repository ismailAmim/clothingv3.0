import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';
import { withRouter } from 'react-router-dom';

//import './collection-preview.styles.scss';

import  { 
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer
} from  './collection-preview.styles';
const CollectionPreview = ({ title, items }) => (
  <CollectionPreviewContainer>
    <TitleContainer >{title.toUpperCase()}</TitleContainer>
    <PreviewContainer >
      {items
        .filter((item, idx) => idx < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </PreviewContainer>
  </CollectionPreviewContainer>
);

export default withRouter(CollectionPreview);
