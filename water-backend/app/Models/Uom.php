<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Uom extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'acronym'
    ];

    public function accessoryList()
    {
        return $this->hasMany(Accessories_list::class, 'uom_id');
    }
}
