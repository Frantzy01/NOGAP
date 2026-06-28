"use client";

import { useState } from "react";

export default function AjouterPage(){

const [nom,setNom]=useState("");
const [fonction,setFonction]=useState("");
const [email,setEmail]=useState("");
const [tel,setTel]=useState("");


const ajouter=()=>{

const nouveau={
id:"ADM-"+Date.now(),
nom,
fonction,
email,
tel,
photo:"/default.png"
};


const anciens=JSON.parse(
localStorage.getItem("responsables") || "[]"
);


localStorage.setItem(
"responsables",
JSON.stringify([...anciens,nouveau])
);


alert("Responsable ajoute ✅");

};


return(

<main style={{padding:"30px"}}>

<h1>Ajouter Responsable</h1>

<input placeholder="Nom"
onChange={(e)=>setNom(e.target.value)}
/>

<br/><br/>

<input placeholder="Fonction"
onChange={(e)=>setFonction(e.target.value)}
/>

<br/><br/>

<input placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input placeholder="Téléphone"
onChange={(e)=>setTel(e.target.value)}
/>

<br/><br/>

<button onClick={ajouter}>
Enregistrer
</button>

</main>

)

}
