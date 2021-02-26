<?php

namespace App\Http\Controllers;

use App\Models\Irradiation;
use Illuminate\Http\Request;

class IrradiationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Irradiation::all();
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
        Irradiation::create([
            'geolocation_id' => $request[''],
            'month_id' => $request[''],
            '6am' => $request[''],
            '7am' => $request[''],
            '8am' => $request[''],
            '9am' => $request[''],
            '10am' => $request[''],
            '11am' => $request[''],
            '12am' => $request[''],
            '1pm' => $request[''],
            '2pm' => $request[''],
            '3pm' => $request[''],
            '4pm' => $request[''],
            '5pm' => $request[''],
            '6pm' => $request[''],
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Irradiation  $irradiation
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $irradiation = Irradiation::select()->where('geolocation_id', $id)->get();
        return $irradiation;

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Irradiation  $irradiation
     * @return \Illuminate\Http\Response
     */
    public function edit(Irradiation $irradiation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Irradiation  $irradiation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Irradiation $irradiation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Irradiation  $irradiation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Irradiation $irradiation)
    {
        //
    }
}
