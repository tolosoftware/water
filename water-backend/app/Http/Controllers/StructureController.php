<?php

namespace App\Http\Controllers;
use DB;
use Illuminate\Support\Facades\File;
use App\Models\Structure;
use App\Models\User;
use Illuminate\Http\Request;

class StructureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Structure::all();
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
            
            $photoname = null;
            $dataSheetName = null;
            if($request['imageFile']){
                $photoname = time().'.' . explode('/', explode(':', substr($request->imageFile, 0, strpos($request->imageFile, ';')))[1])[1];
                \Image::make($request->imageFile)->save(public_path('structure/').$photoname);
                $request->merge(['photo' => $photoname]);
            }
            
            if($request['dataSheetFile']){
                $file = $request->get('dataSheetFile');
                if (strpos($file, ',') !== false) {
                    @list($encode, $file) = explode(',', $file);
                }
                $fileName = base64_decode($file, true);  
                $dataSheetName = time().'ds.pdf';
                $destinationPath = public_path('structure/data_sheet/').$dataSheetName;            
                file_put_contents($destinationPath, $fileName);
            }
            if (!empty($request['structureID'])) {
                $structure = Structure::findOrFail($request['structureID']);
                $structure->name = $request['name'];
                $structure->model = $request['model'];
                $structure->price = $request['price'];
                // $structure->quantity = $request['quantity'];
                if($request['imageFile']){
                    File::delete('structure/'.$structure->image);
                    $structure->image = $photoname;
                }
                if($request['dataSheetFile']){
                    File::delete('structure/data_sheet/'.$structure->datasheet);
                    $structure->datasheet = $dataSheetName;
                }
                $structure->save();
            }else{
                Structure::create([
                    'name' => $request['name'], 
                    'model' => $request['model'], 
                    'price' => $request['price'], 
                    // 'quantity' => $request['quantity'], 
                    'image' => $photoname, 
                    'datasheet' => $dataSheetName,  
                ]);
            }
            // return $request;
           

            DB::commit();
            return ['msg' => 'Structure succefully inserted'];
        } catch (Exception $e) {
            DB::rollback();
        }
    }

    public function authUser($id){
        $user = User::findOrFail($id);
        if($user->status=='inactive' || $user->status=='pending'){
            return 'unauthenticated';
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Structure  $structure
     * @return \Illuminate\Http\Response
     */
    public function show($id){
        $structures = Structure::all();
        return response()->json(['auth'=> $this->authUser($id), 'structures'=>$structures]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Structure  $structure
     * @return \Illuminate\Http\Response
     */
    public function edit(Structure $structure)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Structure  $structure
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Structure $structure)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Structure  $structure
     * @return \Illuminate\Http\Response
     */
    public function destroy(Structure $structure)
    {
        //
    }
}
