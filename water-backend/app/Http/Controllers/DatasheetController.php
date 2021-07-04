<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pump_brands;
use App\Models\InvertorBrand;
use App\Models\Accessories_list;
use App\Models\Structure;
use App\Models\Solar_brands;
use App\Models\User;


class DatasheetController extends Controller
{
    public function pvModule(){

    }
    public function authUser($id){
        $user = User::findOrFail($id);
        if($user->status=='inactive' || $user->status=='pending'){
            return 'unauthenticated';
        }
        
    }
    public function pump($id){
        $pump_brands = Pump_brands::where('status', 'enable')->with(['userBrandRole', 'pumplist'])
        ->whereHas('userBrandRole', function($query) use ($id){
            return $query->where('user_id', $id)->where('checked', "true");
        })
        ->get();
        $pump_lists = array();
        foreach ($pump_brands as $key => $brand) {
            foreach ($brand->pumplist as $key => $list) {
                $list['brand_name']=$brand->name;
                array_push($pump_lists, $list);
            }
        }
        return response()->json(['auth'=> $this->authUser($id), 'pump_lists'=>$pump_lists]);
        // return Pump_list::with('pump_brand')->get();
    }

    public function solar($id){
        $solar_brands = Solar_brands::where('status', 'enable')->with(['userBrandRole', 'solar_lists'])
        ->whereHas('userBrandRole', function($query) use ($id){
            return $query->where('user_id', $id)->where('checked', "true");
        })
        ->get();
        $solar_list = array();
        foreach ($solar_brands as $key => $solar_brand) {
            foreach ($solar_brand->solar_lists as $key => $list) {
                $list['brand_name']=$solar_brand->name;
                array_push($solar_list, $list);
            }
        }
        return response()->json(['auth'=> $this->authUser($id), 'solar_list'=>$solar_list]);
        // return Solar_list::with('solar_brand')->get();
    }

    public function controller($id){
        $invertorBrands = InvertorBrand::where('status', 'enable')->with(['userBrandRole', 'invertorlist'])
        ->whereHas('userBrandRole', function($query) use ($id){
            return $query->where('user_id', $id)->where('checked', "true");
        })
        ->get();
        $inveter_lists = array();
        foreach ($invertorBrands as $key => $brand) {
            foreach ($brand->invertorlist as $key => $list) {
                $list['brand_name']=$brand->name;
                array_push($inveter_lists, $list);
            }
        }
        return response()->json(['auth'=> $this->authUser($id), 'inveter_lists'=>$inveter_lists]);
        // return InvertorList::with('invertor_brand')->get();
    }

    public function accessoriesdownload($id){
        $accessories = Accessories_list::all();
        return response()->json(['auth'=> $this->authUser($id), 'accessories'=>$accessories]);
    }

    public function structureDownload($id){
        $structures = Structure::all();
        return response()->json(['auth'=> $this->authUser($id), 'structures'=>$structures]);
    }
}
