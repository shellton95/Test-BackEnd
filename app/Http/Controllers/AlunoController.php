<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Aluno as ModelsAluno;
use Illuminate\Support\Facades\DB;
use models\Aluno;
class AlunoController extends Controller
{
    
    public function index($id)
    {
        $alunos = DB::table("alunos")->where("id_escola", "=", $id)->get();
        return $alunos->toJson();
    }

    public function indexTotal($id)
    {
        $alunos = DB::table("alunos")->select(DB::raw('count(*) as totalalunos, id_escola'))
                    ->where("id_escola", "=", $id)
                    ->groupBy('id_escola')
                    ->get();
         
        return $alunos->toJson();
    }

    public function store(Request $request)
    {
        $aluno = new ModelsAluno();
        $aluno->nome = $request->input('nome');
        $aluno->telefone = $request->input('telefone');
        $aluno->email = $request->input('email');
        $aluno->data_nascimento = $request->input('dataNasci');
        $aluno->genero = $request->input('genero');
        $aluno->id_escola = $request->input('campoidescola');
        $aluno->save();
        return json_encode($aluno);
    }

    public function update(Request $request, $id)
    {
        $aluno = ModelsAluno::find($id);
        $aluno->nome = $request->input('nome');
        $aluno->telefone = $request->input('telefone');
        $aluno->email = $request->input('email');
        $aluno->data_nascimento = $request->input('dataNasci');
        $aluno->genero = $request->input('genero');
        $aluno->id_escola = $request->input('campoidescola');
        $aluno->save();
        return json_encode($aluno);
    }

    
    public function destroy($id)
    {
        $aluno = ModelsAluno::find($id);
        $aluno->delete();
        
    }
}
