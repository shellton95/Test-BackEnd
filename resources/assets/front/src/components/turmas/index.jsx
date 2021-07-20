import axios from "axios";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom"
import { useContext } from 'react';
import { DadosContext } from "../context/context";
import Menu from "../menu"
import { toast } from 'react-toastify';
export default function Turmas(){

    const {idescola, setidescola} = useContext(DadosContext);
    const {idTurmastorage, setIdTurmastorage} = useContext(DadosContext);
    const [turmas, setturmas] = useState([]);
    const [pesquisaTurma, setpesquisaTurma] = useState('');
    const [idTurma, setidTurma] = useState('');
    const [nomeTurma, setnomeTurma] = useState('');
    const [ano, setano] = useState('');
    const [nivEnsino,setnivEnsino] = useState('');
    const [serie, setserie] = useState('');
    const [turno, setturno] = useState('');

    useEffect( () => {
        function loadTurmas(){
            
            fetch(`http://127.0.0.1:8000/api/turmas/show/${idescola}`)
            .then( (r) => r.json())
            .then( (json) => {     
                setturmas(json); 
            })
            
           
            
        }

        function idescolaLocalStorage(){
            // pegando id do local storage
            let local = localStorage.getItem('idescola');
            setidescola(JSON.parse(local));

            let campo = document.getElementById('campoidescola');
            campo.style.display= 'none';
            
        }

       
        loadTurmas();
        idescolaLocalStorage()
        
    },[pesquisaTurma])

    const filtroPesquisa = turmas.filter( (item) => pesquisaTurma == '' ? turmas : item.nomeTurma.startsWith(pesquisaTurma))


    function handleSubimitTurma(event){
        event.preventDefault();
        let campoidescola = document.getElementById('campoidescola').value;
        //let campoid = parseInt(campoidescola);

        let novo = {
            nomeTurma, ano,nivEnsino,serie,turno,campoidescola 
        }
        console.log(novo)
        axios.post('http://127.0.0.1:8000/api/turmas', novo)
        .then( (res) => {
            console.log(res);
        })

        setnomeTurma('');
        setano('');
        setnivEnsino('');
        setserie('');
        setturno('');

        alert('Turma cadastrada com Sucesso');
    }

    function deleteTurma(id){
        axios.delete(`http://127.0.0.1:8000/api/turmas/${id}`)
        .then( (res) => {
            console.log(res);
        }) 
        alert("Turma Excluida com Sucesso");
    }

    function ocultaButaoAtualiza(){
        if(idTurma == ''){
            document.getElementById('btnCadastraTurma').disabled = false;
            document.getElementById('btnAtualizaTurma').disabled = true;
        }
    }

    function dadosUpdate(id, nome, ano, nivel, serie, turno){
        setidTurma(id);
        setnomeTurma(nome);
        setano(ano);
        setnivEnsino(nivel);
        setserie(serie);
        setturno(turno);

        document.getElementById('btnAtualizaTurma').disabled = false;
        document.getElementById('btnCadastraTurma').disabled = true;

    }

    function closeModal(){
        document.getElementById('btnAtualizaTurma').disabled = false;
        document.getElementById('btnCadastraTurma').disabled = false;
        setidTurma('');
        setnomeTurma('');
        setano('');
        setnivEnsino('');
        setserie('');
        setturno('');
    }

    function updateTurma(event){
        event.preventDefault(); 
        

        let dadosUpdate = {
            nomeTurma, ano,nivEnsino,serie,turno
        }

        axios.put(`http://127.0.0.1:8000/api/turmas/edit/${idTurma}`, dadosUpdate)
        .then( (res) => {
            console.log(res);
        })

        setidTurma('');
        setnomeTurma('');
        setano('');
        setnivEnsino('');
        setserie('');
        setturno('');
        alert("Dados Atualizados com Sucesso");

    }

    function entraTurmaAlunos(id){
        localStorage.removeItem('ideturma');
         const usaIdTurma = localStorage.getItem('ideturma');
         let school = JSON.parse(usaIdTurma) || [];
         school.push(id);
         localStorage.setItem('ideturma', JSON.stringify(school)); 
         setIdTurmastorage(id);    
     }

    return (
        <div>
            <Menu />
            
            <div className="body-escola">
                <div className="pesquisa-AluTurma">
                    <label  for="specificSizeInputName " >Pesquisa</label>
                    <input value={pesquisaTurma} onChange={e => setpesquisaTurma(e.target.value)}  className="tags-pesquisa" 
                    type="text"  placeholder="Pesquisa Turma" />
                </div>
                <div className="row-cards">

                    {
                        filtroPesquisa.map( (item) => (
                        <div className="card card-whidt col-md-3 ">
                            
                            <div className="card-body">
                                <h5 className="card-title">{item.nomeTurma}</h5>
                                <p className="card-text"><strong>Ano:</strong>  {item.ano} </p>
                                <p className="card-text"><strong>Nivel Ensino:</strong>  {item.nivEnsino} </p>
                                <p className="card-text"><strong>Série:</strong>  {item.serie} </p>
                                <p className="card-text"><strong>Turno:</strong>  {item.turno} </p>
                                <Link onClick={() => entraTurmaAlunos(item.id)} className="btn btn-success btn-sm btn-card" to="/escola/turmas/alunos">Entrar</Link>
                                <button className="btn btn-secondary btn-sm btn-card"
                                onClick={ () => dadosUpdate(item.id, item.nomeTurma, item.ano, item.nivEnsino, item.serie, item.turno)}
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Editar</button>
                                <button onClick={ () => deleteTurma( item.id )} className="btn btn-danger btn-sm btn-card">Excluir</button>
                            </div>
                        </div>
                        ))
                    }
                    

                    <div onClick={ocultaButaoAtualiza} id="card-adicionar" className="card card-whidt col-md-3 " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <img className="img-adicionar" src="https://image.flaticon.com/icons/png/512/1665/1665731.png"  />
                    </div>
                </div>
            </div>

            { /*<!-- Modal cadastro --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Cadastrar Turma</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label for="formGroupExampleInput" className="form-label">Nome Turma</label>
                                    <input type="text" value={nomeTurma} onChange={ e => setnomeTurma(e.target.value)} className="form-control" id="formGroupExampleInput" placeholder="Nome Turma" />
                                </div>
                                <div class="mb-3">
                                    <label for="formGroupExampleInput" class="form-label">Ano Turma</label>
                                    <input type="number" value={ano} onChange={ e => setano(e.target.value)} className="form-control" id="formGroupExampleInput" placeholder="Ano Turma" />
                                </div>
                                <div className="mb-3">
                                    <label for="formGroupExampleInput2" className="form-label">Nivel de Ensino</label>
                                    <select id="inputState" className="form-select" value={nivEnsino} onChange={ e => setnivEnsino(e.target.value)} >
                                        <option value=""></option>
                                        <option value="Fundamental">Fundamental</option>
                                        <option value="Medio">Medio</option>
                                        
                                    </select>    
                                </div>
                                <div class="mb-3">
                                    <label for="formGroupExampleInput2" className="form-label">Serie</label>
                                    <input type="number" value={serie} onChange={ e => setserie(e.target.value)} class="form-control" id="formGroupExampleInput2" placeholder="Serie" />
                                </div>
                                <div className="mb-3">
                                    <label for="formGroupExampleInput2" className="form-label">Turno</label>
                                    <input type="text" value={turno} onChange={ e => setturno(e.target.value)} class="form-control" id="formGroupExampleInput2" placeholder="Turno" />
                                </div>
                                <input id="campoidescola" type="text" value={idescola} />
                            </div>
                            <div className="modal-footer">
                                <button onClick={closeModal} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                <button onClick={updateTurma} id="btnAtualizaTurma"  type="button" class="btn btn-primary">Atualizar</button>
                                <button id="btnCadastraTurma" onClick={handleSubimitTurma}  type="button" class="btn btn-primary">Cadastrar</button>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    )
}