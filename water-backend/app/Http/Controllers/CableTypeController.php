<?php

namespace App\Http\Controllers;

use App\Models\Cable_type;
use Illuminate\Http\Request;

class CableTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Cable_type::all();
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
        if (!empty($request['cableTypeID'])) {
            $cable_type = Cable_type::findOrFail($request['cableTypeID']);
            $cable_type->name = $request['name'];
            $cable_type->price = $request['price'];
            $cable_type->save();
        }else{
            Cable_type::create($request->all());
        }
        $cable_type = $this->index();
        return $cable_type;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cable_type  $cable_type
     * @return \Illuminate\Http\Response
     */
    public function show(Cable_type $cable_type)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cable_type  $cable_type
     * @return \Illuminate\Http\Response
     */
    public function edit(Cable_type $cable_type)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cable_type  $cable_type
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cable_type $cable_type)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cable_type  $cable_type
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cabletype = Cable_type::findOrFail($id);
        $cabletype->delete();
        return ['message' => 'Cable type Deleted'];
    }
}
