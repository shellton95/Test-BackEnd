
import Menu from "../menu"
import { useContext } from 'react';
import { DadosContext } from "../context/context";
import axios from "axios";
import { useState,useEffect } from "react";
import { toast } from 'react-toastify';
export default function AlunosTurma(){

    const {idescola, setidescola} = useContext(DadosContext);
    const {idTurmastorage, setIdTurmastorage} = useContext(DadosContext);
    const [alunosTurma, setTurmaAlunos] = useState([]);
    const [alunos, setalunos] = useState([]);
    const [pesquisaAluno, setpesquisaAluno] = useState('');
    const [idaluno, setidaluno] = useState('');
    const [idturma, setidturma] = useState('');

    
    useEffect( () => {
        // pegando id do local storage

        function loadAlunosTurma(){
            let teste = '';
            let local = localStorage.getItem('idescola');
            setidescola(JSON.parse(local));
            teste = JSON.parse(local);
        
    
           fetch(`http://127.0.0.1:8000/api/turmaluno/${idescola}/${idTurmastorage}`)
           .then( (r) => r.json())
           .then( (json) => {
               setTurmaAlunos(json)
           })
           
        }

        function loadAlunos(){

            // pegando id do local storage
            let teste = '';
            let local = localStorage.getItem('idescola');
            setidescola(JSON.parse(local));
            teste = JSON.parse(local);
            

           fetch(`http://127.0.0.1:8000/api/alunos/${idescola}`)
           .then( (r) => r.json())
           .then( (json) => {
               setalunos(json);
               
           })
       }

       loadAlunosTurma();
       loadAlunos();
    }, [pesquisaAluno])

    const filtroPesquisa = alunosTurma.filter( (item) => pesquisaAluno == '' ? alunosTurma : item.nome.startsWith(pesquisaAluno))

    
    function disBtnAdic(){
        alunosTurma.forEach( function(item,id) {
            document.getElementById(`adicionaAluno${item.id}`).disabled = true;
            
        })
    }

    function adicionaAlunos(id_aluno){
       // event.preventDefault();
        let campoidescola = document.getElementById('campoidescola').value;
        let campoidturma = document.getElementById('campoidturma').value;
        document.getElementById(`adicionaAluno${id_aluno}`).disabled = true;
        
        let novo = {
            id_aluno, campoidescola, campoidturma
        }
        
        
        axios.post('http://127.0.0.1:8000/api/turmaluno', novo)
        .then( (res) => {
            console.log(res);
        })
        alert("Aluno Adicionado a Turma");
        
    }

    function excluirAlunoTurma(id){
       
        axios.delete(`http://127.0.0.1:8000/api/turmaluno/delete/${id}`)
        .then( (res) => {
            console.log(res);
        }) 

        function habBtnAdic(){
            alunosTurma.forEach( function(item,id) {
                document.getElementById(`adicionaAluno${item.id}`).disabled = false;
                
            })
        }
        habBtnAdic();

        alert("Aluno retirado da turma com Sucesso");
       
    }

  
  
    
    return(
        <div >
            <Menu />
            <div className="container">
                <div className="pesquisa-AluTurma">
                <div className="pesquisa-AluTurma">
                    <label  for="specificSizeInputName " >Pesquisa</label>
                    <input   value={pesquisaAluno} onChange={e => setpesquisaAluno(e.target.value)} className="tags-pesquisa" type="text"  placeholder="Pesquisa Aluno" />
                    <button  onClick={disBtnAdic} type="button" class=" tags-pesquisa btn btn-success btn-sm"
                    data-bs-toggle="modal" data-bs-target="#staticBackdrop">Adicionar Alunos</button>
                </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Email</th>
                            <th scope="col">Data-Nascimento</th>
                            <th scope="col">Genero</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        {
                            filtroPesquisa.map( (item) => (
                                <tr key={item.id}>
                                    <th scope="row"> {item.id} </th>
                                    <td>{ item.nome }</td>
                                    <td> {item.telefone} </td>
                                    <td> {item.email} </td>
                                    <td> {item.data_nascimento} </td>
                                    <td> {item.genero} </td>
                                    <td>
                                    <button onClick={()=>excluirAlunoTurma(item.id_tabela)} type="button" class="btn btn-danger btn-sm">Remover</button>
                                    </td>
                                </tr>
                            ))
                        }
                
                    </tbody>
                </table>
            </div>


            { /*<!-- Modal cadastro --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog  modal-xl">
                   
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Adicionar Alunos</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Telefone</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Data-Nascimento</th>
                                        <th scope="col">Genero</th>
                                        <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            alunos.map( (item) => (
                                                <tr key={item.id}>
                                                    <th scope="row">{item.id}</th>
                                                    <td> {item.nome} </td>
                                                    <td> {item.telefone} </td>
                                                    <td> {item.email} </td>
                                                    <td> {item.data_nascimento} </td>
                                                    <td> {item.genero} </td>
                                                    <td>
                                                    <button id={`adicionaAluno${item.id}`} onClick={ ()=>adicionaAlunos(item.id)} type="button"
                                                     class=" tags-pesquisa btn btn-success btn-sm">Adicionar</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="modal-footer">
                                <button  type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                <input id="campoidescola" type="text" value={idescola} />
                            <input id="campoidturma" type="text" value={idTurmastorage} />
                            </div>
                        </div>
                    
                </div>
            </div>
            
        </div>
        
    )
}