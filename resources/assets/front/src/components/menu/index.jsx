import { Link } from "react-router-dom";
import { useContext } from 'react';
import { DadosContext } from "../context/context";

export default function Menu(){

    const {idescola, setidescola} = useContext(DadosContext);

    function deleteStorage(){
        setidescola('');
        localStorage.clear();
    }
    return (
        <div>
             <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/escola/turmas">Turmas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/escola/alunos">Alunos</Link>
                            </li>
                        </ul>
                        <Link onClick={deleteStorage} class="btn btn-outline-danger" to="/">Voltar</Link>
                    </div>
                </div>
            </nav>
        </div>
       
    )
}