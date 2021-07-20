import axios from "axios";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { DadosContext } from "../context/context";
import { toast } from "react-toastify";



export default function Escolas(){

    const [escolas, setescolas] = useState([]);
    const [pesquisaEscola, setpesquisaEscola] = useState('');

    const {idescola, setidescola} = useContext(DadosContext);
    const [nomeEscola, setnomeEscola] = useState('');
    const [bairro, setbairro] = useState('');
    const [cep, setcep] = useState('');
    const [rua, setrua] = useState('');
    const [numero, setnumero] = useState('');

    useEffect( () => {
        function loadEscolas(){
            fetch('http://127.0.0.1:8000/api/escolas')
            .then( (r) => r.json())
            .then( (json) => {     
                setescolas(json); 
                 
            })
        }

 
        loadEscolas();
        

    }, [pesquisaEscola])

    const escolasFiltro = escolas.filter( (item) => pesquisaEscola == '' ? escolas : item.nome.startsWith(pesquisaEscola));

    

    function handleSubmit(event){
        event.preventDefault();
        if(nomeEscola == '' && bairro == '' && cep == '' && rua == '' && numero == '' ){
            return alert('Preencha Todos os Campos');
        }
        let novo = {
            nomeEscola, bairro, cep, rua, numero
        }


        axios.post('http://127.0.0.1:8000/api/escolas', novo)
        .then( (res) => {
            console.log(res);
        })
        alert('cadastro realizado com sucesso')
        setnomeEscola('');
        setbairro('');
        setcep('');
        setrua('');
        setnumero('');

        
    }

    function deleteEscola(id){
        //event.preventDefault();
        axios.delete(`http://127.0.0.1:8000/api/escolas/${id}`)
        .then( (res) => {
            console.log(res);
        }) 
        alert('Escola Excluida com Sucesso')

    }


    function dadosUpdate(id, nome, bairro, cep, rua, numero){
        setidescola(id);
        setnomeEscola(nome);
        setbairro(bairro);
        setcep(cep);
        setrua(rua);
        setnumero(numero);
    }


    function updateEscola(event){
        event.preventDefault();

        let dadosUpdate = {
            nomeEscola, bairro, cep, rua, numero
        }

        axios.put(`http://127.0.0.1:8000/api/escolas/edit/${idescola}`, dadosUpdate)
        .then( (res) => {
            console.log(res);
        })
        alert("Cadastro atualizado com Sucesso");
        setidescola('');
        setnomeEscola('');
        setbairro('');
        setcep('');
        setrua('');
        setnumero('');
    }

    function deleteStorage(){
        setidescola('');
        localStorage.clear();
    }

    function entraEscolaTurma(id){
        deleteStorage();
        const usaIdEscola = localStorage.getItem('idescola');
        let school = JSON.parse(usaIdEscola) || [];
        school.push(id);
        localStorage.setItem('idescola', JSON.stringify(school)); 
        setidescola(id);    
    }

   
   
    
    return (
        <div className="container">
           <h1 className="text-center">Escolas</h1>
           <hr />
            <div className="pesquisa-AluTurma">
                <label  for="specificSizeInputName " >Pesquisa</label>
                <input value={pesquisaEscola} onChange={e => setpesquisaEscola(e.target.value)}  className="tags-pesquisa" 
                type="text"  placeholder="Pesquisa Escola" />
            </div>
           <div className="row-cards">
               
            {escolasFiltro.map( (item) => (
                <div key={item.id} className="card card-whidt col-md-3">
                    
                    <div className="card-body">
                        <h5 className="card-title">{item.nome}</h5>
                        <p className="card-text"><strong>Id resgistro: {item.id}</strong> </p>
                        <p className="card-text"><strong> bairro:</strong> {item.bairro} </p>
                        <p className="card-text"><strong> Cep:</strong>  {item.Cep}</p>
                        <p className="card-text"><strong> Rua:</strong> {item.Rua}</p>
                        <p className="card-text"><strong> N°:</strong> {item.numero}</p>
                        <Link onClick={() => entraEscolaTurma(item.id)} className="btn btn-success btn-sm btn-card" to="/escola/turmas">Entrar</Link>
                        <button className="btn btn-secondary btn-sm btn-card"
                         onClick={ () => dadosUpdate(item.id, item.nome, item.bairro, item.Cep, item.Rua, item.numero)}
                          data-bs-toggle="modal" data-bs-target="#staticBackdrop2" >Editar</button>
                        <button onClick={ () => deleteEscola( item.id )} className="btn btn-danger btn-sm btn-card">Excluir</button>
                    </div>
                </div>
            ))} 

            <div id="card-adicionar" className="card card-whidt col-md-3 " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <img className="img-adicionar" src="https://image.flaticon.com/icons/png/512/1665/1665731.png"  />
            </div>
           </div>

           { /*<!-- Modal cadastro --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form onSubmit= { handleSubmit } >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Cadastrar Escola</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label for="formGroupExampleInput" className="form-label">Nome Escola</label>
                                    <input type="text" value={nomeEscola} onChange={ e => setnomeEscola(e.target.value)} className="form-control" id="formGroupExampleInput" placeholder="Nome" required />
                                </div>
                                <div className="mb-3">
                                    <label for="formGroupExampleInput2" className="form-label">Bairro</label>
                                    <input type="text" value={bairro} onChange={ e => setbairro(e.target.value)} className="form-control" id="formGroupExampleInput2" placeholder="Bairro" required />
                                </div>
                                <div className="mb-3">
                                    <label for="formGroupExampleInput2" className="form-label">CEP</label>
                                    <input type="text" value={cep} onChange={ e => setcep(e.target.value)} className="form-control" id="formGroupExampleInput2" placeholder="CEP" required/>
                                </div>
                                <div className="mb-3">
                                    <label for="formGroupExampleInput2" className="form-label">Rua</label>
                                    <input type="text" value={rua} onChange={ e => setrua(e.target.value)} className="form-control" id="formGroupExampleInput2" placeholder="Rua" required/>
                                </div>
                                <div className="mb-3">
                                    <label for="formGroupExampleInput2" className="form-label">Numero</label>
                                    <input type="number" value={numero} onChange={ e => setnumero(e.target.value)} className="form-control" id="formGroupExampleInput2" placeholder="Numero" required/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button  type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                <button onClick={handleSubmit} type="button" className="btn btn-primary">Cadastrar</button>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>


            { /*<!-- Modal Update --> */}
            <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form  >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Cadastrar Escola</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label for="formGroupExampleInput" className="form-label">Nome Escola</label>
                                    <input type="text" value={nomeEscola} onChange={ e => setnomeEscola(e.target.value)} className="form-control" id="formGroupExampleInput" placeholder="Nome" required/>
                                </div>
                                <div className="mb-3">
                                    <label for="formGroupExampleInput2" className="form-label">Bairro</label>
                                    <input type="text" value={bairro} onChange={ e => setbairro(e.target.value)} className="form-control" id="formGroupExampleInput2" placeholder="Bairro" required/>
                                </div>
                                <div className="mb-3">
                                    <label for="formGroupExampleInput2" class="form-label">CEP</label>
                                    <input type="text" value={cep} onChange={ e => setcep(e.target.value)} className="form-control" id="formGroupExampleInput2" placeholder="CEP" required/>
                                </div>
                                <div className="mb-3">
                                    <label for="formGroupExampleInput2" className="form-label">Rua</label>
                                    <input type="text" value={rua} onChange={ e => setrua(e.target.value)} className="form-control" id="formGroupExampleInput2" placeholder="Rua" required/>
                                </div>
                                <div className="mb-3">
                                    <label for="formGroupExampleInput2" className="form-label">Numero</label>
                                    <input type="number" value={numero} onChange={ e => setnumero(e.target.value)} className="form-control" id="formGroupExampleInput2" placeholder="Numero" required/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button  type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                <button onClick={updateEscola}  type="button" className="btn btn-primary">Atualizar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
           
        </div>
    )
}