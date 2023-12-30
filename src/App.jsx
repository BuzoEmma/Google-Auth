import React, { useEffect, useState } from "react";
import "./App.css";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [userName, setUserName] = useState({});

  const handleCallbackResponse = (res) => {
    const UserObject = jwtDecode(res.credential);
    console.log(UserObject);
    setUserName(UserObject);

    document.getElementById("sigInDiv").hidden = true;
  };

  const handleSignOut = (event) => {
    setUserName({});
    document.getElementById("sigInDiv").hidden = false;
  };

  useEffect(() => {
    // global google
    google.accounts.id.initialize({
      client_id:
        "152687546506-qrb4dcmer4r7pjnbs9en5hvums307i1i.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("sigInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt()
  }, []);

  return (
    <div className="App">
      <div id="sigInDiv"></div>
      <h1>Hey I'm </h1>
      {userName && (
        <div>
          <h4> {userName.name}</h4>
          <img src={userName.picture} alt="" />
        </div>
      )}

      {Object.keys(userName).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
    </div>
  );
};

export default App;
