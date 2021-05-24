<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBrandRole extends Model
{
    use HasFactory;
    protected $fillable = [
        'checked', 'pump_id', 'solar_id', 'invertor_id'
    ];

    public function pumpBrand()
    {
        return $this->belongsTo(Pump_brands::class, 'pump_id');
    }
    public function solarBrand()
    {
        return $this->belongsTo(Solar_brands::class, 'solar_id');
    }
    public function inverterBrand()
    {
        return $this->belongsTo(InvertorBrand::class, 'invertor_id');
    }
}
