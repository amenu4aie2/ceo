import React, { useState } from 'react';
import { app } from '../../../Firebase/config';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
const auth = getAuth(app);


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    return (
        <div>
      <h1 className='heading'>Login</h1>
      <div>
        <h2>Username</h2>
        <input
          type='text'
          value={email}
          className='username'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br></br>
      <div>
        <h2>Password</h2>
        <input
          type='password' 
          value={password}
          className='password'
          onChange={(e) => setPassword(e.target.value)}
          />
      </div>
      <div>
        <button onClick={() => {
            Abc(navigate,email, password);
            console.log(email, password);
        }}>
          Checkmeout
        </button>
      </div>
    </div>
  );
}
const Abc = async (navigate,email, password) => {    

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("logged in");
    console.log({auth})
    console.log(userCredential)
    const user = userCredential.user;
    const uuid= userCredential
    navigate('/createroom')
  } catch (error) {
    navigate('/SignUp')
  } 
};

export default Login;