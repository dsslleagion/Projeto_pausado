import { useContext } from 'react'
import { ContextoCandidato } from '../contexts/CandidatoContext'

export default function useContextoCandidato(){
    const contextoCandidato = useContext(ContextoCandidato)
    return contextoCandidato
}