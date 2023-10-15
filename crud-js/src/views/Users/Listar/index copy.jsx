import axios from "axios";
import { useState, useEffect } from "react";

export function Listar() {
    const [data, setData] = useState([]);

    useEffect( () => {
        
        axios.get('http://localhost:3001/users')
          .then(response => setData(response.data));
    }, [data]);

    async function Remover(id){

        const res = window.confirm('Deseja realmente excluir?')

        if(res === true){
            
            await axios.delete(`http://localhost:3001/users/${id}`)

            return false
        }
    }

    return(
        <>
            <h1>Lista</h1>
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Senha</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        { data.map((item) => (
                            <tr  key={item.id+1}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.email}</td>
                                <td>{item.senha}</td>
                                <td>
                                    <button>Editar</button>
                                    <button onClick={ () => Remover(item.id) } >Excluir</button>
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
        </>
    )
}