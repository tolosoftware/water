<?php

namespace App\Http\Controllers;

use App\Models\Irradiation;
use App\Models\Geolocation;
use Illuminate\Http\Request;
Use \Carbon\Carbon;
use DB;
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

    public function irridation(){
        $kabul = Geolocation::where('city','Kabul')->first();
        $herat = Geolocation::where('city','Herat')->first();
        $balkh = Geolocation::where('city','Balkh')->first();
        $kandahar = Geolocation::where('city','Kandahar')->first();
        $date = Carbon::now();
        $kabulirr = Irradiation::where(['geolocation_id'=>$kabul->id,'month_id'=> $date->month])->first();
        $heratirr = Irradiation::where(['geolocation_id'=>$herat->id,'month_id'=> $date->month])->first();
        $balkhirr = Irradiation::where(['geolocation_id'=>$balkh->id,'month_id'=> $date->month])->first();
        $kandaharirr = Irradiation::where(['geolocation_id'=>$kandahar->id,'month_id'=> $date->month])->first();
    
          $kabulnow =  [
            ['name'=>'6:00', 'value'=>$kabulirr->t6am],
            ['name'=>'7:00', 'value'=>$kabulirr->t7am],
            ['name'=>'8:00', 'value'=>$kabulirr->t8am],
            ['name'=>'9:00', 'value'=>$kabulirr->t9am],
            ['name'=>'10:00', 'value'=>$kabulirr->t10am],
            ['name'=>'11:00', 'value'=>$kabulirr->t11am],
            ['name'=>'12:00', 'value'=>$kabulirr->t12am],
            ['name'=>'13:00', 'value'=>$kabulirr->t1pm],
            ['name'=>'14:00', 'value'=>$kabulirr->t2pm],
            ['name'=>'15:00', 'value'=>$kabulirr->t3pm],
            ['name'=>'16:00', 'value'=>$kabulirr->t4pm],
            ['name'=>'17:00', 'value'=>$kabulirr->t5pm],
            ['name'=>'18:00', 'value'=>$kabulirr->t6pm],  
        ];
        $heratnow =  [
            ['name'=>'6:00', 'value'=>$heratirr->t6am],
            ['name'=>'7:00', 'value'=>$heratirr->t7am],
            ['name'=>'8:00', 'value'=>$heratirr->t8am],
            ['name'=>'9:00', 'value'=>$heratirr->t9am],
            ['name'=>'10:00', 'value'=>$heratirr->t10am],
            ['name'=>'11:00', 'value'=>$heratirr->t11am],
            ['name'=>'12:00', 'value'=>$heratirr->t12am],
            ['name'=>'13:00', 'value'=>$heratirr->t1pm],
            ['name'=>'14:00', 'value'=>$heratirr->t2pm],
            ['name'=>'15:00', 'value'=>$heratirr->t3pm],
            ['name'=>'16:00', 'value'=>$heratirr->t4pm],
            ['name'=>'17:00', 'value'=>$heratirr->t5pm],
            ['name'=>'18:00', 'value'=>$heratirr->t6pm],  
        ];

        $balkhnow =  [
            ['name'=>'6:00', 'value'=>$balkhirr->t6am],
            ['name'=>'7:00', 'value'=>$balkhirr->t7am],
            ['name'=>'8:00', 'value'=>$balkhirr->t8am],
            ['name'=>'9:00', 'value'=>$balkhirr->t9am],
            ['name'=>'10:00', 'value'=>$balkhirr->t10am],
            ['name'=>'11:00', 'value'=>$balkhirr->t11am],
            ['name'=>'12:00', 'value'=>$balkhirr->t12am],
            ['name'=>'13:00', 'value'=>$balkhirr->t1pm],
            ['name'=>'14:00', 'value'=>$balkhirr->t2pm],
            ['name'=>'15:00', 'value'=>$balkhirr->t3pm],
            ['name'=>'16:00', 'value'=>$balkhirr->t4pm],
            ['name'=>'17:00', 'value'=>$balkhirr->t5pm],
            ['name'=>'18:00', 'value'=>$balkhirr->t6pm],  
        ];
        $kandaharnow =  [
            ['name'=>'6:00', 'value'=>$kandaharirr->t6am],
            ['name'=>'7:00', 'value'=>$kandaharirr->t7am],
            ['name'=>'8:00', 'value'=>$kandaharirr->t8am],
            ['name'=>'9:00', 'value'=>$kandaharirr->t9am],
            ['name'=>'10:00', 'value'=>$kandaharirr->t10am],
            ['name'=>'11:00', 'value'=>$kandaharirr->t11am],
            ['name'=>'12:00', 'value'=>$kandaharirr->t12am],
            ['name'=>'13:00', 'value'=>$kandaharirr->t1pm],
            ['name'=>'14:00', 'value'=>$kandaharirr->t2pm],
            ['name'=>'15:00', 'value'=>$kandaharirr->t3pm],
            ['name'=>'16:00', 'value'=>$kandaharirr->t4pm],
            ['name'=>'17:00', 'value'=>$kandaharirr->t5pm],
            ['name'=>'18:00', 'value'=>$kandaharirr->t6pm],  
        ];

        return response()->json([
            'kabul'=> $kabulnow , 'herat'=>$heratnow,
            'balkh' => $balkhnow, 'kandahar'=>$kandaharnow,
        ]);

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
            $irradiation = Irradiation::select()->where('geolocation_id', $request['geolocation_id'])->where('month_id', $request['month_id'])->first();
            if($irradiation){
                // return "it is inside if";
                
                $irradiation->t6am = $request['time6_7'];
                $irradiation->t7am = $request['time7_8'];
                $irradiation->t8am = $request['time8_9'];
                $irradiation->t9am = $request['time9_10'];
                $irradiation->t10am = $request['time10_11'];
                $irradiation->t11am = $request['time11_12'];
                $irradiation->t12am = $request['time12_1'];
                $irradiation->t1pm = $request['time1_2'];
                $irradiation->t2pm = $request['time2_3'];
                $irradiation->t3pm = $request['time3_4'];
                $irradiation->t4pm = $request['time4_5'];
                $irradiation->t5pm = $request['time5_6'];
                $irradiation->t6pm = $request['time6_7p'];
                $irradiation->update();

            }
            DB::commit();
        }catch (Exception $e) {
            DB::rollback();
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Irradiation  $irradiation
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // $irradiationJan = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 1)->get();
        // $irradiationFeb = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 2)->get();
        // $irradiationMar = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 3)->get();
        // $irradiationApr = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 4)->get();
        // $irradiationMay = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 5)->get();
        // $irradiationJun = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 6)->get();
        // $irradiationJul = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 7)->get();
        // $irradiationAug = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 8)->get();
        // $irradiationSep = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 9)->get();
        // $irradiationOct = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 10)->get();
        // $irradiationNov = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 11)->get();
        // $irradiationDec = Irradiation::select()->where('geolocation_id', $id)->where('month_id', 12)->get();
        // return ['data' => ['irradiationJan' => $irradiationJan, 'irradiationFeb' => $irradiationFeb, 
        // 'irradiationMar' => $irradiationMar, 'irradiationApr' => $irradiationApr, 'irradiationMay' => $irradiationMay,
        //  'irradiationJun' => $irradiationJun, 'irradiationJul' => $irradiationJul, 'irradiationAug' => $irradiationAug, 
        //  'irradiationSep' => $irradiationSep, 'irradiationOct' => $irradiationOct, 'irradiationNov' => $irradiationNov, 'irradiationDec' => $irradiationDec]];
        $data = Irradiation::select()->where('geolocation_id', $id)->get();
        return $data;

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
