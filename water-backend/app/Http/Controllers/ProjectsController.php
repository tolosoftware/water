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
use App\Models\Structure;
use App\Models\User;
use App\Models\Accessories_list;
use Illuminate\Http\Request;
use DB;
use PDF;
use Illuminate\Support\Facades\View;


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
                    // (($eaMoHrOutputP['hrOutput'])-(($eaMoHrOutputP['hrOutput']*$dirtloss)/100))
                    $totalMonthlyOutput += (($eaMoHrOutputP['hrOutput'])-(($eaMoHrOutputP['hrOutput']*10)/100));
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
            $maxValueMonthlyEnergy = 0;
            $monthlyAvaOfEn = 0;
            foreach ($energyForEachMonth as $value) {
                $monthlyAvaOfEn = $monthlyAvaOfEn + $value['energy'];
                if ($value['energy']> $maxValueMonthlyEnergy)
                {
                    $maxValueMonthlyEnergy = $value['energy'];
                }
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
       $errors = [
           'head'=>false,
           'discharge'=>false,
           'motorcable'=>false,
           'pumpvalue'=>false,
           'solarvalue'=>false,
           'invertorvalue'=>false,
        ];
       $avaDischarge;
        $pumps = Pump_list::where('pump_brand_id', $request['pumpvalue'])->with(['pump_config','pump_brand'])->get();
       if(!empty($pumps[0])){
            $errors['pumpvalue']=true;
       }
        // return $pumps;
        foreach($pumps as $eachpump){
             foreach($eachpump['pump_config'] as $pumconfig){
                
                if(($request['dynamicHead'] > $pumconfig['min_head'] &&  $request['dynamicHead'] <= $pumconfig['max_head']) &&
                  ($request['discharge'] > $pumconfig['min_discharge'] &&  $request['discharge'] <= $pumconfig['max_discharge']) &&
                  ($request['motorcable'] > $pumconfig['min_cable_length'] &&  $request['motorcable'] <= $pumconfig['max_cable_length'])){
                    $errors['motorcable']=true;  
                    $errors['discharge']=true;
                    $errors['head']=true;
                    $avaDischarge = ($pumconfig['min_discharge'] + $pumconfig['max_discharge'])/2;
                    array_push($selectedpump, $eachpump);
                    array_push($selectedpump, $pumconfig);
                    break;
                }else{
                    if($request['dynamicHead'] > $pumconfig['min_head'] &&  $request['dynamicHead'] <= $pumconfig['max_head']){
                        $errors['head']=true;
                    }
                    if($request['discharge'] > $pumconfig['min_discharge'] &&  $request['discharge'] <= $pumconfig['max_discharge']){
                        $errors['discharge']=true;
                    }
                    if($request['motorcable'] > $pumconfig['min_cable_length'] &&  $request['motorcable'] <= $pumconfig['max_cable_length']){
                        $errors['motorcable']=true;
                    }
                    
                }
             }
        }
        // return $selectedpump;
        $cable = [];
        if(!empty($selectedpump[1])){
            if($selectedpump[1]->cable_type_id != null){
                $cable = Cable_type::where('id',$selectedpump[1]->cable_type_id)->get()->first();
            }
        }
        $solar = [];
        $inverter = [];
        $hrEnergy = [];
        $energy = [];
        $hrOutputP = [];
        $monthlyHrOutput = [];
        if(!empty($selectedpump[0])){
            if($selectedpump[0]->power != null){
                $inverter = InvertorList::where('invertor_brand_id',$request['invertorvalue'])->with(['inverter_config', 'invertor_brand'])
                ->whereHas('inverter_config', function($query) use ($selectedpump){
                    return $query->where('power', $selectedpump[0]->power);
                })
                ->get()->first();
                if(!empty($inverter)){
                    $errors['invertorvalue']=true;
                }

                $solar = Config_solar::where('power',$selectedpump[0]->power)->where('base',$request['bas'])->with(['solar_list'])
                ->whereHas('solar_list', function($query) use ($request){
                    return $query->where('id', $request['solarSelectWatt'])
                    ->where('solar_brand_id', $request['solarvalue'])->with(['cable']);
                })
                ->get()->first();

                if(!empty($solar)){
                    $errors['solarvalue']=true;
                }
                // return  $solar;
                if($solar && $request['citylocation'] != null){
                    $energyData = $this->getEnergy($request['citylocation'], $solar['solar_list']['power'], $avaDischarge, $request['dirtloss']);
                    $hrOutputP = $energyData['hrOutputP'];  $monthlyHrOutput = $energyData['monthlyHrOutput']; $hrEnergy = $energyData['hrEnergy']; $energy = $energyData['energyForEachMonth'];
                }
            }
        }
        // return $selectedpump[0]->power;
        $solarbrand = [];
        if(!empty($solar['solar_list'])){
            if($solar['solar_list']->solar_brand_id != null){
                $solarbrand = Solar_brands::where('id',$solar['solar_list']->solar_brand_id)->get()->first();
            }
            if($solar['solar_list']->cable_type_id != null){
                $solar['solar_list']['cable']= Cable_type::where('id',$solar['solar_list']->cable_type_id)->get()->first();
            }
        }
        $structure = Structure::where('model', $request['bas'])->get();

         return response()->json([
            'pupm'=> $selectedpump , 'solar'=>$solar, 'inverter'=>$inverter, 'structure'=>$structure, 'cable'=>$cable, 'solarbrand'=> $solarbrand, 'hrEnergy'=> $hrEnergy, 'energy'=> $energy, 'hrOutputP'=> $hrOutputP, 'monthlyHrOutput'=> $monthlyHrOutput, 'errors'=> $errors
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
    public function authUser($id, $system){
        $user = User::findOrFail($id);
        if($user->status=='inactive' || $user->status=='pending' || $user->system!=$system){
            return 'unauthenticated';
        }
        
    }
    public function gitprojectdata(Request $request){
        
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
        $invertorbrand = InvertorBrand::where('status', 'enable')->with('userBrandRole')
            ->whereHas('userBrandRole', function($query) use ($request){
                return $query->where('user_id', $request[0])->where('checked', "true");
            })
            ->get();
        $accessories = Accessories_list::with('uom')->get();
        $country = DB::table('geolocations')
            ->select('country')
            ->groupBy('country')
            ->get();
        $city = $this->getcity('Afghanistan');
        $estimatedCost = User::where('id',$request[0])->value('estimated_cost');
        return response()->json([ 'auth'=> $this->authUser($request[0], $request[1]),
            'city'=> $city , 'pumpbrand'=>$pumpbrand, 'solarbrand'=>$solarbrand, 'accessories'=>$accessories,'countrylist' => $country, 'invertorbrand'=>$invertorbrand, 'estimatedCost' => $estimatedCost,
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

    public function projectbyuser(Request $request){
        $user = User::findOrFail($request[0]);
        if($user){
            if((int)$user->system === 1){
                $projects = Projects::with(['geolocation','user'])->orderBy('id', 'DESC')->get();
                return ['projects'=> $projects, 'auth'=> $this->authUser($request[0], $request[1])];
            }else{
                $projects = Projects::where('user_id',$request[0])->with(['geolocation','user'])->orderBy('id', 'DESC')->get();
                return ['projects'=> $projects, 'auth'=> $this->authUser($request[0], $request[1])];     
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
            'daily_output_changed' => $request['dischargeChanged'],
            'daily_output_lable' => $request['waterDeLable'],
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
        $structure = Structure::where('model', $project[0]->solar_base)->first();
        return response()->json([
            'project'=> $project, 'projectAccessories'=> $projectAccessories, 'irradiation'=>$irradiation, 'inverter'=>$inverter, 'structure'=>$structure, 'pupm'=> $selectedpump, 'solarbrand'=> $solarbrand, 'solarList'=> $solar, 'cable'=> $cable, 'energyWithOutPut'=>$energyWithOutPut
        ]);
    }
    public function getProjectData($id){
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
        $structure = Structure::where('model', $project[0]->solar_base)->first();
        return [
            'project'=> $project, 'projectAccessories'=> $projectAccessories, 'irradiation'=>$irradiation, 'inverter'=>$inverter, 'structure'=>$structure, 'pupm'=> $selectedpump, 'solarbrand'=> $solarbrand, 'solarList'=> $solar, 'cable'=> $cable, 'energyWithOutPut'=>$energyWithOutPut
        ];
    }

    public function createPdf($id){
        $data = $this->getProjectData($id);

        $newdata = ['project'=>$data['project'], 'projectAccessories'=>$data['projectAccessories'], 'irradiation'=>$data['irradiation'], 'inverter' =>$data['inverter'], 'structure' =>$data['structure'], 'pupm' =>$data['pupm'],'solarbrand' =>$data['solarbrand'],'solarList' =>$data['solarList'], 'cable' =>$data['cable'], 'energyWithOutPut' =>$data['energyWithOutPut'],];
         // $pdf=PDF::loadView('pdf', compact( 'name'), [], [
        //     'format' => 'A4',
        //     'custom_font_data' => ['Arial'],
        //     'display_mode' => 'fullpage',
        //     // 'title' => trans('general.scoresheet_report'),
        // ]);
        // return $pdf->stream('document.pdf');
        set_time_limit(300);
        return PDF::loadView('pdf', ['data'=>$data], [], [
             'title' => 'Another Title',
             'margin_top' => 0,
             'format' => 'A4',
             'custom_font_data' => ['Arial'],
             'display_mode' => 'fullpage',
           ])->stream('document.pdf');
 
         $pageHeading = "<div class='header-info'>
         <div class='row mb-3' style='border-bottom: 1px solid; padding-top: 20px;'>
             <div class='col-md-12 mb-2' style='padding-bottom: 10px;'>
                 <img src='URL::asset('layouts/System_logo1.png')' class='img-thumbnail' style='border: 0px solid #dee2e6;
         padding: 0px;
         height: 80px;' alt='Responsive' />
     
                 <div style='float: right; display: inline-block;'><span>
                         <div role='group' class='btn-group-vertical'><button
                                 class='MuiButtonBase-root MuiButton-root MuiButton-text jr-btn'
                                 tabindex='0' type='button'><span class='MuiButton-label'><i
                                         class='zmdi zmdi-email zmdi-hc-fw '></i></span><span
                                     class='MuiTouchRipple-root'></span></button><button
                                 class='MuiButtonBase-root MuiButton-root MuiButton-text jr-btn'
                                 tabindex='0' type='button'><span class='MuiButton-label'><i
                                         class='zmdi zmdi-phone zmdi-hc-fw '></i></span><span
                                     class='MuiTouchRipple-root'></span></button><button
                                 class='MuiButtonBase-root MuiButton-root MuiButton-text jr-btn'
                                 tabindex='0' type='button'><span class='MuiButton-label'><i
                                         class='zmdi zmdi-pin zmdi-hc-fw'></i></span><span
                                     class='MuiTouchRipple-root'></span></button></div>
                     </span><span>
                         <div role='group' class='header-info btn-group-vertical'><button
                                 class='MuiButtonBase-root MuiButton-root MuiButton-text jr-btn makeStyles-btnJr-47'
                                 tabindex='0' type='button'><span
                                     class='MuiButton-label'>info@awm.solar</span><span
                                     class='MuiTouchRipple-root'></span></button><button
                                 class='MuiButtonBase-root MuiButton-root MuiButton-text jr-btn makeStyles-btnJr-47'
                                 tabindex='0' type='button'><span class='MuiButton-label'>+93
                                     790303132</span><span
                                     class='MuiTouchRipple-root'></span></button><button
                                 class='MuiButtonBase-root MuiButton-root MuiButton-text jr-btn makeStyles-btnJr-47'
                                 tabindex='0' type='button'><span
                                     class='MuiButton-label'>Kabul-Afghanistan</span><span
                                     class='MuiTouchRipple-root'></span></button></div>
                     </span></div>
             </div>
         </div>
         <div style='width: 20%; display: inline-block;'>
             Project Name:
         </div>";
     $content = "<div class='header-info'>
        <div class='row mb-3' style='border-bottom: 1px solid; padding-top: 20px;'>
            <div class='col-md-12 mb-2' style='padding-bottom: 10px;'>
                <img src='layouts/System_logo1.png'class='img-thumbnail' style='border: 0px solid #dee2e6;
        padding: 0px;
        height: 80px;' alt='Responsive' />
    
                <div style='float: right; display: inline-block;'><span>
                        <div role='group' class='btn-group-vertical'><button
                                class='MuiButtonBase-root MuiButton-root MuiButton-text jr-btn'
                                tabindex='0' type='button'><span class='MuiButton-label'><i
                                        class='zmdi zmdi-email zmdi-hc-fw '></i></span><span
                                    class='MuiTouchRipple-root'></span></button><button
                                class='MuiButtonBase-root MuiButton-root MuiButton-text jr-btn'
                                tabindex='0' type='button'><span class='MuiButton-label'><i
                                        class='zmdi zmdi-phone zmdi-hc-fw '></i></span><span
                                    class='MuiTouchRipple-root'></span></button><button
                                class='MuiButtonBase-root MuiButton-root MuiButton-text jr-btn'
                                tabindex='0' type='button'><span class='MuiButton-label'><i
                                        class='zmdi zmdi-pin zmdi-hc-fw'></i></span><span
                                    class='MuiTouchRipple-root'></span></button></div>
                    </span><span>
                        <div role='group' class='header-info btn-group-vertical'><button
                                class='MuiButtonBase-root MuiButton-root MuiButton-text jr-btn makeStyles-btnJr-47'
                                tabindex='0' type='button'><span
                                    class='MuiButton-label'>info@awm.solar</span><span
                                    class='MuiTouchRipple-root'></span></button><button
                                class='MuiButtonBase-root MuiButton-root MuiButton-text jr-btn makeStyles-btnJr-47'
                                tabindex='0' type='button'><span class='MuiButton-label'>+93
                                    790303132</span><span
                                    class='MuiTouchRipple-root'></span></button><button
                                class='MuiButtonBase-root MuiButton-root MuiButton-text jr-btn makeStyles-btnJr-47'
                                tabindex='0' type='button'><span
                                    class='MuiButton-label'>Kabul-Afghanistan</span><span
                                    class='MuiTouchRipple-root'></span></button></div>
                    </span></div>
            </div>
        </div>
        <div style='width: 20%; display: inline-block;'>
            Project Name:
        </div>
        <div style='display: inline-block;'>
        </div>
        <div style='display: inline-block;'>
        Well, wkhtmltopdf is a command line program that accepts an html file as parameter, so you just have to install it and you are ready to go. It has package for Linux and Windows.
        Well, wkhtmltopdf is a command line program that accepts an html file as parameter, so you just have to install it and you are ready to go. It has package for Linux and Windows.
        Well, wkhtmltopdf is a command line program that accepts an html file as parameter, so you just have to install it and you are ready to go. It has package for Linux and Windows.
        Well, wkhtmltopdf is a command line program that accepts an html file as parameter, so you just have to install it and you are ready to go. It has package for Linux and Windows.
        
        </div>
        <Divider class='mb-3 mt-3' />
        </div>";
         // $this->printPdf($contents, 'report', ['format' => 'A4', 'custom_font_data' => ['Arial'], $pageHeading]);
 
    }
    public function printPdf($content=null,$title='',$config=array(), $pageHeading=null)
    {
        
        $title=($title)?$title:'report';
        $title=($title)?__('lang.'.$title):'';

        $orientation=isset($config['orientation'])?$config['orientation']:'P';

        $format=isset($config['format'])?$config['format']:'A4';
        $mpdf = new \Mpdf\Mpdf([
            'default_font'=>'xbriyaz',
            'mode' => 'utf-8',
            'orientation' => $orientation,
            'format' => $format,
            // 'margin-top'=>60,
            'margin-header'=>10,
            'margin-bottom'=>10,
            'margin-footer'=>10,

        ]);

        
        $mpdf->SetTitle($title);

        $mpdf->Bookmark('Start of the document');

        $mpdf->enableImports = true;
        ini_set("pcre.backtrack_limit", "5000000");
        
        $mpdf->SetHTMLHeader($pageHeading);
        $mpdf->WriteHTML($content, \Mpdf\HTMLParserMode::DEFAULT_MODE);

        $mpdf->Output($title.' '.date('Y-m-d H:i:s').'.pdf','I');
        

    //     $mpdf->Output();
    }

    public function showPDF($id){
        $data = $this->getProjectData($id);
        // dd($data);
        // share data to view
       return view('pdf')->with(['data'=>$data]);
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
