<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turma extends Model
{


   public function alunos(){
       return $this->HasMany(Alunos::class);
   }

    use HasFactory;
}
