<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AccountController;
use App\Http\Controllers\UserController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/account', [AccountController::class,'index'])->middleware('auth:sanctum');
Route::delete('/account/{post}',[AccountController::class,'destroy'])->middleware('auth:sanctum');
Route::post('/account',[AccountController::class,'store'])->middleware('auth:sanctum');
Route::put('/account/{post}',[AccountController::class,'update'])->middleware('auth:sanctum');
Route::get('/account/{post}',[AccountController::class,'show'])->middleware('auth:sanctum');

Route::get('/user', [UserController::class,'index'])->middleware('auth:sanctum');
Route::delete('/user/{post}',[UserController::class,'destroy'])->middleware('auth:sanctum');
Route::post('/user',[UserController::class,'store'])->middleware('auth:sanctum');
Route::put('/user/{post}',[UserController::class,'update'])->middleware('auth:sanctum');
Route::get('/user/{post}',[UserController::class,'show'])->middleware('auth:sanctum');


Route::post('/register',[UserController::class,'register']);
Route::post('/login', [UserController::class,'login']);
Route::post('/logout', [UserController::class,'logout'])->middleware('auth:sanctum');