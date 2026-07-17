"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { membres } from "@/app/data/membres";

function VerifyContent() {
  const params = useSearchParams();
  const id = params.get("id");

  const [membre, setMembre] = useState<any>(null);

  useEffect(() => {
    const nouvo = JSON.parse(
      localStorage.getItem("responsables") || "[]"
    );

    const toutResponsables = [...membres, ...nouvo];

    const trouve = toutResponsables.find((m: any) => m.id === id);

    setMembre(trouve);
  }, [id]);

  if (!membre) {
    return (
      <main style={{ padding: "30px" }}>
        <h1>Carte introuvable ❌</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: "30px" }}>
      <h1>NOGAP Verification ✅</h1>

      <img
        src={membre.photo}
        width={150}
        alt={membre.nom}
      />

      <h2>{membre.nom}</h2>

      <h3>{membre.fonction}</h3>

      <p>ID: {membre.id}</p>
      <p>Email: {membre.email}</p>
       <p>Tel: {membre.tel}</p>
      <hr
  style={{
    margin: "25px 0"
  }}
/>

<h3 style={{ color: "#0a3d62" }}>
  Déclaration d'engagement
</h3>

<p
  style={{
    textAlign: "justify",
    lineHeight: "1.8",
    fontStyle: "italic",
    color: "#444"
  }}
>
  "Je m'engage à exercer mes fonctions avec intégrité, impartialité,
  transparence et loyauté, dans le respect de la Constitution et des
  valeurs de la NOGAP. Je place l'intérêt de l'institution et de ses
  investisseurs au-dessus de tout intérêt personnel."
</p>




      
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <VerifyContent />
    </Suspense>
  );
}
