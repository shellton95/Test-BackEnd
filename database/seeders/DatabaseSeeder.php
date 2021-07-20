<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
         $this.call(EscolaSeeder::class);
         $this.call(TurmaSeeder::class);
         $this.call(AlunoSeeder::class);
         $this.call(TurmaAlunoSeeder::class);
    }
}
