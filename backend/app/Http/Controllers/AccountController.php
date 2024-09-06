<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use App\Models\Account;
use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use App\Http\Resources\AccountResource;
use Illuminate\Http\Request;


class AccountController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/accounts",
     *     summary="List all accounts",
     *     @OA\Response(
     *         response=200,
     *         description="A list of accounts",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Account")
     *         )
     *     )
     * )
     */
    public function index()
    {
        $accounts = Account::all();
        return AccountResource::collection($accounts);
    }

    /**
     * @OA\Post(
     *     path="/api/accounts",
     *     summary="Create a new account",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"user_id","type","source","amount","date"},
     *             @OA\Property(property="user_id", type="integer"),
     *             @OA\Property(property="type", type="string"),
     *             @OA\Property(property="source", type="string"),
     *             @OA\Property(property="amount", type="number", format="float"),
     *             @OA\Property(property="date", type="string", format="date")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Account created",
     *         @OA\JsonContent(ref="#/components/schemas/Account")
     *     )
     * )
     */
    public function store(StoreAccountRequest $request)
    {
        $user = Auth::user();
        $accounts = Account::create([
            
            'user_id'=>$user->id,
            'type'=>$request->type,
            'source'=>$request->source,
            'amount'=>$request->amount,
            'date'=>$request->date,
        ]
        );
        return $accounts;
    }

    /**
     * @OA\Get(
     *     path="/api/accounts/{id}",
     *     summary="Get an account by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Account details",
     *         @OA\JsonContent(ref="#/components/schemas/Account")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Account not found"
     *     )
     * )
     */
    public function show($id)
    {
        $accounts = Account::find($id);
        return AccountResource::make($accounts);
    }

    /**
     * @OA\Put(
     *     path="/api/accounts/{id}",
     *     summary="Update an account",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"user_id","type","source","amount","date"},
     *             @OA\Property(property="user_id", type="integer"),
     *             @OA\Property(property="type", type="string"),
     *             @OA\Property(property="source", type="string"),
     *             @OA\Property(property="amount", type="number", format="float"),
     *             @OA\Property(property="date", type="string", format="date")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Account updated",
     *         @OA\JsonContent(ref="#/components/schemas/Account")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Account not found"
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        $accounts = Account::find($id);
        $request->validate([
            'type' => 'required',
            'source' => 'required',
            'amount' => 'required',
            'date' => 'required',
        ]);
        $accounts->update($request->all()); 
    }

    /**
     * @OA\Delete(
     *     path="/api/accounts/{id}",
     *     summary="Delete an account",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Account deleted"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Account not found"
     *     )
     * )
     */
    public function destroy(String $id)
    {
        $accounts = Account::find($id);
        $accounts->delete();
        return response(null,204);
    }
}
