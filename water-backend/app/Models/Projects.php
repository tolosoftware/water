<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projects extends Model
{
    use HasFactory;

       protected $fillable = [
       'country', 'city_id','name','discription','dirt_loss', 'solar_cable', 'solar_base', 'solar_watt', 'pip_length',
        'motor_cable','daynomic_head','daily_output','solar_brand_id','pump_brand_id','invertor_brand_id', 'user_id'
       ];

    public function geolocation()
    {
        return $this->belongsTo(Geolocation::class, 'city_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function project_accessories()
    {
        return $this->hasMany(Project_accessories::class, 'project_id');
    }

}
