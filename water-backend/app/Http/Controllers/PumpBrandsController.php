<?php

namespace App\Http\Controllers;

use App\Models\Pump_brands;
use Illuminate\Http\Request;
use DB;

class PumpBrandsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            \Image::make($request->image)->save(public_path('brand/pumpbrand/').$photoname);
            $request->merge(['photo' => $photoname]);
        }

         Pump_brands::create([
            'name' => $request['brand'], 
            'country' => $request['country'], 
            'discription' => $request['description'], 
            'image' => $photoname, 
        ]);

        DB::commit();
        return ['msg' => 'Pump brand succefully inserted'];
        } catch (Exception $e) {
            DB::rollback();
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pump_brands  $pump_brands
     * @return \Illuminate\Http\Response
     */
    public function show(Pump_brands $pump_brands)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Pump_brands  $pump_brands
     * @return \Illuminate\Http\Response
     */
    public function edit(Pump_brands $pump_brands)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pump_brands  $pump_brands
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pump_brands $pump_brands)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pump_brands  $pump_brands
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pump_brands $pump_brands)
    {
        //
    }
}
