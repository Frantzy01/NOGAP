"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginAdmin() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const connecter = () => {

    if (
      username === "admin" &&
      password === "Nogap2026"
    ) {

      localStorage.setItem("admin", "true");

      router.push("/admin");

    } else {

      alert("Non itilizatè oswa modpas pa bon.");

    }

  };

  return (

    <main
      style={{
        maxWidth: "350px",
        margin: "100px auto",
        padding: "25px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center"
      }}
    >

      <h1>Connexion Admin</h1>

      <br />

      <input
        placeholder="Nom utilisateur"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={connecter}>
        Se connecter
      </button>

    </main>

  );

}



