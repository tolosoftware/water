<?php

namespace App\Http\Controllers;

use App\Models\Solar_brands;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\File;

class SolarBrandsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Solar_brands::all();
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
            \Image::make($request->image)->save(public_path('brand/solar/').$photoname);
            $request->merge(['photo' => $photoname]);
        }

         Solar_brands::create([
            'name' => $request['brand'], 
            'country' => $request['country'], 
            'discription' => $request['description'], 
            'image' => $photoname, 
        ]);

        DB::commit();
        return ['msg' => 'Solar brand succefully inserted'];
        } catch (Exception $e) {
            DB::rollback();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Solar_brands  $solar_brands
     * @return \Illuminate\Http\Response
     */
    public function show(Solar_brands $solar_brands)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Solar_brands  $solar_brands
     * @return \Illuminate\Http\Response
     */
    public function edit(Solar_brands $solar_brands)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Solar_brands  $solar_brands
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Solar_brands $solar_brands)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Solar_brands  $solar_brands
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $solar_brands = Solar_brands::findOrFail($id);
        File::delete('brand/solar/'.$solar_brands->image);
        $solar_brands->delete();
        return ['message' => 'Geo Location Deleted'];
    }
}
