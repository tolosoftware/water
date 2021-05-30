<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens,HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'system', 'name','companyname','email','phone',
        'password','website','status','expiration','userimage','geolocation_id','belongto'
    ];

  
    public function geolocation()
    {
        return $this->belongsTo(Geolocation::class, 'geolocation_id');
    }
    public function projects()
    {
        return $this->hasMany(Projects::class, 'user_id');
    }
    public function userBrandPRole()
    {
        return $this->hasMany(UserBrandRole::class, 'pump_id');
    }
    public function userBrandSRole()
    {
        return $this->hasMany(UserBrandRole::class, 'solar_id');
    }
    public function userBrandIRole()
    {
        return $this->hasMany(UserBrandRole::class, 'invertor_id');
    }
    
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
