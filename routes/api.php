<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AccountController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/account', [AccountController::class,'index'])->name('Productindex');
Route::delete('/account/{post}',[AccountController::class,'destroy'])->name('Productdestroy');
Route::post('/account',[AccountController::class,'store'])->name('Productstore');
Route::put('/account/{post}',[AccountController::class,'update'])->name('Productupdate');
Route::get('/account/{post}',[AccountController::class,'show'])->name('Productshow');