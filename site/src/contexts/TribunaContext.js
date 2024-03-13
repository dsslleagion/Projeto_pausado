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

  return (
    <ContextoTribuna.Provider value={{ tribuna, setTribuna }}>
      {children}
    </ContextoTribuna.Provider>
  )
}