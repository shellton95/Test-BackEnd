<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTbTurmaAlunosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_turma_alunos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_aluno')->unsigned();
            $table->foreign('id_aluno')->references('id')->on('alunos');
            $table->integer('id_escola')->unsigned();
            $table->foreign('id_escola')->references('id')->on('escolas');
            $table->integer('id_turma')->unsigned();
            $table->foreign('id_turma')->references('id')->on('turmas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_turma_alunos');
    }
}
