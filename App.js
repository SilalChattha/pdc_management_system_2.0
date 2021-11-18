import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [email, setemail] = useState("");
  const [password, setpass] = useState("");
  const [priv, setpriv] = useState(0);

  const signin = () => {
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
      priv: priv,
    }).catch(() => {
      console.log("error");
    });
  };
  Axios.get("http://localhost:3001/");

  return (
    <div className="App">
      <div className="information">
        <label>Email:</label>
        <input
          type="email"
          onChange={(event) => setemail(event.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(event) => setpass(event.target.value)}
        />
        <label>Privelge:</label>
        <input
          type="checkbox"
          onChange={(event) => setpriv(event.target.value)}
        />
        <span>Click if you are a member of the staff</span>
        <button onClick={signin}>Log in</button>
      </div>
      <hr />
    </div>
  );
}

export default App;
