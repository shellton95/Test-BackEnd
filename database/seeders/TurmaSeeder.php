<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TurmaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('turmas')->insert(['nomeTurma' => 'redes', 'ano' => 2019, 'nivEnsino' => 'Fundamental',
             'serie' => 6 , 'id_escola' => 1]);
        
        DB::table('turmas')->insert(['nomeTurma' => 'turismo', 'ano' => 2019, 'nivEnsino' => 'Fundamental',
             'serie' => 5 , 'id_escola' => 2]);
    }
}
