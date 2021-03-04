<?php

namespace App\Http\Controllers;

use App\Models\Solar_list;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\File;

class SolarListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Solar_list::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $photoname = 0;
            $id = $request['solarListID'];
            if($request['image'] != 'oldImage'){
                $photoname = time().'.' . explode('/', explode(':', substr($request->image, 0, strpos($request->image, ';')))[1])[1];
                \Image::make($request->image)->save(public_path('brand/solar/solar_list/').$photoname);
                $request->merge(['photo' => $photoname]);
            }
            if ($id!==0) {
                $solar_list = Solar_list::findOrFail($id);
                $solar_list->solar_brand_id =  $request['brand'];
                $solar_list->model = $request['typeModel'];
                $solar_list->power = $request['powerW'];
                $solar_list->voltage = $request['voltage'];
                $solar_list->current = $request['current'];
                $solar_list->cable_type_id = $request['cableType'];
                if($request->image != 'oldImage'){
                    File::delete('brand/solar/solar_list/'.$solar_list->image);
                    $solar_list->image = $photoname;
                }
                $solar_list->discription = $request['description'];
                $solar_list->save();
            }else{
                Solar_list::create([
                    'serial_no' => 11, 
                    'solar_brand_id' => $request['brand'], 
                    'model' => $request['typeModel'], 
                    'power' => $request['powerW'], 
                    'voltage' => $request['voltage'], 
                    'current' => $request['current'], 
                    'cable_type_id' => $request['cableType'], 
                    'discription' => $request['description'], 
                    'image' => $photoname, 
                ]);
            }
            // return $request;
           

            DB::commit();
            return ['msg' => 'Solar brand succefully inserted'];
        } catch (Exception $e) {
            DB::rollback();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Solar_list  $solar_list
     * @return \Illuminate\Http\Response
     */
    public function show(Solar_list $solar_list)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Solar_list  $solar_list
     * @return \Illuminate\Http\Response
     */
    public function edit(Solar_list $solar_list)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Solar_list  $solar_list
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Solar_list $solar_list)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Solar_list  $solar_list
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $solar_list = Solar_list::findOrFail($id);
        File::delete('brand/solar/solar_list/'.$solar_list->image);
        $solar_list->delete();
        return ['message' => 'Selected Solar list has been Deleted'];
    }
}
