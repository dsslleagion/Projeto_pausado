import { useContext } from 'react'
import { ContextoTribuna } from '../contexts/TribunaContext'

export default function useContextoTribuna(){
    const contextoTribuna = useContext(ContextoTribuna)
    return contextoTribuna
}