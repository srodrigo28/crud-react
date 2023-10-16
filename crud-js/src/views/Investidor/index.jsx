import axios from "axios";
import './style.css'
import { useState, useEffect } from "react";
import CountUp from 'react-countup';

export function Investidor() {
    const url = "http://localhost:3001/investidor";
    const [ data, setData] = useState([]); // Controle de carregamento e atualização da api

    const [ id, setId ]   = useState("")
    const [ nome, setNome ]   = useState("")
    const [ dataInvest, setDataInvest ] = useState("")
    const [ percentual, setPercentual ] = useState("")
    const [ valor, setValor ] = useState("")

    const [ classBtnInserir, setClassBtnInserir] = useState('');
    const [ classBtnAlterar, setClassBtnAlterar] = useState('sumir');

    const amount = 500000;

    // const total2 = data.map((acc, item) => {
    //     return acc + item;
    // });

    // const numeros = [10, 20, 30, 40, 50];



    // console.log(total2)

    /** Metodo Carregar dados
    useEffect( () => {
        axios.get(url)
        .then( response => setData(response.data) );
    }, [data]);
    */

    useEffect( () => {
        axios.get(url)
        .then( response => { 
            setData(response.data)
            console.log(response.data[1]['nome'])
            console.log(response.data[1]['valor'])

            // const dobro = data.map(( item ) => item.valor * 2);
            // console.log(dobro)
        });
    }, []);

    /** Metodo Calcular dados   */
        // const total = useMemo( () => {
        //     let total = 0;


        //     console.log(total)


        // },[]) 
        // console.log(total);

    /** Metodo Inser  */
    const Inserir = (e) => {
        e.preventDefault()

        axios.post(url, {
            nome,
            dataInvest,
            percentual,
            valor
        })
        .then( () => {
                alert(nome + " Cadastrado com sucesso")
                setNome(''), setDataInvest(''), setPercentual(''), setValor('')
            }
        )
        .catch( (error) => {
            console.log('erro: ' + error)
        })
    }

    /** Metodo Remover  */
    const Remover =(id, nome) => {
        const res = window.confirm('Deseja realmente excluir? ' + nome)
        if(res === true){
            axios.delete(`${url}/${id}`)
            return false
        }
    }

    /** Metodo Carregar campos para editar  */
    const CarregaCampos = (nome, dataInvest, percentual, valor, id) => {
            setClassBtnInserir('sumir')
            setClassBtnAlterar('')

            setNome(nome), setDataInvest(dataInvest), setPercentual(percentual), setValor(valor), setId(id);
    }

    /** Metodo Alterar  */
    function Alterar(e){
        e.preventDefault()

        axios.put(`${url}/${id}`, {
            nome,
            dataInvest,
            percentual,
            valor
        })
        .then( () => {
                alert(nome + " Atualizado com sucesso");
                
                setNome(''), setDataInvest(''), setPercentual(''), setValor(''), setId('');

                setClassBtnInserir('')
                setClassBtnAlterar('sumir')
            }
        )
        .catch( (error) => {
            console.log('erro: ' + error)
        })
    }

    /** View */
    return(
        <div className="container pt-3">
            
            <div className="alert alert-primary mt-3" > <b>Caixa Atual :</b> 
                <CountUp className="btn btn-primary"
                    end={amount}
                    duration={3.0}
                    prefix="R$ "
                    separator="."
                    decimal=","
                    decimals={2}
                />
            </div>

            <h1 className="mt-5 mb-5">Controle de Investidores</h1>
            <form className="mb-5">
                <div className="row mb-2">
                        <div className="col">
                            <label>Nome</label>
                            <input type="text" className="form-control" value={nome} onChange={ e => setNome(e.target.value)} />
                        </div>
                        <div className="col-2">
                            <label>Data Investimento</label>
                            <input  type="date" 
                                    className="form-control text-center" 
                                    value={ dataInvest } 
                                    onChange={ e => setDataInvest(e.target.value) } 
                            />
                        </div>
                        <div className="col-1">
                            <label>Percentual</label>
                            <input  type="text" 
                                    className="form-control text-center" 
                                    value={percentual} 
                                    onChange={ e => setPercentual(e.target.value)}
                            />
                        </div>
                        <div className="col-2">
                            <label>Valor</label>
                            <input 
                                type="text" 
                                className="form-control text-center" 
                                value={ valor } 
                                onChange={ e => setValor(e.target.value)} 
                            />
                        </div>
                </div>
                <input type="hidden" value={id} name="id" onChange={ e => setId(e.target.value)} />

                    <button className={`btn btn-outline-primary ${classBtnInserir}`} onClick={Inserir}>Salvar</button>
                    <button className={`btn btn-outline-warning ${classBtnAlterar}`} onClick={Alterar}>Editar</button>

                    <p> {  } </p>
            </form>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th className="fild-50">ID</th>
                        <th>Nome</th>
                        <th className="fild-100">Data Inicio</th>
                        <th className="fild-100">Percentual %</th>
                        <th  className="fild-100">Valor</th>
                        <th  className="fild-100">Lucro M.</th>
                        <th  className="fild-100">Lucro 12.</th>
                        <th className="fild-100">Ações</th>
                    </tr>
                </thead>
            
                <tbody>
                    { data.map((item) => (
                        <tr key={item.id}>
                            <td className="fild-50">{item.id}</td>
                            <td>{item.nome}</td>
                            <td  className="fild-100"> { new Intl.DateTimeFormat('pt-BR').format( new Date( item.dataInvest )) } </td>
                            <td  className="fild-100">{  parseFloat(item.percentual) } %</td>
                            <td  className="fild-100">{ new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format( parseFloat(item.valor) )}</td>
                            <td className="fild-100">{ 
                                new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                                }).format( (item.valor * item.percentual) / 100 ) 
                                }
                            </td>
                            <td className="fild-100">{ 
                                new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                                }).format( (( item.valor * item.percentual ) / 100) * 12 ) 
                                }
                            </td>
                            <td className="fild-btn">
                                <button onClick={ () => CarregaCampos( item.nome, item.dataInvest, item.percentual, item.valor, item.id ) } className="btn btn-outline-warning">
                                    <i className="fa-regular fa-pen-to-square"></i>
                                </button>
                                <button onClick={ () => Remover(item.id, item.nome) }  className="btn btn-outline-danger">
                                    <i className="fa-regular fa-trash-can">
                                </i></button>
                            </td>
                        </tr>

                        ))
                    }
                </tbody>
            </table>
            <div className="row text-end">
                <div className="col-2">
                    <input  
                            type="text" 
                            className="form-control text-center" disabled placeholder="R$ 170.500,00"
                    />
                </div>
            </div>
            <nav className="">
                <ul className="pagination justify-content-center">
                    <li className="page-item"><a className="page-link" href="#">Anterior</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Próximo</a></li>
                </ul>
            </nav>
        </div>
    )
}