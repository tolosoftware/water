<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
Use \Carbon\Carbon;
class AuthController extends Controller
{
    public function login(Request $request){
        // return $request;
        try{

            if(Auth::attempt(['username'=>$request['username'], 'password'=>$request['password']])){
                /**@var User $user */
                $user = Auth::user();

                $start = $user->created_at;
                $startDate = $user->created_at;
                $expiration = $user->expiration * 30;
                $expirDate = $start->addDays($expiration);
                $remaning =  $expirDate->diffInDays(Carbon::now());

                if($user->system===1){
                    $token = $user->createToken('app')->accessToken;
                    return response([
                        'message' => 'success',
                        'token' => $token,
                        'user' => $user
                    ]);
                }else{
                    if($remaning>1 && $user->status ==="active"){
                        $token = $user->createToken('app')->accessToken;
                        return response([
                            'message' => 'success',
                            'token' => $token,
                            'user' => $user
                        ]);
                    }else if($user->status !="active"){
                        return response([
                            'message' => 'inactive',
                        ]);
                    } else{
                        return response([
                            'message' => 'expired',
                        ]);
                    }
                }
                
            }
     
        return response([
            'message'=>'Invalid Username / Password'
        ],  401);

    }catch(\Exception $exception){
           return response([
               'message' => $exception->getMessage()
           ], 400);
       }
   }

   public function loginUser(){
       return Auth::user();
   }
}
