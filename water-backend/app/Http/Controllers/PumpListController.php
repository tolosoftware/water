<?php

namespace App\Http\Controllers;

use App\Models\Pump_list;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\File;
class PumpListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Pump_list::all();
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

        if($request->image){
            $photoname = time().'.' . explode('/', explode(':', substr($request->image, 0, strpos($request->image, ';')))[1])[1];
            \Image::make($request->image)->save(public_path('brand/pumpbrand/pump_list/').$photoname);
            $request->merge(['photo' => $photoname]);
        }

        // return $request;
        Pump_list::create([
            'serial_no' => 12, 
            'pump_brand_id' => $request['brand'], 
            'model' => $request['name'], 
            'outlet' => $request['outlet'], 
            'diameter' => $request['current'], 
            'ampeier' => $request['diameter'], 
            'power' => $request['powerKW'], 
            'discription' => $request['description'], 
            'image' => $photoname, 
        ]);

        DB::commit();
        return ['msg' => 'Water Pumps brand successfully inserted'];
        } catch (Exception $e) {
            DB::rollback();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pump_list  $pump_list
     * @return \Illuminate\Http\Response
     */
    public function show(Pump_list $pump_list)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Pump_list  $pump_list
     * @return \Illuminate\Http\Response
     */
    public function edit(Pump_list $pump_list)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pump_list  $pump_list
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pump_list $pump_list)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pump_list  $pump_list
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $pump_list = Pump_list::findOrFail($id);
        File::delete('brand/pumpbrand/pump_list/'.$pump_list->image);
        $pump_list->delete();
        return ['message' => 'Selected Solar list has been Deleted'];
    }
}
