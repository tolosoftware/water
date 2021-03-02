<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeoLocation extends Model
{
    use HasFactory;
    protected $table = "geolocations";
    protected $primaryKey = "id";
    protected $fillable = [
        'country', 'city','latitude','longtitude'
     ];

      public function projects()
    {
        return $this->hasMany(Projects::class, 'city_id');
    }

 
}
