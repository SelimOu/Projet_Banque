<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Users = User::all();
        return UserResource::collection($Users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $Users = User::create($request->validated());
        return new UserResource($Users);
    
    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $Users = User::find($id);
        return UserResource::make($Users);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {   
        $Users = User::find($id);
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);
        dump($Users);
        $Users->update($request->all());
        return  $Users;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id)
    {
        $Users = User::find($id);
        $Users->delete();
        return response(null,204);
    }
}
