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
