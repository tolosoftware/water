<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use App\Models\Project_accessories;
use App\Models\GeoLocation;
use App\Models\Pump_brands;
use App\Models\Solar_brands;
use App\Models\Uom;
use App\Models\Accessories_list;
use Illuminate\Http\Request;
use DB;
class ProjectsController extends Controller
{

    public function gitprojectdata(){
        $geolocation = GeoLocation::all();
        $pumpbrand = Pump_brands::all();
        $solarbrand = Solar_brands::all();
        $uom = Uom::all();
        $accessories = Accessories_list::all();

        return response()->json([
            'geolocation'=> $geolocation , 'pumpbrand'=>$pumpbrand, 'solarbrand'=>$solarbrand,
            'uom'=>$uom , 'accessories'=>$accessories
        ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Projects::with('geolocation')->get();
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
        $project =  Projects::create([
            'country' => $request['country']['country'],
            'city_id' => $request['city']['id'],
            'name' => $request['projectname'],
            'discription' => $request['discription'],
            'dirt_loss' => $request['dirtloss'],
            'motor_cable' =>$request['motorcable'],
            'daynomic_head' => $request['daynomichead'],
            'water_temprature' => 'ok',
            'daily_output' => $request['valueCircalslider'],
            'solar_brand_id' => $request['solarvalue'],
            'pump_brand_id' => $request['pumpvalue'],
            
        ]);

        foreach($request->inputFields as $value){
            Project_accessories::create([
                'project_id' => $project->id,
                'accessories_id' => $value['item'],
                'uom_id' => $value['uomid'],
                'quantity' => $value['quantity'],

            ]);
        }

        DB::commit();
        return ['msg' => 'Project Success full Inserted'];
    } catch (Exception $e) {
        DB::rollback();
    }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Projects  $projects
     * @return \Illuminate\Http\Response
     */
    public function show(Projects $projects)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Projects  $projects
     * @return \Illuminate\Http\Response
     */
    public function edit(Projects $projects)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Projects  $projects
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Projects $projects)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Projects  $projects
     * @return \Illuminate\Http\Response
     */
    public function destroy(Projects $projects)
    {
        //
    }
}
