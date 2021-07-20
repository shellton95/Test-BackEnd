<?php

namespace App\Http\Controllers;
use App\Models\Escola as ModelsEscola;
use Illuminate\Http\Request;
use models\Escola;
class EscolaController extends Controller
{
    
    public function index()
    {
        $escolas = ModelsEscola::all();
        return $escolas->toJson();

    }

    
    public function store(Request $request)
    {
        $escolas = new ModelsEscola;
        $escolas->nome = $request->input('nomeEscola');
        $escolas->bairro = $request->input('bairro');
        $escolas->Cep = $request->input('cep');
        $escolas->Rua = $request->input('rua');
        $escolas->numero = $request->input('numero');
        $escolas->save();
        return json_encode($escolas);

    }


   
    public function update(Request $request, $id)
    {
        $escolas = ModelsEscola::find($id);
        $escolas->nome = $request->input('nomeEscola');
        $escolas->bairro = $request->input('bairro');
        $escolas->Cep = $request->input('cep');
        $escolas->Rua = $request->input('rua');
        $escolas->numero = $request->input('numero');
        $escolas->save();
        return json_encode($escolas);
    }

    
    public function destroy($id)
    {
        $escolas = ModelsEscola::find($id);
        $escolas->delete();
        
    }
}
