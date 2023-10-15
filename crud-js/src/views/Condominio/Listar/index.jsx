import axios from "axios";
import { useState, useEffect } from "react";

export function Listar() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/condominio')
          .then(response => setData(response.data));
        }, [data]);
    return(
        <>
            <h1>Lista</h1>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>CNPJ</th>
                            <th>Insc. Estadual</th>
                            <th>Cidade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        { data.map((item) => (
                            <tr  key={item.id+1}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.cnpj}</td>
                                <td>{item.estadual}</td>
                                <td>{item.cidade}</td>
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