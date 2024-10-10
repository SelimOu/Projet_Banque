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

Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum');

Route::get('/users/{id}', [UserController::class, 'show'])->middleware('auth:sanctum');

Route::post('/users', [UserController::class, 'store'])->middleware('auth:sanctum');

Route::put('/users/{id}', [UserController::class, 'update'])->middleware('auth:sanctum');

Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware('auth:sanctum');


Route::post('/register',[UserController::class,'register']);
Route::post('/login', [UserController::class,'login']);
Route::post('/logout', [UserController::class,'logout'])->middleware('auth:sanctum');