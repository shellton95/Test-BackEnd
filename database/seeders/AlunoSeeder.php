<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class AlunoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('alunos')->insert(['nome' => 'tais', 'telefone' => '88345946', 'email' => 'tais@gmail.com',
             'data_nascimento' => '25-01-1995' , 'genero' => 'Feminino', 'id_escola' => 1]);
            
        DB::table('alunos')->insert(['nome' => 'holanda', 'telefone' => '88345946', 'email' => 'holanda@gmail.com',
             'data_nascimento' => '25-01-1995' , 'genero' => 'Feminino', 'id_escola' => 2]);
    }
}
