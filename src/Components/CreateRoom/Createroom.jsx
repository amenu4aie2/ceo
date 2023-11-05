import React, { useState } from "react";
import './createroom.css'
import { useNavigate } from "react-router-dom";
import Wait from "../WaitingRoom/Wait";
import { app } from "../../Firebase/config";
import { getFirestore, doc,getDoc, setDoc } from "firebase/firestore";
import { getDatabase, ref, child, get, set } from "firebase/database";


function Createroom() {
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [roomName, setRoomName] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = (numberOfPeople) => {
    // Pass the data as props to the Wait component and navigate to '/waitingroom'

    // <Wait x={numberOfPeople}/>
  };

  return (
    <div>
      <div className="half left">
        <h3>Create Room</h3>
        <label>Room Name</label>
        <div className="noofpeople">
          {numberOfPeople <= 1 ? "Number of people 1" : `Number of people ${numberOfPeople}`}
          <button onClick={() => setNumberOfPeople(numberOfPeople + 1)}> + </button>
          <button onClick={() => setNumberOfPeople(prevNumberOfPeople => prevNumberOfPeople >= 1 ? prevNumberOfPeople - 1 : prevNumberOfPeople)}> - </button>
        </div>
      <input onChange={(e)=>{setRoomName(e.target.value)}}></input>
        <div>
          <button onClick={()=>{roomdetails(navigate,numberOfPeople,roomName)}}>Create</button>
        </div>
      </div>

      <div className="half right">
      <h3>Login</h3>
        
      <input onChange={(e)=>{setRoom(e.target.value)}}></input>
        <div>
          <button onClick={()=>{fetchDocument(navigate,app,room)}}>Create</button>
        </div>
      </div>
    </div>
  );
}
async function roomdetails(navigate,numberOfPeople,roomName) {
  // const auth = getAuth(app);
  const db = getFirestore(app);
  // const docRef = doc(db, "room",`${roomName}`);
  try {
    
    await setDoc(doc(db, "room",roomName), {
      limit:numberOfPeople,
      count:1,
      words:[],


    });
    console.log("done");
    navigate("/waitingroom", { state:{numberOfPeople:  numberOfPeople ,count:1 ,docRef:roomName}});

  } catch (error) {
    console.error(error);
  }
}



const fetchDocument = async (navigate,app,room) => {
  try {
    const db = getFirestore(app);

    const docRef = doc(db, "room",`${room}`);
    const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        if(docSnap.data().count===docSnap.data().limit){
          console.log("Room is full");
          return;
        }
        else{
          console.log("Document data:", docSnap.data());
          const c=docSnap.data().count+1;
          const b=docSnap.data().limit;
          await setDoc(doc(db, "room",`${room}`), {
            limit:docSnap.data().limit,
            count:docSnap.data().count+1,
    
    
          });

          try {
            navigate("/waitingroom", {
              state: { numberOfPeople: b, count: c, docRef: room }
            });
          } catch (error) {
            console.error("Error navigating to waiting room:", error);
          }
          
        }

      } else {
        console.log("No such document!");

      }
    
    
  } catch (error) {
    console.error("Error fetching document:", error);
  }
};



export { Createroom };
