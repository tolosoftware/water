<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Geolocation extends Model
{
    use HasFactory;
    protected $table = "geolocations";
    protected $primaryKey = "id";
    protected $fillable = [
        'country', 'city','latitude','longtitude'
     ];

 
}
