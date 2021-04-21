<?php

namespace App\Http\Controllers;

use App\Models\Config_solar;
use Illuminate\Http\Request;
use DB;

class ConfigSolarController extends Controller
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
        // return $request;
        DB::beginTransaction();
        try {
            $data = $request->all();
            Config_solar::where('solar_list_id', $data[0]['solar_list_id'])->delete();
                foreach($data as $value){
                    $config_solar = Config_solar::create([
                        'power' => $value['power'],
                        'base' => $value['base'],
                        'solar_quantity' => $value['quantity'],
                        'panal_quantity' => $value['panal'],
                        'solar_list_id' => $value['solar_list_id'],
                    ]);     
                }
            DB::commit();
        }catch (Exception $e) {
            DB::rollback();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Config_solar  $config_solar
     * @return \Illuminate\Http\Response
     */
    public function show($config_solar_id)
    {
        return Config_solar::select()->where('solar_list_id', $config_solar_id)->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Config_solar  $config_solar
     * @return \Illuminate\Http\Response
     */
    public function edit(Config_solar $config_solar)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Config_solar  $config_solar
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Config_solar $config_solar)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Config_solar  $config_solar
     * @return \Illuminate\Http\Response
     */
    public function destroy(Config_solar $config_solar)
    {
        //
    }
}
