<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use App\Models\Project_accessories;
use App\Models\Geolocation;
use App\Models\Pump_brands;
use App\Models\Solar_brands;
use App\Models\InvertorBrand;
use App\Models\Pump_list;
use App\Models\Solar_list;
use App\Models\Config_solar;
use App\Models\Cable_type;
use App\Models\InvertorList;
use App\Models\Irradiation;
use App\Models\Uom;
use App\Models\User;
use App\Models\Accessories_list;
use Illuminate\Http\Request;
use DB;



class ProjectsController extends Controller
{
    public function getEnergy($city_id, $solar_power, $avaDischarge, $dirtloss){
        $eachMonthFinalTotalEngery = array();
        $t6am=0;  $t7am=0;  $t8am=0;  $t9am=0;  $t10am=0;  $t11am=0;  $t12am=0;  $t1pm=0;  $t2pm=0;  $t3pm=0;  $t4pm=0;  $t5pm=0; $t6pm=0;
        $january=0;$february=0;$march=0;$april=0;$may=0;$january=0;$january=0;$january=0;$january=0;$january=0;$january=0;$january=0; 
        $irredation = Irradiation::where('geolocation_id',$city_id)->get();
        $monthlyHrOutputData = array();
            foreach($irredation as $key => $eachmonth){
                $t6am = $t6am + $eachmonth['t6am'];
                $t7am = $t7am + $eachmonth['t7am'];
                $t8am = $t8am + $eachmonth['t8am'];
                $t9am = $t9am + $eachmonth['t9am'];
                $t10am = $t10am + $eachmonth['t10am'];
                $t11am = $t11am + $eachmonth['t11am'];
                $t12am = $t12am + $eachmonth['t12am'];
                $t1pm = $t1pm + $eachmonth['t1pm'];
                $t2pm = $t2pm + $eachmonth['t2pm'];
                $t3pm = $t3pm + $eachmonth['t3pm'];
                $t4pm = $t4pm + $eachmonth['t4pm'];
                $t5pm = $t5pm + $eachmonth['t5pm'];
                $t6pm = $t6pm + $eachmonth['t6pm'];
                
                $hrEnergyOfEachMonth =  [
                    ['name'=>'6:00', 'hrEn'=>round(($solar_power/1030)*($t6am), 2)],
                    ['name'=>'7:00', 'hrEn'=>round(($solar_power/1030)*($t7am), 2)],
                    ['name'=>'8:00', 'hrEn'=>round(($solar_power/1030)*($t8am), 2)],
                    ['name'=>'9:00', 'hrEn'=>round(($solar_power/1030)*($t9am), 2)],
                    ['name'=>'10:00', 'hrEn'=>round(($solar_power/1030)*($t10am), 2)],
                    ['name'=>'11:00', 'hrEn'=>round(($solar_power/1030)*($t11am), 2)],
                    ['name'=>'12:00', 'hrEn'=>round(($solar_power/1030)*($t12am), 2)],
                    ['name'=>'13:00', 'hrEn'=>round(($solar_power/1030)*($t1pm), 2)],
                    ['name'=>'14:00', 'hrEn'=>round(($solar_power/1030)*($t2pm), 2)],
                    ['name'=>'15:00', 'hrEn'=>round(($solar_power/1030)*($t3pm), 2)],
                    ['name'=>'16:00', 'hrEn'=>round(($solar_power/1030)*($t4pm), 2)],
                    ['name'=>'17:00', 'hrEn'=>round(($solar_power/1030)*($t5pm), 2)],  
                    ['name'=>'18:00', 'hrEn'=>round(($solar_power/1030)*($t6pm), 2)],  
                ];
                $maxValueOfHrEn = 0;
                foreach ($hrEnergyOfEachMonth as $hrEnOfEaMo)
                {
                    if ($hrEnOfEaMo['hrEn']> $maxValueOfHrEn)
                    {
                        $maxValueOfHrEn = $hrEnOfEaMo['hrEn'];
                    }
                }
                $eachMonthlyHrOutputP =  [
                    ['name'=>'6:00', 'hrOutput'=>round(($hrEnergyOfEachMonth[0]['hrEn']/$maxValueOfHrEn)*($avaDischarge), 2)],
                    ['name'=>'7:00', 'hrOutput'=>round(($hrEnergyOfEachMonth[1]['hrEn']/$maxValueOfHrEn)*($avaDischarge), 2)],
                    ['name'=>'8:00', 'hrOutput'=>round(($hrEnergyOfEachMonth[2]['hrEn']/$maxValueOfHrEn)*($avaDischarge), 2)],
                    ['name'=>'9:00', 'hrOutput'=>round(($hrEnergyOfEachMonth[3]['hrEn']/$maxValueOfHrEn)*($avaDischarge), 2)],
                    ['name'=>'10:00', 'hrOutput'=>round(($hrEnergyOfEachMonth[4]['hrEn']/$maxValueOfHrEn)*($avaDischarge), 2)],
                    ['name'=>'11:00', 'hrOutput'=>round(($hrEnergyOfEachMonth[5]['hrEn']/$maxValueOfHrEn)*($avaDischarge), 2)],
                    ['name'=>'12:00', 'hrOutput'=>round(($hrEnergyOfEachMonth[6]['hrEn']/$maxValueOfHrEn)*($avaDischarge), 2)],
                    ['name'=>'13:00', 'hrOutput'=>round(($hrEnergyOfEachMonth[7]['hrEn']/$maxValueOfHrEn)*($avaDischarge), 2)],
                    ['name'=>'14:00', 'hrOutput'=>round(($hrEnergyOfEachMonth[8]['hrEn']/$maxValueOfHrEn)*($avaDischarge), 2)],
                    ['name'=>'15:00', 'hrOutput'=>round(($hrEnergyOfEachMonth[9]['hrEn']/$maxValueOfHrEn)*($avaDischarge), 2)],
                    ['name'=>'16:00', 'hrOutput'=>round(($hrEnergyOfEachMonth[10]['hrEn']/$maxValueOfHrEn)*($avaDischarge), 2)],
                    ['name'=>'17:00', 'hrOutput'=>round(($hrEnergyOfEachMonth[11]['hrEn']/$maxValueOfHrEn)*($avaDischarge), 2)],  
                    ['name'=>'18:00', 'hrOutput'=>round(($hrEnergyOfEachMonth[12]['hrEn']/$maxValueOfHrEn)*($avaDischarge), 2)],  
                ];
                $totalMonthlyOutput =0;
                foreach ($eachMonthlyHrOutputP as $eaMoHrOutputP)
                {
                    $totalMonthlyOutput += (($eaMoHrOutputP['hrOutput'])-(($eaMoHrOutputP['hrOutput']*$dirtloss)/100));
                }
                array_push($monthlyHrOutputData, round($totalMonthlyOutput, 2));

                $eachmonthtotal = $eachmonth['t6am'] + $eachmonth['t7am'] + $eachmonth['t8am'] + $eachmonth['t9am'] + $eachmonth['t10am'] + $eachmonth['t11am'] + $eachmonth['t12am'] + $eachmonth['t1pm'] + $eachmonth['t2pm']+ $eachmonth['t3pm'] + $eachmonth['t4pm'] + $eachmonth['t5pm'] + $eachmonth['t6pm'];
                array_push($eachMonthFinalTotalEngery, round($eachmonthtotal,1));
            }

            $hrEnergy =  [
                ['name'=>'6:00', 'hrEn'=>round(($solar_power/1030)*($t6am/13), 2)],
                ['name'=>'7:00', 'hrEn'=>round(($solar_power/1030)*($t7am/13), 2)],
                ['name'=>'8:00', 'hrEn'=>round(($solar_power/1030)*($t8am/13), 2)],
                ['name'=>'9:00', 'hrEn'=>round(($solar_power/1030)*($t9am/13), 2)],
                ['name'=>'10:00', 'hrEn'=>round(($solar_power/1030)*($t10am/13), 2)],
                ['name'=>'11:00', 'hrEn'=>round(($solar_power/1030)*($t11am/13), 2)],
                ['name'=>'12:00', 'hrEn'=>round(($solar_power/1030)*($t12am/13), 2)],
                ['name'=>'13:00', 'hrEn'=>round(($solar_power/1030)*($t1pm/13), 2)],
                ['name'=>'14:00', 'hrEn'=>round(($solar_power/1030)*($t2pm/13), 2)],
                ['name'=>'15:00', 'hrEn'=>round(($solar_power/1030)*($t3pm/13), 2)],
                ['name'=>'16:00', 'hrEn'=>round(($solar_power/1030)*($t4pm/13), 2)],
                ['name'=>'17:00', 'hrEn'=>round(($solar_power/1030)*($t5pm/13), 2)],  
                ['name'=>'18:00', 'hrEn'=>round(($solar_power/1030)*($t6pm/13), 2)],  
            ];
            
            $energyForEachMonth =  [
                ['name'=>'Jan', 'energy'=>round($solar_power*($eachMonthFinalTotalEngery[0]/1030),2)],
                ['name'=>'Feb', 'energy'=>round($solar_power*($eachMonthFinalTotalEngery[1]/1030),2)],
                ['name'=>'Mar', 'energy'=>round($solar_power*($eachMonthFinalTotalEngery[2]/1030),2)],
                ['name'=>'Apr', 'energy'=>round($solar_power*($eachMonthFinalTotalEngery[3]/1030),2)],
                ['name'=>'May', 'energy'=>round($solar_power*($eachMonthFinalTotalEngery[4]/1030),2)],
                ['name'=>'Jun', 'energy'=>round($solar_power*($eachMonthFinalTotalEngery[5]/1030),2)],
                ['name'=>'Jul', 'energy'=>round($solar_power*($eachMonthFinalTotalEngery[6]/1030),2)],
                ['name'=>'Aug', 'energy'=>round($solar_power*($eachMonthFinalTotalEngery[7]/1030),2)],
                ['name'=>'Sep', 'energy'=>round($solar_power*($eachMonthFinalTotalEngery[8]/1030),2)],
                ['name'=>'Oct', 'energy'=>round($solar_power*($eachMonthFinalTotalEngery[9]/1030),2)],
                ['name'=>'Nov', 'energy'=>round($solar_power*($eachMonthFinalTotalEngery[10]/1030),2)],
                ['name'=>'Dec', 'energy'=>round($solar_power*($eachMonthFinalTotalEngery[11]/1030),2)],  
            ];
            $monthlyAvaOfEn = 0;
            foreach ($energyForEachMonth as $value) {
                $monthlyAvaOfEn = $monthlyAvaOfEn + $value['energy'];
            }
            array_push($energyForEachMonth, ['name'=>'Ava', 'energy'=>round($monthlyAvaOfEn/12, 2)]);

            $maxValue = 0;
            foreach ($hrEnergy as $hrEn)
            {
                if ($hrEn['hrEn']> $maxValue)
                {
                    $maxValue = $hrEn['hrEn'];
                }
            }
            $hrOutputP =  [
                ['name'=>'6:00', 'hrOutput'=>round(($hrEnergy[0]['hrEn']/$maxValue)*($avaDischarge), 2)],
                ['name'=>'7:00', 'hrOutput'=>round(($hrEnergy[1]['hrEn']/$maxValue)*($avaDischarge), 2)],
                ['name'=>'8:00', 'hrOutput'=>round(($hrEnergy[2]['hrEn']/$maxValue)*($avaDischarge), 2)],
                ['name'=>'9:00', 'hrOutput'=>round(($hrEnergy[3]['hrEn']/$maxValue)*($avaDischarge), 2)],
                ['name'=>'10:00', 'hrOutput'=>round(($hrEnergy[4]['hrEn']/$maxValue)*($avaDischarge), 2)],
                ['name'=>'11:00', 'hrOutput'=>round(($hrEnergy[5]['hrEn']/$maxValue)*($avaDischarge), 2)],
                ['name'=>'12:00', 'hrOutput'=>round(($hrEnergy[6]['hrEn']/$maxValue)*($avaDischarge), 2)],
                ['name'=>'13:00', 'hrOutput'=>round(($hrEnergy[7]['hrEn']/$maxValue)*($avaDischarge), 2)],
                ['name'=>'14:00', 'hrOutput'=>round(($hrEnergy[8]['hrEn']/$maxValue)*($avaDischarge), 2)],
                ['name'=>'15:00', 'hrOutput'=>round(($hrEnergy[9]['hrEn']/$maxValue)*($avaDischarge), 2)],
                ['name'=>'16:00', 'hrOutput'=>round(($hrEnergy[10]['hrEn']/$maxValue)*($avaDischarge), 2)],
                ['name'=>'17:00', 'hrOutput'=>round(($hrEnergy[11]['hrEn']/$maxValue)*($avaDischarge), 2)],  
                ['name'=>'18:00', 'hrOutput'=>round(($hrEnergy[12]['hrEn']/$maxValue)*($avaDischarge), 2)],  
            ];
            $hrAvaOfOut = 0;
            foreach ($hrOutputP as $value) {
                $hrAvaOfOut = $hrAvaOfOut + $value['hrOutput'];
            }

            $monthlyHrOutput =  [
                ['name'=>'Jan', 'MonthlyOutput'=>$monthlyHrOutputData[0]],
                ['name'=>'Feb', 'MonthlyOutput'=>$monthlyHrOutputData[1]],
                ['name'=>'Mar', 'MonthlyOutput'=>$monthlyHrOutputData[2]],
                ['name'=>'Apr', 'MonthlyOutput'=>$monthlyHrOutputData[3]],
                ['name'=>'May', 'MonthlyOutput'=>$monthlyHrOutputData[4]],
                ['name'=>'Jun', 'MonthlyOutput'=>$monthlyHrOutputData[5]],
                ['name'=>'Jul', 'MonthlyOutput'=>$monthlyHrOutputData[6]],
                ['name'=>'Aug', 'MonthlyOutput'=>$monthlyHrOutputData[7]],
                ['name'=>'Sep', 'MonthlyOutput'=>$monthlyHrOutputData[8]],
                ['name'=>'Oct', 'MonthlyOutput'=>$monthlyHrOutputData[9]],
                ['name'=>'Nov', 'MonthlyOutput'=>$monthlyHrOutputData[10]],
                ['name'=>'Dec', 'MonthlyOutput'=>$monthlyHrOutputData[11]],  
            ];
            $monthlyAvaOfOut = 0;
            foreach ($monthlyHrOutput as $value) {
                $monthlyAvaOfOut = $monthlyAvaOfOut + $value['MonthlyOutput'];
            }
            array_push($monthlyHrOutput, ['name'=>'Ava', 'MonthlyOutput'=>round($monthlyAvaOfOut/12, 2)]);
            
            $energyResulty = ['hrEnergy' =>$hrEnergy, 'energyForEachMonth' => $energyForEachMonth, 'hrOutputP' => $hrOutputP, 'monthlyHrOutput' => $monthlyHrOutput, 'hrAvaOfOut'=>round($hrAvaOfOut/13, 2), 'monthlyAvaOfOut'=>round($monthlyAvaOfOut/12, 2)];
            return $energyResulty;
    }

    public function analyze(Request $request){
        //    return $request;
       $selectedpump = array();
       $avaDischarge;
       $pumps = Pump_list::where('pump_brand_id', $request['pumpvalue'])->with(['pump_config','pump_brand'])->get();
        // return $pumps;
        foreach($pumps as $eachpump){
             foreach($eachpump['pump_config'] as $pumconfig){
                
                if($request['dynamicHead'] > $pumconfig['min_head'] &&  $request['dynamicHead'] <= $pumconfig['max_head']){
                    if($request['discharge'] > $pumconfig['min_discharge'] &&  $request['discharge'] <= $pumconfig['max_discharge']){
                        $avaDischarge = ($pumconfig['min_discharge'] + $pumconfig['max_discharge'])/2;
                        if($request['motorcable'] > $pumconfig['min_cable_length'] &&  $request['motorcable'] <= $pumconfig['max_cable_length']){
                            array_push($selectedpump, $eachpump);
                            array_push($selectedpump, $pumconfig);
                            break;
                        }
                    }
                }
             }
        }
        // return $selectedpump;
        $cable = [];
        if($selectedpump[1]->cable_type_id != null){
            $cable = Cable_type::where('id',$selectedpump[1]->cable_type_id)->get()->first();
        }
        $solar = [];
        $inverter = [];
        $hrEnergy = [];
        $energy = [];
        $hrOutputP = [];
        $monthlyHrOutput = [];
        if($selectedpump[0]->power != null){
            $inverter = InvertorList::where('invertor_brand_id',$request['invertorvalue'])->with(['inverter_config', 'invertor_brand'])
            ->whereHas('inverter_config', function($query) use ($selectedpump){
                return $query->where('power', $selectedpump[0]->power);
            })
            ->get()->first();

            $solar = Config_solar::where('power',$selectedpump[0]->power)->where('base',$request['bas'])->with(['solar_list'])
            ->whereHas('solar_list', function($query) use ($request){
                return $query->where('id', $request['solarSelectWatt'])
                ->where('solar_brand_id', $request['solarvalue']);
            })
            ->get()->first();
            // return  $solar;
            if($solar && $request['citylocation'] != null){
                $energyData = $this->getEnergy($request['citylocation'], $solar['solar_list']['power'], $avaDischarge, $request['dirtloss']);
                $hrOutputP = $energyData['hrOutputP'];  $monthlyHrOutput = $energyData['monthlyHrOutput']; $hrEnergy = $energyData['hrEnergy']; $energy = $energyData['energyForEachMonth'];
            }
        }
        // return $selectedpump[0]->power;
        $solarbrand = [];
        if($solar['solar_list']->solar_brand_id != null){
            $solarbrand = Solar_brands::where('id',$solar['solar_list']->solar_brand_id)->get()->first();
        }

         return response()->json([
            'pupm'=> $selectedpump , 'solar'=>$solar, 'inverter'=>$inverter, 'cable'=>$cable, 'solarbrand'=> $solarbrand, 'hrEnergy'=> $hrEnergy, 'energy'=> $energy, 'hrOutputP'=> $hrOutputP, 'monthlyHrOutput'=> $monthlyHrOutput
        ]);
    }

    public function getIrredation($city_id){
        $eachmonthfinaltotal = array();
         $t6am=0;  $t7am=0;  $t8am=0;  $t9am=0;  $t10am=0;  $t11am=0;  $t12am=0;  $t1pm=0;  $t2pm=0;  $t3pm=0;  $t4pm=0;  $t5pm=0; $t6pm=0;
         $january=0;$february=0;$march=0;$april=0;$may=0;$january=0;$january=0;$january=0;$january=0;$january=0;$january=0;$january=0; 
         $irredation = Irradiation::where('geolocation_id',$city_id)->get();

            foreach($irredation as $key => $eachmonth){
             $t6am = $t6am + $eachmonth['t6am'];
             $t7am = $t7am + $eachmonth['t7am'];
             $t8am = $t8am + $eachmonth['t8am'];
             $t9am = $t9am + $eachmonth['t9am'];
             $t10am = $t10am + $eachmonth['t10am'];
             $t11am = $t11am + $eachmonth['t11am'];
             $t12am = $t12am + $eachmonth['t12am'];
             $t1pm = $t1pm + $eachmonth['t1pm'];
             $t2pm = $t2pm + $eachmonth['t2pm'];
             $t3pm = $t3pm + $eachmonth['t3pm'];
             $t4pm = $t4pm + $eachmonth['t4pm'];
             $t5pm = $t5pm + $eachmonth['t5pm'];
             $t6pm = $t6pm + $eachmonth['t6pm'];

            //  $eachmonthavrege = ($t6am + $t7am + $t8am + $t9am + $t10am + $t11am + $t12am + $t1pm + $t2pm + $t3pm + $t4pm + $t5pm) /12;
            //  array_push($eachmonthfinalavrege, $eachmonthavrege);


             $eachmonthtotal = $eachmonth['t6am'] + $eachmonth['t7am'] + $eachmonth['t8am'] + $eachmonth['t9am'] + $eachmonth['t10am'] + $eachmonth['t11am'] + $eachmonth['t12am'] + $eachmonth['t1pm'] + $eachmonth['t2pm']+ $eachmonth['t3pm'] + $eachmonth['t4pm'] + $eachmonth['t5pm'] + $eachmonth['t6pm'];
             array_push($eachmonthfinaltotal, round($eachmonthtotal,1));
            }
             $average =  [
                 ['name'=>'6am', 'val'=>round($t6am/13, 2)],
                 ['name'=>'7am', 'val'=>round($t7am/13, 2)],
                 ['name'=>'8am', 'val'=>round($t8am/13, 2)],
                 ['name'=>'9am', 'val'=>round($t9am/13, 2)],
                 ['name'=>'10am', 'val'=>round($t10am/13, 2)],
                 ['name'=>'11am', 'val'=>round($t11am/13, 2)],
                 ['name'=>'12am', 'val'=>round($t12am/13, 2)],
                 ['name'=>'1pm', 'val'=>round($t1pm/13, 2)],
                 ['name'=>'2pm', 'val'=>round($t2pm/13, 2)],
                 ['name'=>'3pm', 'val'=>round($t3pm/13, 2)],
                 ['name'=>'4pm', 'val'=>round($t4pm/13, 2)],
                 ['name'=>'5pm', 'val'=>round($t5pm/13, 2)],  
                 ['name'=>'6pm', 'val'=>round($t5pm/13, 2)],  
             ];

             $averageforeachmonth =  [
                 ['name'=>'Jan', 'value'=>$eachmonthfinaltotal[0]],
                 ['name'=>'Feb', 'value'=>$eachmonthfinaltotal[1]],
                 ['name'=>'Mar', 'value'=>$eachmonthfinaltotal[2]],
                 ['name'=>'Apr', 'value'=>$eachmonthfinaltotal[3]],
                 ['name'=>'May', 'value'=>$eachmonthfinaltotal[4]],
                 ['name'=>'Jun', 'value'=>$eachmonthfinaltotal[5]],
                 ['name'=>'Jul', 'value'=>$eachmonthfinaltotal[6]],
                 ['name'=>'Aug', 'value'=>$eachmonthfinaltotal[7]],
                 ['name'=>'Sep', 'value'=>$eachmonthfinaltotal[8]],
                 ['name'=>'Oct', 'value'=>$eachmonthfinaltotal[9]],
                 ['name'=>'Nov', 'value'=>$eachmonthfinaltotal[10]],
                 ['name'=>'Dec', 'value'=>$eachmonthfinaltotal[11]],  
             ];

             $avgofeachmonth = 0;
          
             foreach ($eachmonthfinaltotal as $value) {
                    $avgofeachmonth = $avgofeachmonth + $value;
             }

            

         return response()->json([
            'avForMonth'=> $averageforeachmonth , 'avForhour'=>$average,
            'avgofeachmonth' => round(($avgofeachmonth/12),1)
        ]);
      
    }

    public function gitprojectdata($id){
        
        $pumpbrand = Pump_brands::where('status', 'enable')->with('userBrandRole')
            ->whereHas('userBrandRole', function($query) use ($id){
                return $query->where('user_id', $id)->where('checked', "true");
            })
            ->get();
        $solarbrand = Solar_brands::where('status', 'enable')->with('userBrandRole')
            ->whereHas('userBrandRole', function($query) use ($id){
                return $query->where('user_id', $id)->where('checked', "true");
            })
            ->get();
        $invertorbrand = InvertorBrand::where('status', 'enable')->with('userBrandRole')
            ->whereHas('userBrandRole', function($query) use ($id){
                return $query->where('user_id', $id)->where('checked', "true");
            })
            ->get();
        $accessories = Accessories_list::with('uom')->get();
        $country = DB::table('geolocations')
            ->select('country')
            ->groupBy('country')
            ->get();
        $city = $this->getcity('Afghanistan');
        return response()->json([
            'city'=> $city , 'pumpbrand'=>$pumpbrand, 'solarbrand'=>$solarbrand, 'accessories'=>$accessories,'countrylist' => $country, 'invertorbrand'=>$invertorbrand
        ]);
    }

    public function getSolarWatt($id){
        return Solar_list::where('solar_brand_id', $id)->get()->unique('power');
        // $solar_list_watts = Solar_list::all()->unique('power');
        // $solar_watts = array();
        // foreach ($solar_list_watts as $key => $value) {
        //     array_push($solar_watts, $value);
        // }

        // return response()->json(['solarWatts'=>$solar_list_watts]);
    }

    public function getcity($country){
        return Geolocation::where('country', $country)->get();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Projects::with(['geolocation','user'])->get();
    }

    public function projectbyuser($id){
        $user = User::findOrFail($id);
        if($user){
            if($user->system === 1){
                return Projects::with(['geolocation','user'])->orderBy('id', 'DESC')->get();
            }else{
                return Projects::where('user_id',$id)->with(['geolocation','user'])->orderBy('id', 'DESC')->get();    
            }
        }
        
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
        $project =  Projects::create([
            'country' => $request['city']['country'],
            'city_id' => $request['city']['id'],
            'name' => $request['projectname'],
            'daynomic_head' => $request['daynomichead'],
            'solar_cable' => $request['solarCable'],
            'motor_cable' =>$request['motorcable'],
            'daily_output' => $request['discharge'],
            'dirt_loss' => $request['dirtloss'],
            'solar_base' => $request['bas'],
            'solar_watt' => $request['solarSelectWatt'],
            'latitude' => $request['gps']['lati'],
            'longtitude' => $request['gps']['long'],
            'pip_length' => $request['piplenght'],
            'discription' => $request['discription'],
            'pump_brand_id' => $request['pumpvalue'],
            'solar_brand_id' => $request['solarvalue'],
            'invertor_brand_id' => $request['invertorvalue'],
            'user_id' => $request['user_id'],
            
        ]);

        foreach($request->inputFields as $value){
            if($value['item']){
                Project_accessories::create([
                    'project_id' => $project->id,
                    'accessories_id' => $value['item']['id'],
                    'quantity' => $value['quantity'],
    
                ]);
            }
           
        }

        DB::commit();
        return $project->id;
    } catch (Exception $e) {
        DB::rollback();
    }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Projects  $projects
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $project = Projects::where('id', $id)->with(['geolocation', 'user'])->get();
        $projectAccessories = Project_accessories::where('project_id', $id)->with('accessoriesListWithUom')->get();
        $irradiation = $this->getIrrWithAva($project[0]->city_id);
        $dynamicHead = ($project[0]->daynomic_head + ceil(($project[0]->dirt_loss * $project[0]->pip_length) / 100));
        $discharge =$project[0]->daily_output;
        $motorcable =$project[0]->motor_cable;

        $selectedpump = array();
        $avaDischarge;
        $pumps = Pump_list::where('pump_brand_id', $project[0]->pump_brand_id)->with(['pump_config','pump_brand'])->get();
         // return $pumps;
         foreach($pumps as $eachpump){
              foreach($eachpump['pump_config'] as $pumconfig){
                 
                 if($dynamicHead > $pumconfig['min_head'] &&  $dynamicHead <= $pumconfig['max_head']){
                     if($discharge > $pumconfig['min_discharge'] &&  $discharge <= $pumconfig['max_discharge']){
                         $avaDischarge = ($pumconfig['min_discharge'] + $pumconfig['max_discharge'])/2;
                         if($motorcable > $pumconfig['min_cable_length'] &&  $motorcable <= $pumconfig['max_cable_length']){
                             array_push($selectedpump, $eachpump);
                             array_push($selectedpump, $pumconfig);
                             break;
                         }
                     }
                 }
              }
         }
         // return $selectedpump;
         $cable = [];
         if($selectedpump[1]->cable_type_id != null){
             $cable = Cable_type::where('id',$selectedpump[1]->cable_type_id)->get()->first();
         }
        $solar = [];
        $inverter = [];
        $energyWithOutPut = [];
        if($selectedpump[0]->power != null){
            $inverter = InvertorList::where('invertor_brand_id',$project[0]->invertor_brand_id)->with(['inverter_config', 'invertor_brand'])
            ->whereHas('inverter_config', function($query) use ($selectedpump){
                return $query->where('power', $selectedpump[0]->power);
            })
            ->get()->first();

            $solar = Config_solar::where('power',$selectedpump[0]->power)->where('base', $project[0]->solar_base)->with(['solarListWithCable'])
            ->whereHas('solarListWithCable', function($query) use ($project){
                return $query->where('id', $project[0]->solar_watt)
                ->where('solar_brand_id', $project[0]->solar_brand_id);
            })
            ->get()->first();
            // return  $solar;
            if($solar){
            $energyWithOutPut = $this->getEnergy($project[0]->city_id, $solar['solarListWithCable']['power'], $avaDischarge, $project[0]->dirt_loss);
            
        }
        }
        // return $selectedpump[0]->power;
        $solarbrand = [];
        if($solar['solarListWithCable']->solar_brand_id != null){
            $solarbrand = Solar_brands::where('id',$solar['solarListWithCable']->solar_brand_id)->get()->first();
        }
        $projectDate= $project[0]->created_at->format('l\\, j\\,F\\,Y');
        $project[0]['projectDate']= $projectDate;
        return response()->json([
            'project'=> $project, 'projectAccessories'=> $projectAccessories, 'irradiation'=>$irradiation, 'inverter'=>$inverter, 'pupm'=> $selectedpump, 'solarbrand'=> $solarbrand, 'solarList'=> $solar, 'cable'=> $cable, 'energyWithOutPut'=>$energyWithOutPut
        ]);
    }
    public function getIrrWithAva($city_id){
        $eachmonthfinaltotal = array();
        $t6am=0;  $t7am=0;  $t8am=0;  $t9am=0;  $t10am=0;  $t11am=0;  $t12am=0;  $t1pm=0;  $t2pm=0;  $t3pm=0;  $t4pm=0;  $t5pm=0; $t6pm=0;
        $january=0;$february=0;$march=0;$april=0;$may=0;$january=0;$january=0;$january=0;$january=0;$january=0;$january=0;$january=0; 
        $irredation = Irradiation::where('geolocation_id',$city_id)->get();

        foreach($irredation as $key => $eachmonth){
            $t6am = $t6am + $eachmonth['t6am'];
            $t7am = $t7am + $eachmonth['t7am'];
            $t8am = $t8am + $eachmonth['t8am'];
            $t9am = $t9am + $eachmonth['t9am'];
            $t10am = $t10am + $eachmonth['t10am'];
            $t11am = $t11am + $eachmonth['t11am'];
            $t12am = $t12am + $eachmonth['t12am'];
            $t1pm = $t1pm + $eachmonth['t1pm'];
            $t2pm = $t2pm + $eachmonth['t2pm'];
            $t3pm = $t3pm + $eachmonth['t3pm'];
            $t4pm = $t4pm + $eachmonth['t4pm'];
            $t5pm = $t5pm + $eachmonth['t5pm'];
            $t6pm = $t6pm + $eachmonth['t6pm'];

            $eachmonthtotal = $eachmonth['t6am'] + $eachmonth['t7am'] + $eachmonth['t8am'] + $eachmonth['t9am'] + $eachmonth['t10am'] + $eachmonth['t11am'] + $eachmonth['t12am'] + $eachmonth['t1pm'] + $eachmonth['t2pm']+ $eachmonth['t3pm'] + $eachmonth['t4pm'] + $eachmonth['t5pm'] + $eachmonth['t6pm'];
            array_push($eachmonthfinaltotal, round($eachmonthtotal,1));
        }

        $dailyIrrs =  [
            ['name'=>'6:00', 'value'=>round($t6am/13, 2)],
            ['name'=>'7:00', 'value'=>round($t7am/13, 2)],
            ['name'=>'8:00', 'value'=>round($t8am/13, 2)],
            ['name'=>'9:00', 'value'=>round($t9am/13, 2)],
            ['name'=>'10:00', 'value'=>round($t10am/13, 2)],
            ['name'=>'11:00', 'value'=>round($t11am/13, 2)],
            ['name'=>'12:00', 'value'=>round($t12am/13, 2)],
            ['name'=>'13:00', 'value'=>round($t1pm/13, 2)],
            ['name'=>'14:00', 'value'=>round($t2pm/13, 2)],
            ['name'=>'15:00', 'value'=>round($t3pm/13, 2)],
            ['name'=>'16:00', 'value'=>round($t4pm/13, 2)],
            ['name'=>'17:00', 'value'=>round($t5pm/13, 2)],  
            ['name'=>'18:00', 'value'=>round($t5pm/13, 2)],  
        ];
        $monthIrrs =  [
            ['name'=>'Jan', 'value'=>$eachmonthfinaltotal[0]],
            ['name'=>'Feb', 'value'=>$eachmonthfinaltotal[1]],
            ['name'=>'Mar', 'value'=>$eachmonthfinaltotal[2]],
            ['name'=>'Apr', 'value'=>$eachmonthfinaltotal[3]],
            ['name'=>'May', 'value'=>$eachmonthfinaltotal[4]],
            ['name'=>'Jun', 'value'=>$eachmonthfinaltotal[5]],
            ['name'=>'Jul', 'value'=>$eachmonthfinaltotal[6]],
            ['name'=>'Aug', 'value'=>$eachmonthfinaltotal[7]],
            ['name'=>'Sep', 'value'=>$eachmonthfinaltotal[8]],
            ['name'=>'Oct', 'value'=>$eachmonthfinaltotal[9]],
            ['name'=>'Nov', 'value'=>$eachmonthfinaltotal[10]],
            ['name'=>'Dec', 'value'=>$eachmonthfinaltotal[11]],  
        ];

        $monthlyAva = 0;
        foreach ($monthIrrs as $value) {
            $monthlyAva = $monthlyAva + $value['value'];
        }
        array_push($monthIrrs, ['name'=>'Ava', 'value'=>round($monthlyAva/12, 2)]);
        return ['dailyIrrs'=> $dailyIrrs , 'monthIrrs'=>$monthIrrs];
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Projects  $projects
     * @return \Illuminate\Http\Response
     */
    public function edit(Projects $projects)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Projects  $projects
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Projects $projects)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Projects  $projects
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $project = Projects::findOrFail($id);
        $project->delete();
        return ['message' => 'Project Deleted Succefully'];
    }
}
