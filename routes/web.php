<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MoviesController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('app');
});

Route::controller(MoviesController::class)->group(function () {
    Route::post('/movie/get-information', 'getInfo');
    Route::get('/movie/get-movie', 'getMovie');
    Route::post('/movie/create-movie', 'createMovie');
});
