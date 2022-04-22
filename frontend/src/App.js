import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const url = "http://localhost:8000";

function App() {
  const [users, setUsers] = useState();
  const [isFetching, setFetching] = useState(false);

  const fetchUsers = async () => {
    setFetching(true);

    let json;
    try {
      const data = await fetch(url + "/users/");
      json = await data.json();
      console.log(json);
    } catch (err) {
      console.log(err);
      window.alert(err);
    }

    if (json) {
      setUsers(json);
    }

    setFetching(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //sends a post request to users/add/ to store the new user in the db 
  const submitHandler = (e) => {
      const newUser = document.getElementById("newUser").value;
      try {
        fetch(url + "/users/add/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"name": newUser})
          ,
        })} catch (error) {return error}

      //display updated db entries 
      return false;
    };


  return (
    <div className="App">
      <header className="App-header">
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {users?.map((user, index) => (
              <li key={index}>{user.fields.name}</li>
            ))}
          </ul>
        )}
        <div>
          <form onSubmit={submitHandler}>
            <p>Add User</p>
            <input name="userName" type="text" placeholder="Enter name" id="newUser" required></input> 
            <button type="submit">Add</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
