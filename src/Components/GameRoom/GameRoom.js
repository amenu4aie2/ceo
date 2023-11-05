import { useLocation, useNavigate } from "react-router-dom";
import { app } from "../../Firebase/config";
import React, { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { set } from "firebase/database";

function GameRoom() {
  const [first, setFirst] = useState({ word: [] });
  const [size, setSize] = useState(0);
  const [newWord, setNewWord] = useState("");
  const location = useLocation();
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "room", `${location.state.docRef}`),
      (doc) => {
        if (doc.exists()) {
          setFirst(doc.data());
          setSize(doc.data().limit);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const appendWord = async () => {
    if (newWord.trim() !== "") {
      try {
        const docRef = doc(db, "room", `${location.state.docRef}`);
        await updateDoc(docRef, {
          word: arrayUnion(newWord), // Use arrayUnion to avoid overwriting data
        });
        setNewWord("");
      } catch (error) {
        console.error("Error appending word:", error);
      }
    }
  };

  return (
    <div>
      <div>{first.word.join(" ")}</div>{" "}
      {/* Display the words as a comma-separated list */}
      {first.word.length % size == location.state.mycount - 1 ? (
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="Enter a new word"
        />
      ) : (
        <div></div>
      )}
      <button onClick={appendWord}>Append Word</button>
    </div>
  );
}

export default GameRoom;
