<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvertorBrand extends Model
{
    use HasFactory;
    protected $table = 'invertor_brands';
    protected $primaryKey = 'id';
      protected $fillable = [
       'name', 'country','discription','image'
    ];

    public function invertorlist()
    {
        return $this->hasMany(InvertorList::class, 'invertor_brand_id');
    }
    public function invertorlistWithConfig()
    {
        return $this->hasMany(InvertorList::class, 'invertor_brand_id')->with('inverter_config');
    }
    public function userBrandRole()
    {
        return $this->hasMany(UserBrandRole::class, 'invertor_id');
    }
}
