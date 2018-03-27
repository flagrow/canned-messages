<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flagrow_canned_messages', function (Blueprint $table) {
            $table->increments('id');
            $table->string('key', 180)->index();
            $table->string('locale', 10)->nullable()->index();
            $table->string('style')->nullable();
            $table->text('content');
            $table->timestamps();

            $table->unique(['key', 'locale']);
        });
    },
    'down' => function (Builder $schema) {
        $schema->drop('flagrow_canned_messages');
    },
];
