import React from 'react';

import Directory from '../../components/directory/directory.component';

//import './homepage.styles.scss';
import  { HomePageContainer } from  './homepage.styles';

const HomePage = () => {
  
  // testing errors
  //throw Error;
  return (
           <HomePageContainer className='homepage'>
             <Directory />
           </HomePageContainer>
          );
};

export default HomePage;
