import React,{useState} from 'react';
import {connect} from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

//import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';
import {signUpStart} from '../../redux/user/user.actions';

const SignUp =({signUpStart})=>{
/* class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  } */
 const [
        userCredentials,
        setUserCredentials 
       ] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }); 
 const { displayName, email, password, confirmPassword } = userCredentials;
 
 const handleSubmit = async event => {
    event.preventDefault();

    //const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    //const {signUpStart} = this.props;
    signUpStart({displayName,email,password});
    /* try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error(error);
    } */
    
  };

 const handleChange = event => {
    const { name, value } = event.target;
    setUserCredentials({...userCredentials, [name]:value});
    //this.setState({ [name]: value });
  };

  /* render() {
    const { displayName, email, password, confirmPassword } = this.state;
   */  return (
      <div className='sign-up'>
        <h2 className='title'>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={handleSubmit/* this.handleSubmit */}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={handleChange/* this.handleChange */}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={/* this.handleChange */handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={/* this.handleChange */handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={/* this.handleChange */handleChange}
            label='Confirm Password'
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
//}

const mapDispacthToProps = dispatch =>({
  signUpStart:userCredentials=>dispatch(signUpStart(userCredentials))
});
export default connect(null,mapDispacthToProps)(SignUp);
