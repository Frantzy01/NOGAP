"use client";

import { useEffect, useState } from "react";
import { membres } from "@/app/data/membres";

export default function AdminPage() {

  const [liste, setListe] = useState<any[]>([]);


  useEffect(() => {

    const nouvo = JSON.parse(
      localStorage.getItem("responsables") || "[]"
    );

    setListe([
      ...membres,
      ...nouvo
    ]);

  }, []);



  const supprimer = (id:string) => {

    const nouvo = JSON.parse(
      localStorage.getItem("responsables") || "[]"
    );


    const filtre = nouvo.filter(
      (m:any) => m.id !== id
    );


    localStorage.setItem(
      "responsables",
      JSON.stringify(filtre)
    );


    setListe([
      ...membres,
      ...filtre
    ]);

  };


  return (

    <main style={{padding:"30px"}}>

      <h1>Dashboard Admin NOGAP</h1>


      <br />


      <a href="/admin/ajouter">
        ➕ Ajouter Responsable
      </a>


      <h2>Liste Responsables</h2>


      {
        liste.map((membre)=>(

          <div
            key={membre.id}
            style={{
              border:"1px solid #ccc",
              padding:"15px",
              marginTop:"15px"
            }}
          >

            <img
              src={membre.photo}
              width="80"
              alt={membre.nom}
            />


            <h3>{membre.nom}</h3>

            <p>{membre.fonksyon}</p>

            <p>{membre.email}</p>

            <p>{membre.tel}</p>


            <a href={`/profil/${membre.id}`}>
              Voir Profil
            </a>
<br /><br />

<a href={`/admin/modifier?id=${membre.id}`}>
  ✏️ Modifier
</a>


            <br /><br />


            <button
              onClick={() => supprimer(membre.id)}
            >
              Supprimer
            </button>


          </div>

        ))
      }


    </main>

  );

}
