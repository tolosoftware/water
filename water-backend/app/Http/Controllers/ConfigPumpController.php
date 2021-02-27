<?php

namespace App\Http\Controllers;

use App\Models\Config_pump;
use Illuminate\Http\Request;
use DB;

class ConfigPumpController extends Controller
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
        return $request;
        DB::beginTransaction();
       try {
            $config_pump = Config_pump::create([
                							
                'min_head' => $request[''],
                'max_head' => $request['district'],
                'min_discharge' => $request['latitude'],
                'max_discharge' => $request[''],
                'min_cable_length' => $request[''],
                'max_cable_length' => $request[''],
                'pump_list_id' => $request[''],
                'cable_type_id' => $request[''],
            ]);
            // $geolocation= new GeoLocation;
            // $geoloaction->country = $request['countryName'];
            // $geoloaction->city = $request['district'];
            // $geoloaction->latitude = $request['latitude'];
            // $geoloaction->longtitude = $request['longtitude'];
            // $geoloaction->save();
            for ($i=0; $i < 12; $i++) { 
                
            }

            DB::commit();
      }catch (Exception $e) {
        DB::rollback();
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Config_pump  $config_pump
     * @return \Illuminate\Http\Response
     */
    public function show(Config_pump $config_pump)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Config_pump  $config_pump
     * @return \Illuminate\Http\Response
     */
    public function edit(Config_pump $config_pump)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Config_pump  $config_pump
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Config_pump $config_pump)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Config_pump  $config_pump
     * @return \Illuminate\Http\Response
     */
    public function destroy(Config_pump $config_pump)
    {
        //
    }
}
