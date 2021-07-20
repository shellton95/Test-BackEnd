<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TurmaAlunoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('alunos')->insert(['id_aluno' => 1, 'id_escola' => 1, 'id_turma' => 1,]);
        DB::table('alunos')->insert(['id_aluno' => 2, 'id_escola' => 2, 'id_turma' => 1,]);
    }
}
