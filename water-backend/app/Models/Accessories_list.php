<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accessories_list extends Model
{
    use HasFactory;

       protected $fillable = [
        'accessories_type_id','name','model','country','price','discription','image'
    ];
}
