<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project_accessories extends Model
{
    use HasFactory;
    

    protected $fillable = [
    'project_id', 'accessories_id','quantity'
    ];

    public function project()
    {
        return $this->belongsTo(Projects::class, 'project_id');
    }
    public function accessoriesList()
    {
        return $this->belongsTo(Accessories_list::class, 'accessories_id');
    }
    public function accessoriesListWithUom()
    {
        return $this->belongsTo(Accessories_list::class, 'accessories_id')->with('uom');
    }
     

}
