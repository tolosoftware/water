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

//setting
Route::resource('uom', UomController::class);
Route::resource('cabletype', CableTypeController::class);
Route::resource('accessoriestype', AccessoriesTypeController::class);

//water pump brand
Route::resource('pumpbrand', PumpBrandsController::class);
Route::resource('solarbrand', SolarBrandsController::class);
//accessories
Route::resource('accessories', AccessoriesListController::class);

// Start Route for System Management of Water Solar
Route::resource('new_location', GeolocationController::class);
Route::resource('irradiation', IrradiationController::class);
// End Routes of System Management of Water Soalr

