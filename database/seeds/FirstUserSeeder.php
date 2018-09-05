<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FirstUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'first_name' => 'First',
            'last_name' => 'User',
            'user_id' => 'user',
            'email' => str_random(10).'@gmail.com',
            'password' => bcrypt('password'),
            'remember_token' => str_random(15)
        ]);
    }
}
