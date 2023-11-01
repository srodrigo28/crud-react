import { useEffect, useState } from "react";
import axios from "axios";

export function Condominio() {
    const url = "https://prisma-2023-2023.vercel.app/condominio"
    
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(url)
          .then(response => setData(response.data));
    }, [data]);

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
            axios.post(url, {
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

    const Remover =(id, nome) => {
        const res = window.confirm('Deseja realmente excluir? ' + nome)

        console.log(res)

    }

    return(
        <div className="container">
            <h1 className="text-center mt-3 mb-3">Controle Condominio</h1>
            
            <form className="mb-4">
                <div className="row">
                    <div className="col">
                        <label>Condomínio</label>
                        <input type="text" className="form-control" onChange={ e => setNome(e.target.value)} value={nome}/>
                    </div>
                    <div className="col">
                        <label>CNPJ</label>
                        <input type="text" className="form-control" onChange={ e => setCnpj(e.target.value)} value={cnpj}/>
                    </div>
                    <div className="col">
                        <label>Insc Estadual</label>
                        <input type="text" className="form-control" onChange={ e => setEstadual(e.target.value)} value={estadual}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label>Contato</label>
                        <input type="text" className="form-control" onChange={ e => setContato(e.target.value)} value={contato}/>
                    </div>
                    <div className="col">
                        <label>E-mail</label>
                        <input type="text" className="form-control" onChange={ e => setEmail(e.target.value)} value={email}/>
                    </div>
                    <div className="col">
                        <label>Cidade</label>
                        <input type="text" className="form-control" onChange={ e => setCidade(e.target.value)} value={cidade}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label>Endereço</label>
                        <input type="text" className="form-control" onChange={ e => setEndereco(e.target.value)} value={endereco}/>
                    </div>
                </div>
                
                <button className="btn btn-success" onClick={Salvar}>Cadastrar</button>
            </form>

            <h1 className="text-center">Lista</h1>

            <div className="table-responsive-sm">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Cod.</th>
                        <th>Nome</th>
                        {/* <th>CNPJ</th> */}
                        {/* <th>Insc. Estadual</th> */}
                        <th>Cidade</th>
                        {/* <th>Ações</th> */}
                    </tr>
                </thead>
            
                <tbody>
                    { data.map((item) => (
                        <tr  key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            {/* <td>{item.cnpj}</td> */}
                            {/* <td>{item.estadual}</td> */}
                            <td>{item.cidade}</td>
                            <td>
                                <button className="btn btn-outline-warning">Editar</button>
                                <button className="btn btn-outline-danger" onChange={ () => Remover( item.id, item.nome ) }> Excluir </button>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
            </div>
        </div>
    )
}