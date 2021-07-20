import Menu from "../menu"
import { useContext } from 'react';
import { DadosContext } from "../context/context";
import axios from "axios";
import { useState,useEffect } from "react";
import { toast } from 'react-toastify';
export default function AlunosEscola(){
    
    const {idescola, setidescola} = useContext(DadosContext);
    const [alunos, setalunos] = useState([]);
    const [idAluno, setidaluno] = useState('');
    const [nome, setnome] = useState('');
    const [telefone, settelefone] = useState('');
    const [email, setemail] = useState('');
    const [dataNasci, setdataNasci] = useState('');
    const [genero, setgenero] = useState('');
    const [pesquisaAluno, setpesquisaAluno] = useState('');
    const [totalAlunos, setTotalAlunos] = useState('');
    

    useEffect( () => {
        function loadAlunos(){

             // pegando id do local storage
             let teste = '';
             let local = localStorage.getItem('idescola');
             setidescola(JSON.parse(local));
             teste = JSON.parse(local);
             console.log(teste)

            fetch(`http://127.0.0.1:8000/api/alunos/${idescola}`)
            .then( (r) => r.json())
            .then( (json) => {
                setalunos(json);
                
            })
        }

        function loadTotalAlunos(){
            fetch(`http://127.0.0.1:8000/api/alunos/totalalunos/${idescola}`)
            .then( (r) => r.json())
            .then( (json) => {
                json.map( function (item) {
                   setTotalAlunos(item.totalalunos);
                  // console.log(item.totalalunos)
            })
                
            })
            let campo = document.getElementById('campoidescola');
            campo.style.display= 'none';
        }

        

        loadAlunos();
        loadTotalAlunos();
       
    }, [pesquisaAluno]);

    const filtroPesquisa = alunos.filter( (item) => pesquisaAluno == '' ? alunos : item.nome.startsWith(pesquisaAluno))

    function handleSubimitAluno(event){
        event.preventDefault();
        let campoidescola = document.getElementById('campoidescola').value;

        if(nome == ''){
            return alert("Preencha o campo NOME")
        }else if(email == ''){
            return alert("Preencha o campo EMAIL")
        }
        
        let novo = {
            nome,telefone, email, dataNasci, genero, campoidescola 
        }
        
        axios.post('http://127.0.0.1:8000/api/alunos', novo)
        .then( (res) => {
            console.log(res);
        })
        alert("Aluno Cadastrado com Sucesso");
        setnome('');
        settelefone('');
        setemail('');
        setdataNasci('');
        setgenero('');

    }

    function ocultaButaoAtualiza(){
        
        document.getElementById('btnCadastraTurma').disabled = false;
        document.getElementById('btnAtualizaTurma').disabled = true;
        
    }

    function closeModal(){
        document.getElementById('btnAtualizaTurma').disabled = false;
        document.getElementById('btnCadastraTurma').disabled = false;
        setnome('');
        settelefone('');
        setemail('');
        setdataNasci('');
        setgenero('');
    }

    function dadosUpdate(id, nome,telefone, email, dataNasci, genero){
        setidaluno(id);
        setnome(nome);
        settelefone(telefone);
        setemail(email);
        setdataNasci(dataNasci);
        setgenero(genero);

        document.getElementById('btnAtualizaTurma').disabled = false;
        document.getElementById('btnCadastraTurma').disabled = true;

    }   

    function updateAluno(event){
        event.preventDefault();
        let campoidescola = document.getElementById('campoidescola').value;
        let novo = {
            nome,telefone, email, dataNasci, genero, campoidescola 
        }

        axios.put(`http://127.0.0.1:8000/api/alunos/edit/${idAluno}`, novo)
        .then( (res) => {
            console.log(res);
        })
        alert("Aluno Atualizado com Sucesso");
        setnome('');
        settelefone('');
        setemail('');
        setdataNasci('');
        setgenero('');
        
    }

    function deleteAluno(id){
        axios.delete(`http://127.0.0.1:8000/api/alunos/delete/${id}`)
        .then( (res) => {
            console.log(res);
        }) 
        alert("Aluno Excluida com Sucesso");
    }

    return(
        <div >
           <Menu />
            <div className="container">
                <div className="pesquisa-AluTurma">
                    <label  for="specificSizeInputName " >Pesquisa</label>
                    <input value={pesquisaAluno} onChange={e => setpesquisaAluno(e.target.value)}
                     className="tags-pesquisa" type="text"  placeholder="Pesquisa Aluno" />
                    <button onClick={ocultaButaoAtualiza} id="btnPesAluTurma" type="button" class=" tags-pesquisa btn btn-primary btn-sm" 
                      data-bs-toggle="modal" data-bs-target="#staticBackdrop">Cadastrar</button>
                </div>
                <div className="table-lista">
                    <table className="table table-lista">
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
                                filtroPesquisa.map( (item) => (
                                    <tr key={item.id}>
                                        <th scope="row">{item.id}</th>
                                        <td> {item.nome} </td>
                                        <td> {item.telefone} </td>
                                        <td> {item.email} </td>
                                        <td> {item.data_nascimento} </td>
                                        <td> {item.genero} </td>
                                        <td>
                                            <button onClick={() => dadosUpdate(item.id,item.nome, item.telefone, item.email, item.data_nascimento, item.genero)}
                                            type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Editar</button>
                                            <button onClick={() => deleteAluno(item.id)} type="button" class="btn btn-danger btn-sm" >Excluir</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="totalAlunos">Total: {totalAlunos} Alunos </div>
            </div>

            { /*<!-- Modal cadastro --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Cadastrar de Alunos</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label for="formGroupExampleInput" className="form-label">Nome Aluno</label>
                                    <input type="text" value={nome} onChange={ e => setnome(e.target.value)} className="form-control" id="formGroupExampleInput" placeholder="Nome Aluno" />
                                </div>
                                <div class="mb-3">
                                    <label for="formGroupExampleInput" class="form-label">Telefone</label>
                                    <input type="text" value={telefone} onChange={ e => settelefone(e.target.value)} className="form-control" id="formGroupExampleInput" placeholder="Telefone" />
                                </div>
                                <div class="mb-3">
                                    <label for="formGroupExampleInput2" className="form-label">Email</label>
                                    <input type="text" value={email} onChange={ e => setemail(e.target.value)} class="form-control" id="formGroupExampleInput2" placeholder="Email" />
                                </div>
                                <div className="mb-3">
                                    <label for="formGroupExampleInput2" className="form-label">Data Nascimento</label>
                                    <input type="date" value={dataNasci} onChange={ e => setdataNasci(e.target.value)} class="form-control" id="formGroupExampleInput2" placeholder="Data Nascimento" />
                                </div>
                                <div className="mb-3">
                                    <label for="formGroupExampleInput2" className="form-label">Genero</label>
                                    <select id="inputState" className="form-select" value={genero} onChange={ e => setgenero(e.target.value)}>
                                        <option value=""></option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Feminino">Feminino</option>
                                    </select>  
                                   
                                </div>
                                <input id="campoidescola" type="text" value={idescola} />
                            </div>
                            <div className="modal-footer">
                                <button onClick={closeModal} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                <button onClick={updateAluno} id="btnAtualizaTurma"  type="button" class="btn btn-primary">Atualizar</button>
                                <button id="btnCadastraTurma" onClick={handleSubimitAluno}  type="button" class="btn btn-primary">Cadastrar</button>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
        
    )
}