<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solar_list extends Model
{
    use HasFactory;
    protected $table = 'solar_lists';
    protected $primaryKey = 'id';
    protected $fillable = [
        'serial_no','model','power','voltage','current', 'discription', 'image'
    ];
}
