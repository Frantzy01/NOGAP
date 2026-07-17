"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { membres } from "./data/membres";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const responsables = membres;

  const [profil, setProfil] = useState(responsables[0]);

  useEffect(() => {
    const sove = localStorage.getItem("profilChoisi");
    if (sove) {
      setProfil(JSON.parse(sove));
    }
  }, []);

  const telechargerCarte = async () => {
    const element = document.getElementById("carte-nogap");
    if (!element) return;

    const canvas = await html2canvas(element);

    const lien = document.createElement("a");
    lien.href = canvas.toDataURL("image/png");
    lien.download = "NOGAP-Carte.png";
    lien.click();
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial" }}>
      <div
  style={{
    background: "#0a3d62",
    color: "white",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    marginBottom: "25px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  }}
>
  <img
    src="/nogap-logo.png"
    alt="NOGAP Logo"
    width={70}
    style={{ marginBottom: "10px" }}
  />

  <h1
    style={{
      margin: 0,
      fontSize: "32px",
      fontWeight: "bold"
    }}
  >
    NOGAP ADMINISTRATION SYSTEM
  </h1>

  <p
    style={{
      marginTop: "8px",
      fontSize: "16px"
    }}
  >
    Nouvelle Génération Anti Pauvreté
  </p>
</div>





      {responsables.map((r) => (
        <div
          key={r.id}
          style={{
  background:"#ffffff",
  borderRadius:"15px",
  padding:"20px",
  marginBottom:"20px",
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  boxShadow:"0 4px 12px rgba(0,0,0,0.15)",
  borderLeft:"8px solid #0a3d62"
}}




        >
          <div>

<h2
style={{
margin:"0",
color:"#0a3d62"
}}
>
{r.nom}
</h2>

<p
style={{
margin:"5px 0",
fontWeight:"bold",
color:"#f39c12"
}}
>
{r.fonction}
</p>




            <br />
            ID: {r.id}
            <br />
            Email: {r.email}
            <br />
            Téléphone: {r.tel}
          </div>

          <button
            onClick={() => {
              setProfil(r);
              localStorage.setItem("profilChoisi", JSON.stringify(r));
              router.push(`/profil/${r.id}`);
            }}
          >
            Voir Profil
          </button>
        </div>
      ))}

      <br />

      <div
        id="carte-nogap"
        style={{
          width: "380px",
          margin: "auto",
          borderRadius: "20px",
          padding: "20px",
          background: "linear-gradient(135deg,#0a3d62,#1e5f99)",
          color: "#fff",
          textAlign: "center",
          boxShadow: "0 5px 15px rgba(0,0,0,.3)",
        }}
      >
        <img
          src="/nogap-logo.png"
          alt="Logo"
          width={90}
          style={{
            background: "#fff",
            borderRadius: "50%",
            padding: "8px",
          }}
        />

        <br />
        <br />

        <img
          src={profil.photo}
          alt={profil.nom}
          width={100}
          height={100}
          style={{
            borderRadius: "50%",
            border: "4px solid white",
            objectFit: "cover",
          }}
        />

        <h2>{profil.nom}</h2>

        <h3 style={{ color: "#FFD700" }}>{profil.fonction}</h3>

        <hr />

        <p>
          <b>ID :</b> {profil.id}
        </p>

        <p>
          <b>Email :</b> {profil.email}
        </p>

        <p>
          <b>Téléphone :</b> {profil.tel}
        </p>

        <p>
          <b>Statut :</b> ACTIF ✅
        </p>

        <p>
          <b>Date émission :</b> 14 Juin 2026
        </p>

        <QRCodeCanvas
          value={`https://nogap-ws24.vercel.app/verify?id=${profil.id}`}
          size={150}
        />

        <br />
        <br />

        <button onClick={() => window.print()}>
          Imprimer Carte
        </button>

        <button
          onClick={telechargerCarte}
          style={{ marginLeft: "10px" }}
        >
          Télécharger Carte
        </button>
      </div>
    </main>
  );
}



