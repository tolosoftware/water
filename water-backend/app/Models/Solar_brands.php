<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solar_brands extends Model
{
    use HasFactory;
    protected $table = 'solar_brands';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name', 'status', 'country','discription','image'
    ];
    public function solar_lists()
    {
        return $this->hasMany(Solar_list::class, 'solar_brand_id');
    }
    public function userBrandRole()
    {
        return $this->hasMany(UserBrandRole::class, 'solar_id');
    }
}
