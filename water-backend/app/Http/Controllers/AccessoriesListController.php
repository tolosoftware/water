<?php

namespace App\Http\Controllers;

use App\Models\Accessories_list;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\File;

class AccessoriesListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Accessories_list::all();
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
            $photoname = 0;
            $id = $request['accessoryID'];
            if($request['image'] != 'oldImage'){
                $photoname = time().'.' . explode('/', explode(':', substr($request->image, 0, strpos($request->image, ';')))[1])[1];
                \Image::make($request->image)->save(public_path('accessories/').$photoname);
                $request->merge(['photo' => $photoname]);
            }
            if ($id!==0) {
                // return "it inside if ". $id;
                $accessories_list = Accessories_list::findOrFail($id);
                $accessories_list->accessories_type_id = $request['type'];
                $accessories_list->name = $request['name'];
                $accessories_list->model = $request['model'];
                $accessories_list->country = $request['country'];
                $accessories_list->price = $request['price'];
                if($request->image != 'oldImage'){
                    File::delete('accessories/'.$accessories_list->image);
                    $accessories_list->image = $photoname;
                }
                $accessories_list->discription = $request['description'];
                $accessories_list->save();
               
            }else{
                // return "inside elase: ".$request;
                Accessories_list::create([
                    'accessories_type_id' => $request['type'],
                    'name' => $request['name'],
                    'model' => $request['model'],
                    'country' => $request['country'],
                    'price' =>$request['price'],
                    'discription' => $request['description'],
                    'image' => $photoname,
                ]);
            }
            
            DB::commit();
        return ['msg' => 'Accessories Success full inserted'];
    } catch (Exception $e) {
        DB::rollback();
    }
}

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Accessories_list  $accessories_list
     * @return \Illuminate\Http\Response
     */
    public function show(Accessories_list $accessories_list)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Accessories_list  $accessories_list
     * @return \Illuminate\Http\Response
     */
    public function edit(Accessories_list $accessories_list)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Accessories_list  $accessories_list
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Accessories_list $accessories_list)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Accessories_list  $accessories_list
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $accessories_list = Accessories_list::findOrFail($id);
        File::delete('accessories/'.$accessories_list->image);
        $accessories_list->delete();
        return ['message' => 'Geo Location Deleted'];
    }
}
