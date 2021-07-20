<?php

namespace App\Http\Controllers;
use App\Models\Turma as ModelsTurma;
use Illuminate\Support\Facades\DB;
use models\Turma;
use Illuminate\Http\Request;

class TurmaController extends Controller
{
    
    public function index($id) 
    {
      //  $turmas = ModelsTurma::find($id);
      
       $turmas = DB::table("turmas")->where('id_escola', '=', $id)->get();
        return $turmas->toJson();

    }


    public function store(Request $request)
    {
        $turma = new ModelsTurma;
        $turma->nomeTurma = $request->input('nomeTurma');
        $turma->ano = $request->input('ano');
        $turma->nivEnsino = $request->input('nivEnsino');
        $turma->serie = $request->input('serie');
        $turma->turno = $request->input('turno');
        $turma->id_escola = $request->input('campoidescola');
        $turma->save();
        return json_encode($turma);
    }


    public function update(Request $request, $id)
    {
        $turma = ModelsTurma::find($id);
        $turma->nomeTurma = $request->input('nomeTurma');
        $turma->ano = $request->input('ano');
        $turma->nivEnsino = $request->input('nivEnsino');
        $turma->serie = $request->input('serie');
        $turma->turno = $request->input('turno');
        $turma->save();
        return json_encode($turma);
    }

    public function destroy($id)
    {
        $turmas = ModelsTurma::find($id);
        $turmas->delete();
        return redirect('/escola/turmas');
    }
}
