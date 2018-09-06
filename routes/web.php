<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

// Route::get('/', function () {
//     return view('index');
// })->name('index');

Route::post('/auth/login', 'AjaxLoginController@login');

Route::get('/', 'HomeController@index')->name('home');
Route::get('/sales', 'SalesController@index')->name('sales');
Route::get('/setup', 'SetupController@index')->name('setup');
Route::get('/api/setup', 'SetupController@getSettings');
Route::post('/api/setup', 'SetupController@saveSettings');
Route::get('/api/sales', 'SalesController@getSales');
Route::post('/api/sales', 'SalesController@addSale');
