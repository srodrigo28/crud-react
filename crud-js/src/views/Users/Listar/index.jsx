import axios from "axios";
import { useState, useEffect } from "react";

export function Listar() {

    const [ id, setId ]   = useState("")
    const [ nome, setNome ]   = useState("")
    const [ email, setEmail ] = useState("")
    const [ senha, setSenha ] = useState("")
    const [ data, setData] = useState([]);

    const [save, setSave] = useState('Salvar');
    const [editar, setEditar] = useState('');

    useEffect( () => {
        axios.get('http://localhost:3001/users')
          .then(response => setData(response.data));
    }, [data]);

    const Salvar = (e) => {
        e.preventDefault()

        axios.post("http://localhost:3001/users", {
            nome,
            email,
            senha
        })

        .then( () =>
            alert(nome + " Cadastrado com sucesso")
        )

        .catch( (error) => {
            console.log('erro: ' + error)
        })
    
    }

    const Remover =(id) => {
        const res = window.confirm('Deseja realmente excluir?')
        if(res === true){
            axios.delete(`http://localhost:3001/users/${id}`)
            return false
        }
    }

    const CarregaCampos = (nome, email, senha, id) => {
        // console.log(nome, email, senha, id)

        setSave(null)
        setEditar('Alterar')

        setNome(nome), setEmail(email), setSenha(senha), setId(id)

    }

    function Alterar(e){
        e.preventDefault()

        console.log(nome, email, senha, id)

        /***  */
        axios.put(`http://localhost:3001/users/${id}`, {
            nome,
            email,
            senha
        })
        .then( () => {
                alert(nome + " Atualizado com sucesso");
                setSave('Salvar');
                setEditar(null)
                setNome(''), setEmail(''), setSenha(''), setId('');
            }
        )
        .catch( (error) => {
            console.log('erro: ' + error)
        })
    }

    return(
        <>
         <form>
                <label>Nome</label>
                <input type="text" value={nome} onChange={ e => setNome(e.target.value)} />

                <label>E-mail</label>
                <input type="text" value={email} onChange={ e => setEmail(e.target.value)} />

                <label>Senha</label>
                <input type="password" value={senha} onChange={ e => setSenha(e.target.value)} />

                <input type="hidden" value={id} name="id" onChange={ e => setId(e.target.value)} />

                
                <button onClick={Salvar}>{save}</button>
                <button onClick={Alterar}>{editar}</button>
            </form>

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
                                    <button onClick={ () => CarregaCampos(item.nome, item.email, item.senha, item.id) }>Editar</button>
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