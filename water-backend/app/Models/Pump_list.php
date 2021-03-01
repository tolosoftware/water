<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pump_list extends Model
{
    use HasFactory;
    protected $table = 'pump_lists';
    protected $primaryKey = 'id';
    protected $fillable = [
        'serial_no','pump_brand_id','model','outlet','ampeier','diameter','power', 'discription', 'image'
    ];
}
