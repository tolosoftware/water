<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
           $data = [
           
            [
                'acronym'=>'February',
            ],
            [
                'acronym'=>'March',
            ],
            [
                'acronym'=>'April',
            ],
            [
                'acronym'=>'May',
            ],
            [
                'acronym'=>'June',
            ],
            [
                'acronym'=>'July',
            ],
            [
                'acronym'=>'August',
            ],
            [
                'acronym'=>'September',
            ],
          
           
        ];
        DB::table('uoms')->insert($data);
    }
}
