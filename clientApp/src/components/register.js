import React, { useState } from "react";
import { userService } from "../api/account.service";

export const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    userService
      .register({
        Username: username,
        Password: password,
        FirstName: firstName,
        LastName: lastName,
      })
      .then(async (r) => {})
      .catch((error) => {
        console.log("err", error);
      });
  };

  return (
    <div>
      <h3>Register man</h3>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button onClick={submit} type="submit">
        SignUp
      </button>
    </div>
  );
};
