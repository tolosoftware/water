<?php

namespace App\Http\Controllers;

use App\Models\InvertorList;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\File;

class InvertorListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return InvertorList::all();
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
            $photoname = 0;
            $id = $request['invertorListID'];
            if($request['image'] != 'oldImage'){
                $photoname = time().'.' . explode('/', explode(':', substr($request->image, 0, strpos($request->image, ';')))[1])[1];
                \Image::make($request->image)->save(public_path('brand/invertor/invertor_list/').$photoname);
                $request->merge(['photo' => $photoname]);
            }
            if ($id!==0) {
                $invertorList = InvertorList::findOrFail($id);
                $invertorList->invertor_brand_id =  $request['brand'];
                $invertorList->model = $request['model'];
                $invertorList->power = $request['powerKW'];
                $invertorList->voltage_ac = $request['voltage'];
                $invertorList->voltage_dc_min = $request['voltageDC'][0];
                $invertorList->voltage_dc_max = $request['voltageDC'][1];
                if($request->image != 'oldImage'){
                    File::delete('brand/invertor/invertor_list/'.$invertorList->image);
                    $invertorList->image = $photoname;
                }
                $invertorList->discription = 'null';
                $invertorList->save();
            }else{
                InvertorList::create([
                    'invertor_brand_id' => $request['brand'], 
                    'model' => $request['model'], 
                    'power' => $request['powerKW'], 
                    'voltage_ac' => $request['voltage'], 
                    'voltage_dc_min' => $request['voltageDC'][0], 
                    'voltage_dc_max' => $request['voltageDC'][1], 
                    'discription' => 'null', 
                    'image' => $photoname, 
                ]);
            }
            // return $request;
           

            DB::commit();
            return ['msg' => 'Solar brand succefully inserted'];
        } catch (Exception $e) {
            DB::rollback();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\InvertorList  $invertorList
     * @return \Illuminate\Http\Response
     */
    public function show(InvertorList $invertorList)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\InvertorList  $invertorList
     * @return \Illuminate\Http\Response
     */
    public function edit(InvertorList $invertorList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\InvertorList  $invertorList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, InvertorList $invertorList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\InvertorList  $invertorList
     * @return \Illuminate\Http\Response
     */
    public function destroy(InvertorList $invertorList)
    {
        $invertorList = InvertorList::findOrFail($id);
        File::delete('brand/invertor/invertor_list/'.$invertorList->image);
        $invertorList->delete();
        return ['message' => 'Selected Solar list has been Deleted'];
    }
}
