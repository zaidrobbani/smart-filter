<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasColumn('recipes', 'image_url')) {

            Schema::table('recipes', function (Blueprint $table) {

                $table->text('image_url')->nullable();

            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('recipes', 'image_url')) {

            Schema::table('recipes', function (Blueprint $table) {

                $table->dropColumn('image_url');

            });
        }
    }
};