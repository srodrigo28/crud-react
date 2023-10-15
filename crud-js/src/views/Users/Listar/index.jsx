import axios from "axios";
import { useState, useEffect } from "react";

export function Listar() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/users')
          .then(response => setData(response.data));
        }, [data.data]);
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
                                <td>{item.id + 1}</td>
                                <td>{item.nome}</td>
                                <td>{item.email}</td>
                                <td>{item.senha}</td>
                                <td>
                                    <button>Editar</button>
                                    <button>Excluir</button>
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
        </>
    )
}