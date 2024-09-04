<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use App\Http\Resources\AccountResource;


class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $accounts = Account::all();
        return AccountResource::collection($accounts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAccountRequest $request)
    {
        $accounts = Account::create($request->validated());
        return new AccountResource($accounts);
    
    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $accounts = Account::find($id);
        return AccountResource::make($accounts);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAccountRequest $request, String $id)
    {
        $accounts->update($request->validate());
        return new AccountResource($id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id)
    {
        $accounts = Account::find($id);
        $accounts->delete();
        return response(null,204);
    }
}
