<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AccountController;
use App\Http\Controllers\UserController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/account', [AccountController::class,'index']);
Route::delete('/account/{post}',[AccountController::class,'destroy']);
Route::post('/account',[AccountController::class,'store']);
Route::put('/account/{post}',[AccountController::class,'update']);
Route::get('/account/{post}',[AccountController::class,'show']);

Route::get('/user', [UserController::class,'index']);
Route::delete('/user/{post}',[UserController::class,'destroy']);
Route::post('/user',[UserController::class,'store']);
Route::put('/user/{post}',[UserController::class,'update']);
Route::get('/user/{post}',[UserController::class,'show']);