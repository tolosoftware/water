<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Privilige;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use DB;
use Illuminate\Support\Facades\File;
use App\Models\Pump_brands;
use App\Models\Solar_brands;
use App\Models\InvertorBrand;
use App\Models\Pump_list;
use App\Models\Solar_list;
use App\Models\InvertorList;
use App\Models\Projects;
use App\Models\Geolocation;
use App\Models\UserBrandRole;
Use \Carbon\Carbon;
use Illuminate\Support\Facades\Auth;




class UserController extends Controller
{
    public function authUser($id, $system){
        $user = User::findOrFail($id);
        if($user->status=='inactive' || $user->status=='pending' || (int)$user->system != (int)$system){
            return 'unauthenticated';
        }
        
    }
    public function checkToken(Request $request){
        $user = User::findOrFail($request[0]);
        if($user->status=='inactive' || $user->status=='pending' || $user->system != $request[1]){
            return 'unauthenticated';
        }
    }
    public function getUserBrand($id){
        $pumpBrand = Pump_brands::all();
        foreach ($pumpBrand as $key => $value) {
            $userBrandRole = UserBrandRole::where('user_id', $id)->where('pump_id', $value->id)->get();
            if(empty($userBrandRole[0])){
                $userBrandRole[0] = UserBrandRole::create([
                    'checked' => 'false',
                    'user_id' => $id,
                    'pump_id'=> $value->id,
                ]);
            }
            $value['user_brand_role'] = $userBrandRole;
        }

        $solarBrand = Solar_brands::all();
        foreach ($solarBrand as $key => $value) {
            $userBrandRole = UserBrandRole::where('user_id', $id)->where('solar_id', $value->id)->get();
            if(empty($userBrandRole[0])){
                $userBrandRole[0] = UserBrandRole::create([
                    'checked' => 'false',
                    'user_id' => $id,
                    'solar_id'=> $value->id,
                ]);
            }
            $value['user_brand_role'] = $userBrandRole;
        }

        $inverterBrand = InvertorBrand::all();
        foreach ($inverterBrand as $key => $value) {
            $userBrandRole = UserBrandRole::where('user_id', $id)->where('invertor_id', $value->id)->get();
            if(empty($userBrandRole[0])){
                $userBrandRole[0] = UserBrandRole::create([
                    'checked' => 'false',
                    'user_id' => $id,
                    'invertor_id'=> $value->id,
                ]);
            }
            $value['user_brand_role'] = $userBrandRole;
        }
        $estimatedCost = User::where('id',$id)->value('estimated_cost');
        $data = [
            'pumpBrand' => $pumpBrand,
            'solarBrand' => $solarBrand,
            'inverterBrand' => $inverterBrand,
            'estimatedCost' => $estimatedCost,
        ];

        return $data;
    }
    public function postUserBrand(Request $request){
        foreach ($request['pumpBrand'] as $key => $value) {
            UserBrandRole::where('user_id', $value['user_brand_role'][0]['user_id'])->where('pump_id', $value['user_brand_role'][0]['pump_id'])->update(['checked'=>$value['user_brand_role'][0]['checked']]);
        }
        foreach ($request['solarBrand'] as $key => $value) {
            UserBrandRole::where('user_id', $value['user_brand_role'][0]['user_id'])->where('solar_id', $value['user_brand_role'][0]['solar_id'])->update(['checked'=>$value['user_brand_role'][0]['checked']]);
        }
        foreach ($request['inverterBrand'] as $key => $value) {
            UserBrandRole::where('user_id', $value['user_brand_role'][0]['user_id'])->where('invertor_id', $value['user_brand_role'][0]['invertor_id'])->update(['checked'=>$value['user_brand_role'][0]['checked']]);
        }
        User::where('id', $request['id'])->update(['estimated_cost'=>$request['estimatedCost']]);
    }

    public function getexpiration($id){
        $user = User::find($id);

        $start = $user->created_at;
        $startDate = $user->created_at;
        $expiration = $user->expiration * 30;
        $expirDate = $start->addDays($expiration);

        $remaning =  $expirDate->diffInDays(Carbon::now());
        

        $data = [
            'reminingDays' => $remaning,
            'used' => $expiration-$remaning,
            'startDate' => $startDate->format('Y-m-d'),
            'endDate' => $expirDate->format('Y-m-d'),
        ];

        return $data;
    }

    public function provenceUser(){
        $user = Geolocation::with('users')->get();
        $provenceUser = array();
        foreach($user as $val){
            $x =  [
                'provence'=> $val['city'],
                'user'=>count($val['users']),
            ];
            array_push($provenceUser,$x);
        }
        return $provenceUser;
    }

    public function getUserProject($id){
        $eachmonth = array();
        $currenTmonth = Carbon::now()->month;
        $currenTyear = Carbon::now()->year;

        $user = User::findOrFail($id);
        if((int)$user->system == 1){
            for($i=1 ; $i<=12; $i++){
                $permonth = Projects::whereYear('created_at',$currenTyear)
                ->whereMonth('created_at', '=', $i)->get();
                $countEachmonth = $permonth->count();
                array_push($eachmonth,$countEachmonth);
            }
        }else{
            for($i=1 ; $i<=12; $i++){
                $permonth = Projects::where('user_id',$id)->whereYear('created_at',$currenTyear)
                ->whereMonth('created_at', '=', $i)->get();
                $countEachmonth = $permonth->count();
                array_push($eachmonth,$countEachmonth);
            }
        }

        $monthlyHrOutput =  [
            ['name'=>'Jan', 'value'=>$eachmonth[0]],
            ['name'=>'Feb', 'value'=>$eachmonth[1]],
            ['name'=>'Mar', 'value'=>$eachmonth[2]],
            ['name'=>'Apr', 'value'=>$eachmonth[3]],
            ['name'=>'May', 'value'=>$eachmonth[4]],
            ['name'=>'Jun', 'value'=>$eachmonth[5]],
            ['name'=>'Jul', 'value'=>$eachmonth[6]],
            ['name'=>'Aug', 'value'=>$eachmonth[7]],
            ['name'=>'Sep', 'value'=>$eachmonth[8]],
            ['name'=>'Oct', 'value'=>$eachmonth[9]],
            ['name'=>'Nov', 'value'=>$eachmonth[10]],
            ['name'=>'Dec', 'value'=>$eachmonth[11]],  
        ];

        return $monthlyHrOutput;
    }
   
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function signupRequest(Request $request){
        // return $request;

        $photoname = null;
        if($request['companyLogo']){
            $photoname = time().'1.' . explode('/', explode(':', substr($request->companyLogo, 0, strpos($request->companyLogo, ';')))[1])[1];
            \Image::make($request->companyLogo)->save(public_path('user/img/').$photoname);
            $request->merge(['photo' => $photoname]);
        }
        User::create([
            'name' => $request['name'],
            'system' => 0,
            'companyname' => $request['companyname'],
            'username' => $request['username'],
            'email' => $request['email'],
            'phone' => $request['phone'],
            'website' => $request['website'],
            'userimage' => $photoname,
            'geolocation_id' => $request['city'],
        ]);
        $user = [];
        $date = Carbon::now();
        $user['name'] = $request['name'];
        $user['date'] = $date->format('l\\, j\\,F\\,Y h:i:s A');
        $user['companyname'] = $request['companyname'];
        $user['phone'] = $request['phone'];
        $user['email'] = $request['email'];
        $user['username'] = $request['username'];
        $user['logo'] = $photoname;
        $user['city'] = Geolocation::findOrFail($request['city'])->city;
        $user['website'] = $request['website'];
    
        Mail::send('mail.sendMail', $user, function ($message) use ($user) {
            $message->from($user['email'], $user['companyname']);
            $message->to('mail@awm.solar');
            $message->subject('Sign Up Request');
            //Attach file
            if($user['logo']){
                $message->attach(public_path('user/img/').$user['logo']);
            }
        });
        return response()->json(['message' => 'Request completed']);
    }

    public function userCity(){
        return Geolocation::all()->unique('city');
    }
    
    public function adminDashboard(Request $request)
    {   
        // return $request;
        $pumpbrand = Pump_brands::where('status', 'enable')->with('userBrandRole')
        ->whereHas('userBrandRole', function($query) use ($request){
            return $query->where('user_id', $request[0])->where('checked', "true");
        })
        ->get();
        $solarbrand = Solar_brands::where('status', 'enable')->with('userBrandRole')
        ->whereHas('userBrandRole', function($query) use ($request){
            return $query->where('user_id', $request[0])->where('checked', "true");
        })
        ->get();
        $invertorBrand = InvertorBrand::where('status', 'enable')->with('userBrandRole')
        ->whereHas('userBrandRole', function($query) use ($request){
            return $query->where('user_id', $request[0])->where('checked', "true");
        })
        ->get();
        $pumpLists = Pump_list::all();
        $solarLists = Solar_list::all();
        $invertorLists = InvertorList::all();
        $users = User::where('system', 0)->get();
        $currenTmonth = Carbon::now()->month;
        $projects = Projects::all();
        $proOfThMonth = 0;
        foreach ($projects as $project) {
            $projecCurrentMonth = $project->created_at->format('m');
            if($projecCurrentMonth == $currenTmonth){
                ++$proOfThMonth;
            }
        }

        return response()->json(['auth'=> $this->authUser($request[0], $request[1]),
            'pumpbrand'=>$pumpbrand, 'solarbrand'=>$solarbrand, 'invertorBrand'=>$invertorBrand, 'users'=>$users, 'pumpLists'=>$pumpLists, 'solarLists'=>$solarLists, 'invertorLists'=>$invertorLists, 'projects'=>$projects, 'proOfThMonth'=>$proOfThMonth
        ]);
    }
    public function index()
    {
        $users=User::with('geolocation')->get();
        foreach ($users as $key => $user) {
            $user['projects'] = Projects::where('user_id',$user->id)->get()->count();
        }
        return $users;
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
            $id = $request['id'];
            if($request['userimage'] != 'oldImage'){
                $photoname = time().'.' . explode('/', explode(':', substr($request->userimage, 0, strpos($request->userimage, ';')))[1])[1];
                \Image::make($request->userimage)->save(public_path('user/img/').$photoname);
                $request->merge(['photo' => $photoname]);
            }
            if ($id!=='0') {
                $user = User::findOrFail($id);
                $user->name = $request['name'];
                $user->companyname = $request['companyname'];
                $user->username = $request['username'];
                $user->email = $request['email'];
                $user->phone = $request['phone'];
                $user->expiration =$request['expiration'];
                $user->status = $request['status'];
                if($user->system !=1){
                    $user->system = $request['type'];
                }
                $user->belongto = $request['belongto'];
                $user->website = $request['website'];
                $user->geolocation_id = $request['city'];
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
                    'system' => $request['type'],
                    'companyname' => $request['companyname'],
                    'email' => $request['email'],
                    'phone' => $request['phone'],
                    'username' => $request['username'],
                    'password' => Hash::make($request['password']),
                    'expiration' =>$request['expiration'],
                    'status' => $request['status'],
                    'website' => $request['website'],
                    'userimage' => $photoname,
                    'geolocation_id' => $request['city'],
                    'belongto' => $request['belongto'],
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
    public function show(Request $request)
    {
        $users=User::with('geolocation')->orderBy('id', 'DESC')->get();
        foreach ($users as $key => $user) {
            $user['projects'] = Projects::where('user_id',$user->id)->get()->count();
        }
        return response()->json(['auth'=> $this->authUser($request[0], $request[1]),'users'=>$users]);
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
        if(isset($request['userimage'])){
            $photoname = null;
            $photoname = time().'.' . explode('/', explode(':', substr($request->userimage, 0, strpos($request->userimage, ';')))[1])[1];
            \Image::make($request->userimage)->save(public_path('user/img/').$photoname);
            $request->merge(['photo' => $photoname]);
          
            $data = [
                // 'name' => $request['name'],
                // 'phone' => $request['phone'],
                // 'website' => $request['website'],
                'userimage' => $photoname,
            ];
            $user = User::find($id);
            if($photoname){
                if($user->userimage){
                    File::delete('user/img/'.$user->userimage); 
                }
            }
            
            $user->update($data);

            $user = User::find($id);
            return $user;

        }else if(isset($request['userid'])){
            $user = User::find($id);
            if(Hash::check($request['password'], $user->password)){
                // User::where('id', $id)->update(array('password' => Hash::make($request['password'])));
                
                User::where('id', $id)->update(array('password' => Hash::make($request['npassword'])));
                $user = User::find($id);
                return $user;
            }else{
                return "oops";
            }

        

        }else{
            // $data = [
            //     'name' => $request['name'],
            //     'phone' => $request['phone'],
            //     'website' => $request['website'],
            // ];
            // $user = User::find($id);
            // $user->update($data);
        }
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
        File::delete('user/img/'.$user->userimage);
        $user->delete();
        return ['message' => 'User Deleted'];
    }
}
