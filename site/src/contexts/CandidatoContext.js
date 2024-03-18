import { createContext, useEffect, useState } from "react";
import React from 'react';



export const ContextoCandidato = createContext()

export function ProviderCandidato({ children }) {
  const [candidato, setCandidato] = useState([]);
  



  useEffect(() => {
    (async function () {
        const resp = await fetch(`/candidato/all`);
        setCandidato(await resp.json())
    })()
   
  }, [setCandidato])

  const selectCandidato = () => {
    const select = candidato.map((item) => {
      return { value: item.id, label: item.nome }
    })
    return select
  }

  return (
    <ContextoCandidato.Provider value={{ candidato, setCandidato, selectCandidato }}>
      {children}
    </ContextoCandidato.Provider>
  )
}