import { createContext, useEffect, useState } from "react";
import React from 'react';



export const ContextoTribuna = createContext()

export function Provider({ children }) {
  const [tribuna, setTribuna] = useState([]);
  



  useEffect(() => {
    (async function () {
        const resp = await fetch(`/tribuna/all`);
        setTribuna(await resp.json())
    })()
   
  }, [setTribuna])

  const selectTribuna = () => {
    const select = tribuna.map((item) => {
      return { value: item.id, label: item.nome }
    })
    return select
  }

  return (
    <ContextoTribuna.Provider value={{ tribuna, setTribuna, selectTribuna }}>
      {children}
    </ContextoTribuna.Provider>
  )
}