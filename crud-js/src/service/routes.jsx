import { Condominio } from './../views/Condominio'
import { Users } from './../views/Users'
import { Investidor } from './../views/Investidor'
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    { path: "/", element: <Condominio /> },
    { path: "/home", element: <Condominio /> },
    { path: "/uses", element: <Investidor /> },
    
]);

