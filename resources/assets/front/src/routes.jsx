
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Escolas from './components/escolas';
import Turmas from './components/turmas';
import AlunosTurma from './components/turmas/alunosturma';
import AlunosEscola from './components/escolas/alunosescola';
 const routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Escolas} />
                <Route exact path="/escola/turmas" component={Turmas} />
                <Route exact path="/escola/turmas/alunos" component={AlunosTurma} />
                <Route exact path="/escola/alunos" component={AlunosEscola} />
            </Switch>
        </BrowserRouter>
        
    )
}

export default routes;