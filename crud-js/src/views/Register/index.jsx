// import api from "../../../service/axios"
import axios from "axios"

import { useState } from "react"
import { redirect } from "react-router-dom"

export function Register() {
    //Variaveis
    const [ nome, setNome ]   = useState("")
    const [ email, setEmail ] = useState("")
    const [ senha, setSenha ] = useState("")

     const Salvar = () => {

            axios.post("http://localhost:3001/users", {
                nome,
                email,
                senha
            })
    
            .then( () =>
                redirect("/login")
            )
    
            .catch( (error) => {
                console.log('erro: ' + error)
            })
        
    }

    return(
        <>
            <form>
                
                <label>Nome</label>
                <input type="text" onChange={ e => setNome(e.target.value)} />

                <label>E-mail</label>
                <input type="text" onChange={ e => setEmail(e.target.value)} />

                <label>Senha</label>
                <input type="password" onChange={ e => setSenha(e.target.value)} />

                
                <button onClick={Salvar}>Cadastrar</button>
            </form>
        </>
    )
}