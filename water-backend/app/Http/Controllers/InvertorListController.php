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
            $dataSheetName = 0;
            if($request['imageFile']){
                $photoname = time().'.' . explode('/', explode(':', substr($request->imageFile, 0, strpos($request->imageFile, ';')))[1])[1];
                \Image::make($request->imageFile)->save(public_path('brand/invertor/invertor_list/').$photoname);
                $request->merge(['photo' => $photoname]);
            }
            if($request['dataSheetFile']){
                $file = $request->get('dataSheetFile');
                if (strpos($file, ',') !== false) {
                    @list($encode, $file) = explode(',', $file);
                }
                $fileName = base64_decode($file, true);  
                $dataSheetName = time().'ds.pdf';
                $destinationPath = public_path('brand/invertor/invertor_list/data_sheet/').$dataSheetName;            
                file_put_contents($destinationPath, $fileName);
            }
            if (!empty($request['invertorListID'])) {
                $invertorList = InvertorList::findOrFail($request['invertorListID']);
                $invertorList->invertor_brand_id =  $request['brand'];
                $invertorList->model = $request['model'];
                $invertorList->power = $request['powerKW'];
                $invertorList->voltage_ac = $request['voltage'];
                $invertorList->voltage_dc_min = $request['voltageDC'][0];
                $invertorList->voltage_dc_max = $request['voltageDC'][1];
                if($request['imageFile']){
                    File::delete('brand/invertor/invertor_list/'.$invertorList->image);
                    $invertorList->image = $photoname;
                }
                if($request['dataSheetFile']){
                    File::delete('brand/invertor/invertor_list/data_sheet/'.$invertorList->data_sheet);
                    $invertorList->data_sheet = $dataSheetName;
                }
                $invertorList->discription = '';
                $invertorList->save();
            }else{
                InvertorList::create([
                    'invertor_brand_id' => $request['brand'], 
                    'model' => $request['model'], 
                    'power' => $request['powerKW'], 
                    'voltage_ac' => $request['voltage'], 
                    'voltage_dc_min' => $request['voltageDC'][0], 
                    'voltage_dc_max' => $request['voltageDC'][1], 
                    'discription' => '', 
                    'image' => $photoname, 
                    'data_sheet' => $dataSheetName, 
                ]);
            }
            // return $request;
           

            DB::commit();
            return ['msg' => 'Invertor List succefully inserted'];
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
    public function destroy($id)
    {
        $invertorList = InvertorList::findOrFail($id);
        File::delete('brand/invertor/invertor_list/'.$invertorList->image);
        File::delete('brand/invertor/invertor_list/data_sheet/'.$invertorList->data_sheet);
        $invertorList->delete();
        return ['message' => 'Selected Invertor list has been Deleted'];
    }
}
