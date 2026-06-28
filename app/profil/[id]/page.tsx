"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { membres } from "@/app/data/membres";

export default function ProfilPage(){

  const params = useParams();

  const id = params.id as string;

  const [membre,setMembre] = useState<any>(null);


  useEffect(()=>{

    const nouvo = JSON.parse(
      localStorage.getItem("responsables") || "[]"
    );


    const tout = [
      ...membres,
      ...nouvo
    ];


    const jwenn = tout.find(
      (m:any)=>m.id === id
    );


    setMembre(jwenn);


  },[id]);


  if(!membre){

    return(
      <h1 style={{padding:"30px"}}>
        Carte introuvable ❌
      </h1>
    );

  }



  return(

    <main style={{padding:"30px"}}>

      <h1>{membre.nom}</h1>

      <img
        src={membre.photo}
        width="150"
        alt={membre.nom}
      />


      <h2>{membre.fonction}</h2>

      <p>ID: {membre.id}</p>

      <p>Email: {membre.email}</p>

      <p>Tel: {membre.tel}</p>


    </main>

  );

}
