<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login', [AuthController::class, 'login']);
Route::get('/loginUser', [AuthController::class, 'loginUser'])->middleware('auth:api');
Route::resource('user', UserController::class);
Route::get('userproject/{id}',[UserController::class,'getUserProject']);
Route::post('getUsersList',[UserController::class,'show']);
Route::get('provenceUser',[UserController::class,'provenceUser']);
Route::get('expir/{id}',[UserController::class,'getexpiration']);
Route::get('userBrand/{id}',[UserController::class,'getUserBrand']);
Route::post('checkToken',[UserController::class,'checkToken']);
Route::post('postUserBrand',[UserController::class,'postUserBrand']);

// Dashboard Route
Route::post('adminDashboard',[UserController::class,'adminDashboard']);
Route::get('userCity',[UserController::class,'userCity']);

// Registration Request from Users
Route::post('signupRequest',[UserController::class,'signupRequest']);

//setting
Route::resource('structure', StructureController::class);
Route::resource('uom', UomController::class);
Route::resource('cabletype', CableTypeController::class);
Route::resource('accessoriestype', AccessoriesTypeController::class);
Route::get('getAccessoryData', [AccessoriesTypeController::class,'getAccessoryData']);
//water pump brand
Route::resource('pumpbrand', PumpBrandsController::class);
Route::resource('pumpList', PumpListController::class);
Route::resource('pumpListSetting', ConfigPumpController::class);
//water pump brand
Route::resource('solarbrand', SolarBrandsController::class);
Route::resource('solarList', SolarListController::class);
Route::resource('solarListSetting', ConfigSolarController::class);
//Invertor brand 
Route::resource('invertorbrand', InvertorBrandController::class);
Route::resource('invertorList', InvertorListController::class);
Route::resource('invertorListSetting', ConfigInvertorController::class);
//accessories
Route::resource('accessories', AccessoriesListController::class);
//project 
Route::post('gitprojectdata', [ProjectsController::class,'gitprojectdata']);
Route::resource('project', ProjectsController::class);
Route::get('getSolarWatt/{id}',[ProjectsController::class,'getSolarWatt']);
Route::get('getcity/{id}',[ProjectsController::class,'getcity']);
Route::post('project-analyze',[ProjectsController::class,'analyze']);
Route::get('getIrredation/{id}',[ProjectsController::class,'getIrredation']);
Route::get('/createPdf/{id}', [ProjectsController::class, 'createPDF']);



Route::resource('post', PostController::class);


Route::post('userprojecttt',[ProjectsController::class,'projectbyuser']);





// Start Route for System Management of Water Solar
Route::resource('new_location', GeolocationController::class);
Route::resource('irradiation', IrradiationController::class);
Route::get('irridation', [IrradiationController::class,'irridation']);
// End Routes of System Management of Water Soalr

//datasheet

Route::get('pv-module', [DatasheetController::class,'pvModule']);
Route::post('pump', [DatasheetController::class,'pump']);
Route::post('controller', [DatasheetController::class,'controller']);
Route::post('accessoriesdownload', [DatasheetController::class,'accessoriesdownload']);
Route::post('solar', [DatasheetController::class,'solar']);
Route::post('getStructure', [DatasheetController::class,'structureDownload']);



//for clear cache 
Route::get('/cc', function () {
    $exitCode = Artisan::call('config:cache');
    $exitCode = Cache::flush();
    $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
    return redirect($actual_link);
  });