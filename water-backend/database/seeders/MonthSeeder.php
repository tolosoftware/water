<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MonthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['name'=>'January',   
            ],
         
            [
                'name'=>'February',
            ],
            [
                'name'=>'March',
            ],
            [
                'name'=>'April',
            ],
            [
                'name'=>'May',
            ],
            [
                'name'=>'June',
            ],
            [
                'name'=>'July',
            ],
            [
                'name'=>'August',
            ],
            [
                'name'=>'September',
            ],
             [
                'name'=>'October',
            ],

             [
                'name'=>'November',
            ],
            [
                'name'=>'December',
            ],
           
        ];
        DB::table('months')->insert($data);
    }
}
