<?php

namespace App\Http\Controllers;

use App\Models\GeoLocation;
use Illuminate\Http\Request;
use DB;
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

       // return $request;
    //    DB::beginTransaction();
    //    try {
            GeoLocation::create([
                'country' => $request['countryName'],
                'city' => $request['district'],
                'latitude' => $request['latitude'],
                'longtitude' => $request['longtitude'],
            ]);
    //         return GeoLocation::all();
    //         DB::commit();
    //   }catch (Exception $e) {
    //     DB::rollback();
    //   }
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
