<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvertorList extends Model
{
    use HasFactory;
    protected $table = 'invertor_lists';
    protected $primaryKey = 'id';
    protected $fillable = [
        'invertor_brand_id', 'model', 'power', 'voltage_ac','voltage_dc_min', 'voltage_dc_max', 'discription', 'image', 'data_sheet'
    ];
}
