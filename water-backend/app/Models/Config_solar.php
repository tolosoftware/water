<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Config_solar extends Model
{
    use HasFactory;
    protected $table = "config_solars";
    protected $primaryKey = "id";
    protected $fillable = [
        'min_power', 'max_power', 'base', 'solar_quantity', 'panal_quantity', 'solar_list_id'
    ];
}
