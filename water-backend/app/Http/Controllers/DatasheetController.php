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
    public function authUser($id, $system){
        $user = User::findOrFail($id);
        if($user->status=='inactive' || $user->status=='pending' || $user->system != $system){
            return 'unauthenticated';
        }
        
    }
    public function pump(Request $request){
        $pump_brands = Pump_brands::where('status', 'enable')->with(['userBrandRole', 'pumplist'])
        ->whereHas('userBrandRole', function($query) use ($request){
            return $query->where('user_id', $request[0])->where('checked', "true");
        })
        ->get();
        $pump_lists = array();
        foreach ($pump_brands as $key => $brand) {
            foreach ($brand->pumplist as $key => $list) {
                $list['brand_name']=$brand->name;
                array_push($pump_lists, $list);
            }
        }
        return response()->json(['auth'=> $this->authUser($request[0], $request[1]), 'pump_lists'=>$pump_lists]);
        // return Pump_list::with('pump_brand')->get();
    }

    public function solar(Request $request){
        $solar_brands = Solar_brands::where('status', 'enable')->with(['userBrandRole', 'solar_lists'])
        ->whereHas('userBrandRole', function($query) use ($request){
            return $query->where('user_id', $request[0])->where('checked', "true");
        })
        ->get();
        $solar_list = array();
        foreach ($solar_brands as $key => $solar_brand) {
            foreach ($solar_brand->solar_lists as $key => $list) {
                $list['brand_name']=$solar_brand->name;
                array_push($solar_list, $list);
            }
        }
        return response()->json(['auth'=> $this->authUser($request[0], $request[1]), 'solar_list'=>$solar_list]);
        // return Solar_list::with('solar_brand')->get();
    }

    public function controller(Request $request){
        $invertorBrands = InvertorBrand::where('status', 'enable')->with(['userBrandRole', 'invertorlist'])
        ->whereHas('userBrandRole', function($query) use ($request){
            return $query->where('user_id', $request[0])->where('checked', "true");
        })
        ->get();
        $inveter_lists = array();
        foreach ($invertorBrands as $key => $brand) {
            foreach ($brand->invertorlist as $key => $list) {
                $list['brand_name']=$brand->name;
                array_push($inveter_lists, $list);
            }
        }
        return response()->json(['auth'=> $this->authUser($request[0], $request[1]), 'inveter_lists'=>$inveter_lists]);
        // return InvertorList::with('invertor_brand')->get();
    }

    public function accessoriesdownload(Request $request){
        $accessories = Accessories_list::all();
        return response()->json(['auth'=> $this->authUser($request[0], $request[1]), 'accessories'=>$accessories]);
    }

    public function structureDownload(Request $request){
        $structures = Structure::all();
        return response()->json(['auth'=> $this->authUser($request[0], $request[1]), 'structures'=>$structures]);
    }
}
