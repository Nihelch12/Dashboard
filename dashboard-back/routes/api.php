<?php

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



/*Route::group(['prefix'=>'Superadmin', 'middleware'=>['isSuperAdmin','auth']], function(){
    Route::post('/login', 'App\Http\Controllers\API\RegisterController@login')->name('loginn');

});*/

/*Route::group([ 'middleware'=>['isAdmin','auth']], function() {
    Route::post('/login', 'App\Http\Controllers\API\RegisterController@login')->name('loginn');

});
*/
Route::post('/register','App\Http\Controllers\API\RegisterController@register');
Route::post('/login', 'App\Http\Controllers\API\RegisterController@login');
Route::post('/loginn', 'App\Http\Controllers\API\RegisterController@loginn');
Route::get('/user', 'App\Http\Controllers\API\RegisterController@user');
Route::put('/updatestatus', 'App\Http\Controllers\SuperAdminController@UpdateStatus');
Route::post('password/email', 'App\Http\Controllers\API\ForgotPasswordController@sendResetLinkEmail');
Route::post('password/reset', 'App\Http\Controllers\API\ResetPasswordController@reset');

Route::get('/gamelist','App\Http\Controllers\GamesController@displayList');
Route::get('/displayadmins','App\Http\Controllers\SuperAdminController@displayAdmins');
Route::get('/gamerslist','App\Http\Controllers\GamersController@displayGamers');
Route::get('/gameAndr','App\Http\Controllers\GamesController@androidGames');
Route::get('/gameIos','App\Http\Controllers\GamesController@iosGames');
Route::get('/iosv','App\Http\Controllers\GamesController@iosSDK');
Route::get('/andrv','App\Http\Controllers\GamesController@androidSDK');
Route::get('/gamersLC','App\Http\Controllers\GamersController@GamersLineChart');
Route::get('/gamesLC','App\Http\Controllers\GamesController@GamesLineChart');
Route::get('/sdk','App\Http\Controllers\GamesController@BarChart');
Route::get('/geomap','App\Http\Controllers\GamersController@Geo');
Route::get('/duels','App\Http\Controllers\DuelsController@DuelsChart');
Route::get('/transactions','App\Http\Controllers\GamersController@transactions');
Route::get('/editorsList','App\Http\Controllers\EditorsController@displayEditors');
Route::get('/dayline','App\Http\Controllers\TournamentsController@DayLineChart');
Route::get('/monthline','App\Http\Controllers\TournamentsController@MonthLineChart');
Route::get('/weekline','App\Http\Controllers\TournamentsController@WeekLineChart');
