<?php

use Illuminate\Http\Request;
use App\Http\Controllers\TaskController;

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

Route::get('tasks', 'TaskController@index');

Route::get('tasks/{task}', 'TaskController@show');

Route::post('tasks', 'TaskController@create');

Route::post('stats', 'StatsController@index');
