//React Imports
import React from "react"
import { useParams, useState, useEffect } from 'react';

//Media Imports
import placeholder from '../media/placeholder.png'
import loading from '../media/loading.gif'

function Test(props) {
  let number = "01"
  let character = "mario"
  let move = "mariojab1"
  let environment = "localhost"
  const [moveData, setMoveData] = useState("test");

  useEffect(() => {
    console.log("here")
    fetch(`http://${environment}:5000/${number}_${character}/${move}/data`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setMoveData(data.name)
      });
  }, []);

  return (
    <div>
      <p>{moveData}</p>
    </div>
  );

}

export default Test