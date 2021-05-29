<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pump_list;
use App\Models\InvertorList;
use App\Models\Accessories_list;
use App\Models\Solar_list;


class DatasheetController extends Controller
{
    public function pvModule(){

    }

    public function pump(){
        return Pump_list::with('pump_brand')->get();
    }

    public function solar(){
        return Solar_list::with('solar_brand')->get();
    }

    public function controller(){
        return InvertorList::with('invertor_brand')->get();
    }

    public function accessoriesdownload(){
        return Accessories_list::all();
    }
}
