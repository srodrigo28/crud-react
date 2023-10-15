// import api from "../../../service/axios"
import axios from "axios"

import { useState } from "react"

export function Inserir() {
    //Variaveis
    const [ nome, setNome ] = useState("")
    const [ cnpj, setCnpj ] = useState("")
    const [ estadual, setEstadual ] = useState("")
    const [ contato, setContato ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ cidade, setCidade ] = useState("")
    const [ endereco, setEndereco ] = useState("")

     const Salvar = (event) => {
        event.preventDefault();

       console.log(nome, cnpj, estadual, contato, email, cidade, endereco);

        /***    */
            axios.post("http://localhost:3001/condominio", {
                nome,
                cnpj,
                estadual,
                contato,
                email,
                cidade
            })
    
            .then( () =>
                alert("Cadastrado com sucesso")
            )
    
            .catch( (error) => {
                console.log('erro: ' + error)
            })
        
    }

    return(
        <>
            <form>
                
                <label>Condomínio</label>
                <input type="text" onChange={ e => setNome(e.target.value)} />

                <label>CNPJ</label>
                <input type="text" onChange={ e => setCnpj(e.target.value)} />

                <label>Insc Estadual</label>
                <input type="text" onChange={ e => setEstadual(e.target.value)} />

                <label>Contato</label>
                <input type="text" onChange={ e => setContato(e.target.value)} />

                <label>E-mail</label>
                <input type="text" onChange={ e => setEmail(e.target.value)} />

                <label>Cidade</label>
                <input type="text" onChange={ e => setCidade(e.target.value)} />

                <label>Endereço</label>
                <input type="text" onChange={ e => setEndereco(e.target.value)} />
                
                <button onClick={Salvar}>Cadastrar</button>
            </form>
        </>
    )
}