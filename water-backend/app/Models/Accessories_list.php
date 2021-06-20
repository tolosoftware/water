<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accessories_list extends Model
{
    use HasFactory;
    protected $table = 'accessories_lists';
    protected $primaryKey = 'id';
    protected $fillable = [
        'accessories_type_id','name','model','uom_id', 'uom_name','min_quantity', 'max_quantity', 'price', 'discription','image', 'data_sheet'
    ];

    public function uom()
    {
        return $this->belongsTo(Uom::class, 'uom_id');
    }
    public function project_accessories()
    {
        return $this->hasMany(Project_accessories::class, 'accessories_id');
    }
}
