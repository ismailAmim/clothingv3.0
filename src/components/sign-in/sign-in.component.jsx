import React,{useState} from 'react';
import {connect} from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

//import { auth, /* signInWithGoogle */ } from '../../firebase/firebase.utils';
import {googleSignInStart, emailSignInStart}
       from '../../redux/user/user.actions';

import './sign-in.styles.scss';

const SignIn= ({emailSignInStart,googleSignInStart})=>{
  const [userCredentials,setCredentials]= useState({email:"",password:""});
  const { email, password } = userCredentials;
  /* constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }
 */
 const handleSubmit = async event => {
    event.preventDefault();
    //const {emailSignInStart}  = this.props;
    //const { email, password } = this.state;
    
     emailSignInStart(email,password);
   /*  try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (error) {
      console.log(error);
    } */
  };

 const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({...userCredentials, [name]: value });
  };

 //const render() {
    //const {googleSignInStart} = this.props;
    return (
     
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={/* this.handleSubmit */handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={/* this.handleChange} */handleChange}
            value={/* this.state.email */email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={/* this.state.password */password}
            handleChange={/* this.handleChange} */handleChange}
            label='password'
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'> Sign in </CustomButton>
            {// to not trigger a submit action form 
             //  we change type from submit to button
            }
            <CustomButton type='button' 
                          onClick={/*signInWithGoogle*/googleSignInStart} 
                          isGoogleSignIn>
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
//}

const mapDispatchToProps = dispatch =>({
googleSignInStart : ()=> dispatch(googleSignInStart()),
emailSignInStart : (email,password)=> dispatch(emailSignInStart({email,password}))

});

export default connect(null, mapDispatchToProps)(SignIn);
