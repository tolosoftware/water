<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Privilige;
use Illuminate\Support\Facades\Hash;
use DB;
use Illuminate\Support\Facades\File;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all();
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
            $id = $request['id'];
            if($request['userimage'] != 'oldImage'){
                $photoname = time().'.' . explode('/', explode(':', substr($request->userimage, 0, strpos($request->userimage, ';')))[1])[1];
                \Image::make($request->userimage)->save(public_path('user/img/').$photoname);
                $request->merge(['photo' => $photoname]);
            }
            if ($id!=='0') {
                $user = User::findOrFail($id);
                $user->name = $request['name'];
                $user->system = 0;
                $user->companyname = $request['companyname'];
                $user->email = $request['email'];
                $user->phone = $request['phone'];
                $user->expiration =$request['expiration'];
                $user->status = $request['status'];
                $user->website = $request['website'];
                if(!empty($request['new_password'])){
                    $user->password = Hash::make($request['new_password']);
                }
                if($request->userimage != 'oldImage'){
                    File::delete('user/img/'.$user->userimage);
                    $user->userimage = $photoname;
                }
                $user->save();
            }else{
                User::create([
                    'name' => $request['name'],
                    'system' => 0,
                    'companyname' => $request['companyname'],
                    'email' => $request['email'],
                    'phone' => $request['phone'],
                    'password' => Hash::make($request['password']),
                    'expiration' =>$request['expiration'],
                    'status' => $request['status'],
                    'website' => $request['website'],
                    'userimage' => $photoname,
                ]);
            }

        DB::commit();
        return ['msg' => 'User Success full Registerd'];
    } catch (Exception $e) {
        DB::rollback();
    }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
       
        $user = User::findOrFail($id);
        $user->delete();
        return ['message' => 'User Deleted'];
    }
}
