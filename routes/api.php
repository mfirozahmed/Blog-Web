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


Route::get('/home', 'HomeController@index');

Route::post('/auth/login', 'Api\AuthController@login');
Route::post('/auth/register', 'Api\AuthController@register');


Route::get('/posts/user/{id}', 'Api\PostsController@myPost');
Route::apiResource('posts', 'Api\PostsController');
Route::apiResource('comments', 'Api\CommentsController');
Route::apiResource('profiles', 'Api\ProfilesController');