import { Condominio } from './../views/Condominio'
import { Users } from './../views/Users'
import { createBrowserRouter, BrowserRouter, Route, Link } from "react-router-dom";

const router = createBrowserRouter([
    { path: "/", element: <Condominio /> },
    { path: "/home", element: <Condominio /> },
    { path: "/uses", element: <Users /> },
]);

