"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function ModifierContent() {
  const params = useSearchParams();
  const id = params.get("id");

  const [nom, setNom] = useState("");
  const [fonction, setFonction] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");

  useEffect(() => {
    const responsables = JSON.parse(
      localStorage.getItem("responsables") || "[]"
    );

    const membre = responsables.find((m: any) => m.id === id);

    if (membre) {
      setNom(membre.nom);
      setFonction(membre.fonction);
      setEmail(membre.email);
      setTel(membre.tel);
    }
  }, [id]);

  const modifier = () => {
    const responsables = JSON.parse(
      localStorage.getItem("responsables") || "[]"
    );

    const nouvo = responsables.map((m: any) =>
      m.id === id
        ? { ...m, nom, fonction, email, tel }
        : m
    );

    localStorage.setItem("responsables", JSON.stringify(nouvo));

    alert("Modification fèt ✅");
  };

  return (
    <main style={{ padding: "30px" }}>
      <h1>Modifier Responsable</h1>

      <input value={nom} onChange={(e) => setNom(e.target.value)} />
      <br /><br />

      <input value={fonction} onChange={(e) => setFonction(e.target.value)} />
      <br /><br />

      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <br /><br />

      <input value={tel} onChange={(e) => setTel(e.target.value)} />
      <br /><br />

      <button onClick={modifier}>Sove Chanjman</button>
    </main>
  );
}

export default function ModifierPage() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <ModifierContent />
    </Suspense>
  );
}
