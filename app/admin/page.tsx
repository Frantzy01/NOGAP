"use client";

import { useEffect, useState } from "react";
import { membres } from "@/app/data/membres";
import { useRouter } from "next/navigation";

export default function AdminPage() {

  const router = useRouter();
  const [liste, setListe] = useState<any[]>([]);

  useEffect(() => {

    const admin = localStorage.getItem("admin");

    if (admin !== "true") {
      router.push("/admin/login");
      return;
    }

    const nouvo = JSON.parse(
      localStorage.getItem("responsables") || "[]"
    );

    setListe([
      ...membres,
      ...nouvo
    ]);

  }, [router]);

  const supprimer = (id: string) => {

    if (!confirm("Eske ou vle efase responsab sa a?")) return;

    const nouvo = JSON.parse(
      localStorage.getItem("responsables") || "[]"
    );

    const filtre = nouvo.filter(
      (m: any) => m.id !== id
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

    <main style={{ padding: "30px" }}>

      <h1>Dashboard Admin NOGAP</h1>

      <br />

      <a href="/admin/ajouter">
        ➕ Ajouter Responsable
      </a>

      <h2>Liste Responsables</h2>

      {liste.map((membre) => (

        <div
          key={membre.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            marginTop: "15px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >

          <img
            src={membre.photo}
            width="80"
            height="80"
            alt={membre.nom}
            style={{
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />

          <h3>{membre.nom}</h3>

          <p>{membre.fonction}</p>

          <p>{membre.email}</p>

          <p>{membre.tel}</p>

          <br />

          <a href={`/profil/${membre.id}`}>
            👤 Voir Profil
          </a>

          <br /><br />

          <a href={`/admin/modifier?id=${membre.id}`}>
            ✏️ Modifier
          </a>

          <br /><br />

          <button
            onClick={() => supprimer(membre.id)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            🗑️ Supprimer
          </button>

        </div>

      ))}

    </main>

  );

}
