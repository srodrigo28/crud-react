import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function Login(){

    const [ email, setEmail ] = useState("")
    const [ senha, setSenha ] = useState("")

    const navigate = useNavigate()

    const Login = (e) => {
        e.preventDefault();

        const user = axios.post("http://localhost:3001/users", {
            email,
            senha
        })
      .then( () => {
        console.log(email);
        console.log(senha);
        console.log(!user.email === email);
        // navigate("/condominio", { replace: true })
      })
      .catch(() => {
        console.log("Login error: ");
    })
    }
    return(
        <div className="container">
            <form className="mt-5">
                <h1  className="mb-5">Login</h1>
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="" >E-mail</label>
                        <input type="text" className="form-control" onChange={ e => setEmail( e.target.value )} />
                    </div>

                    <div className="col-6 mb-3">
                        <label htmlFor="">Senha</label>
                        <input type="password" className="form-control" onChange={ e => setSenha( e.target.value )}/>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={Login}>Login</button>
                <Link to="/register">
                    <button className="btn btn-danger" >Register</button>
                </Link>

            </form>
        </div>
    )
}