<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Irradiation extends Model
{
    use HasFactory;
    protected $table = "irradiations";
    protected $primaryKey = "id";
    protected $fillable = [
        '6am', '7am', '8am', '9am','10am', '11am', '12am','1pm', '2pm', '3pm', '4pm', '5pm', '6pm'
    ];
}
