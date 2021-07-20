import { useState, createContext, useEffect } from 'react';

export const  DadosContext = createContext({});

export default function Dados({children}){
    const [idescola, setidescola] = useState('');
    const [idTurmastorage, setIdTurmastorage] = useState('');

    return (
        <DadosContext.Provider value = {{
            idescola, setidescola,
            idTurmastorage, setIdTurmastorage
        }} >
            { children }
        </DadosContext.Provider>
    )


}