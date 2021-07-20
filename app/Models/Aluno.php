<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aluno extends Model
{
    public function turmas(){
        return $this->belogsTo(Turmas::class, 'id_turma', 'id');
    }


    use HasFactory;
}
