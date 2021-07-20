<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class EscolaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('escolas')->insert(['nome' => 'herbet', 'bairro' => 'siqueira', 'Cep' => '60000000',
             'Rua' => 'jardim', 'numero' => 50]);
        
        DB::table('escolas')->insert(['nome' => 'Julia', 'bairro' => 'siqueira', 'Cep' => '60000000',
             'Rua' => 'morango', 'numero' => 10]);
    }
}
