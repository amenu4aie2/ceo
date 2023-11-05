import { useState } from "react";
import { app } from "../../../Firebase/config";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const navigate = useNavigate(); // Move this hook call here

  const data = getFirestore(app);

  return (
    <div>
      <div>
        <h1>Name</h1>
        <input onChange={(e) => setname(e.target.value)}></input>
      </div>
      <div>
        <h1>Username</h1>
        <input onChange={(e) => setusername(e.target.value)}></input>
      </div>
      <div>
        <h1>Password</h1>
        <input type="password" onChange={(e) => setpassword(e.target.value)}></input>
      </div>
      <div>
        <h1>phone</h1>
        <input onChange={(e) => setphone(e.target.value)}></input>
      </div>
      <button onClick={(e) => Signup(navigate,phone, name, username, password)}>SIGN UP</button>
    </div>
  );
}

async function Signup(navigate,phone, name, username, password) {
  const auth = getAuth(app);
  const db = getFirestore(app);
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, username, password);
    await setDoc(doc(db, "credentials", userCredentials.user.uid), {
      name: name,
      username: username,
      password: password,
      phone: phone,
    });
    navigate("/");
    console.log("done");
  } catch (error) {
    console.error(error);
  }
}

export default SignUp;