import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { app } from '../../Firebase/config';
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

function Wait() {
  const location = useLocation(); // Define location at the beginning
  const [count, setCount] = useState();
  const navigate = useNavigate();
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "room", location.state.docRef), (doc) => {
      if (doc.exists()) {
        setCount(doc.data().count);
        if (doc.data().count === doc.data().limit) {
          navigate("/room", { state: { mycount: location.state.count, docRef: location.state.docRef } });
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [location]);

  const propToPass = location.state.numberOfPeople;
  const mycount = location.state.count;

  console.log(mycount); // This will now log the correct value
  console.log(propToPass); // This will now log the correct value
  console.log(location.state.docRef); // This will now log the correct value

  return (
    <div>
      <h1>Received prop: {propToPass}</h1>
      <h1>Joined: {mycount}</h1>
    </div>
  );
}

export default Wait;
