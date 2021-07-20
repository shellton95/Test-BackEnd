<?php

use App\Http\Controllers\EscolaController;
use App\Http\Controllers\TurmaController;
use App\Http\Controllers\AlunoController;
use App\Http\Controllers\TurAlunoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/escolas', [EscolaController::class, 'index']);
Route::post('/escolas', [EscolaController::class, 'store']);
Route::delete('/escolas/{id}', [EscolaController::class, 'destroy']);
Route::put('/escolas/edit/{id}', [EscolaController::class, 'update']);

Route::get('/turmas/show/{id}', [TurmaController::class, 'index']);
Route::post('/turmas', [TurmaController::class, 'store']);
Route::delete('/turmas/{id}', [TurmaController::class, 'destroy']);
Route::put('/turmas/edit/{id}', [TurmaController::class, 'update']);


Route::get('/alunos/{id}', [AlunoController::class, 'index']);
Route::post('/alunos', [AlunoController::class, 'store']);
Route::delete('/alunos/delete/{id}', [AlunoController::class, 'destroy']);
Route::put('/alunos/edit/{id}', [AlunoController::class, 'update']);
Route::get('/alunos/totalalunos/{id}', [AlunoController::class, 'indexTotal']);


Route::get('/turmaluno/{id}/{idturma}', [TurAlunoController::class, 'index']);
Route::post('/turmaluno', [TurAlunoController::class, 'store']);
Route::delete('/turmaluno/delete/{id}', [TurAlunoController::class, 'destroy']);