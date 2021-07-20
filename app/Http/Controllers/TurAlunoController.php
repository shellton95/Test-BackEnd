<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\Tb_turma_aluno as ModelsTurmaAluno;
use Illuminate\Http\Request;
use models\Tb_turma_aluno;
use models\Turma;
class TurAlunoController extends Controller
{
    /*
    public function index($id,$idturma)
    {
        $turmaAluno = DB::table("tb_turma_alunos")->where('id_escola', '=', $id)
                                                ->where('id_turma', '=', $idturma )
                                                ->get();
        foreach($turmaAluno as $c){
            $aluno = $c->turmas;
            return $aluno->toJson();
        }
       // return $turmaAluno->toJson();
    }

    */


    public function index($id,$idturma)
    {
        $turmaAluno = DB::table("tb_turma_alunos")
                     ->join('turmas', 'tb_turma_alunos.id_turma', '=', 'turmas.id')
                     ->join('alunos', 'tb_turma_alunos.id_aluno', '=', 'alunos.id')
                     ->select('tb_turma_alunos.id as id_tabela', 'alunos.id', 'alunos.nome', 'alunos.telefone', 'alunos.email', 'alunos.data_nascimento', 'alunos.genero')
                     ->where('tb_turma_alunos.id_escola', '=', $id)
                     ->where('tb_turma_alunos.id_turma', '=', $idturma )
                     ->get();
        return $turmaAluno->toJson();      
    }
    

    public function store(Request $request)
    {
        $novoAlunoTurma = new ModelsTurmaAluno();
        $novoAlunoTurma->id_aluno = $request->input('id_aluno');
        $novoAlunoTurma->id_escola = $request->input('campoidescola');
        $novoAlunoTurma->id_turma = $request->input('campoidturma');
        $novoAlunoTurma->save();
        return json_encode($novoAlunoTurma);
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        $alunoTurma = ModelsTurmaAluno::find($id);
        $alunoTurma->delete();
    }
}
