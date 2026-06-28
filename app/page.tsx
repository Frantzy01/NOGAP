"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { membres } from "./data/membres";
import{ useRouter } from "next/navigation";



export default function Page() {

const router=  useRouter();
  const responsables = membres;
 


  const [profil,setProfil] = useState(responsables[0]);

useEffect(()=>{

const sove = localStorage.getItem("profilChoisi");

if(sove){
setProfil(JSON.parse(sove));
}

},[]);





  const telechargerCarte = async()=>{

    const element = document.getElementById("carte-nogap");

    if(!element) return;

    const canvas = await html2canvas(element);

    const lien = document.createElement("a");

    lien.href = canvas.toDataURL();

    lien.download="NOGAP-Carte.png";

    lien.click();

  };


  return (

    <main style={{
      padding:"20px",
      fontFamily:"Arial"
    }}>


      <h1>
        NOGAP ADMINISTRATION SYSTEM
      </h1>


      <div>

      {responsables.map((r)=>(

        <div
        key={r.id}
        style={{
          border:"1px solid #ccc",
          padding:"10px",
          marginBottom:"10px",
          display:"flex",
          justifyContent:"space-between"
        }}>

         <div>

<b>{r.nom}</b>

<br/>

{r.fonction}

<br/>

ID: {r.id}

<br/>

Email: {r.email}

<br/>

Téléphone: {r.tel}

</div>



     <button
onClick={()=>{

setProfil(r);

localStorage.setItem(
"profilChoisi",
JSON.stringify(r)
);

router.push(`/profil/${r.id}`);

}}
>
Voir Profil
</button>







        </div>

      ))}

      </div>



      <div
id="carte-nogap"
style={{
  width:"380px",
  border:"3px solid #0a3d62",
  borderRadius:"15px",
  padding:"20px",
  background:"#ffffff",
  boxShadow:"0 4px 12px rgba(0,0,0,0.2)",
  textAlign:"center"
}}>



      <img
      src="/nogap-logo.png"
      alt="logo"
      width="120"
      />
      <br/>

<img
  src={profil.photo}
  alt="photo membre"
  width="90"
  height="90"
  style={{
    borderRadius:"50%",
    objectFit:"cover",
    border:"2px solid #0a3d62"
  }}
/>

<p>
  Foto: {profil.photo}
</p>



<br/>

<h2 style={{
color:"#0a3d62",
margin:"10px 0"
}}>
NOGAP
</h2>

<p style={{
fontSize:"12px",
color:"gray"
}}>
ADMINISTRATION SYSTEM
</p>

<hr/>



      <h2>
        CARTE ADMINISTRATIVE
      </h2>


     <div style={{
  fontSize:"14px",
  lineHeight:"1.6"
}}>

<p>
<b>ID :</b> {profil.id}
</p>

<p>
<b>Nom :</b> {profil.nom}
</p>

<p>
<b>Fonction :</b> {profil.fonction}
</p>

<p>
<b>Email :</b> {profil.email}
</p>

<p>
<b>Téléphone :</b> {profil.tel}
</p>

<p style={{color:"green"}}>
  <b>Statut :</b> ACTIF ✅
</p>

<hr/>

<p>
  <b>Date émission :</b> 14 Juin 2026
</p>

<p>
  <b>Vérification :</b> NOGAP-{profil.id}
</p>

<p style={{color:"#0a3d62"}}>
  <b>CARTE OFFICIELLE NOGAP ✅</b>
</p>


</div>

    <QRCodeCanvas
  value={`http://192.168.0.103:3000/verify?id=${profil.id}`}
  size={160}
/>





      <br/><br/>


      <button onClick={()=>window.print()}>
        Imprimer Carte
      </button>


      <button onClick={telechargerCarte}>
        Telecharger Carte
      </button>


      </div>


    </main>

  );

}