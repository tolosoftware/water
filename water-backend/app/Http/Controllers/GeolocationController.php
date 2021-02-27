<?php

namespace App\Http\Controllers;

use App\Models\GeoLocation;
use Illuminate\Http\Request;
use DB;
use App\Models\Irradiation;
class GeolocationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return GeoLocation::all();
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
            $geolocation = GeoLocation::create([
                'country' => $request['countryName'],
                'city' => $request['district'],
                'latitude' => $request['latitude'],
                'longtitude' => $request['longtitude'],
            ]);
            // $geolocation= new GeoLocation;
            // $geoloaction->country = $request['countryName'];
            // $geoloaction->city = $request['district'];
            // $geoloaction->latitude = $request['latitude'];
            // $geoloaction->longtitude = $request['longtitude'];
            // $geoloaction->save();
            for ($i=0; $i < 12; $i++) { 
                Irradiation::create([
                    'geolocation_id' => $geolocation->id,
                    'month_id' => $i+1,
                    't6am' => $request['time6_7'],
                    't7am' => $request['time7_8'],
                    't8am' => $request['time8_9'],
                    't9am' => $request['time9_10'],
                    't10am' => $request['time10_11'],
                    't11am' => $request['time11_12'],
                    't12am' => $request['time12_1'],
                    't1pm' => $request['time1_2'],
                    't2pm' => $request['time2_3'],
                    't3pm' => $request['time3_4'],
                    't4pm' => $request['time4_5'],
                    't5pm' => $request['time5_6'],
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
     * @param  \App\Models\GeoLocation  $geolocation
     * @return \Illuminate\Http\Response
     */
    public function show(GeoLocation $geolocation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GeoLocation  $geolocation
     * @return \Illuminate\Http\Response
     */
    public function edit(GeoLocation $geolocation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GeoLocation  $geolocation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GeoLocation $geolocation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GeoLocation  $geolocation
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $geoLocation = GeoLocation::findOrFail($id);
        $geoLocation->delete();
        return ['message' => 'Geo Location Deleted'];
    }
}
