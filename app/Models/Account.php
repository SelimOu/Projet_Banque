<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Account",
 *     type="object",
 *     title="Account",
 *     description="Account model",
 *     required={"user_id", "type", "source", "amount", "date"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="The unique identifier of the account",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="user_id",
 *         type="integer",
 *         description="The ID of the user associated with the account",
 *         example=10
 *     ),
 *     @OA\Property(
 *         property="type",
 *         type="string",
 *         description="The type of the account (e.g., savings, checking)",
 *         example="savings"
 *     ),
 *     @OA\Property(
 *         property="source",
 *         type="string",
 *         description="The source of the account funds",
 *         example="salary"
 *     ),
 *     @OA\Property(
 *         property="amount",
 *         type="number",
 *         format="float",
 *         description="The amount in the account",
 *         example=1500.50
 *     ),
 *     @OA\Property(
 *         property="date",
 *         type="string",
 *         format="date",
 *         description="The date of the account entry",
 *         example="2023-09-04"
 *     )
 * )
 */
class Account extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     * @OA\Property(
     *     property="fillable",
     *     type="array",
     *     @OA\Items(
     *         type="string",
     *         description="Attributes that are mass assignable",
     *         example="user_id"
     *     )
     * )
     */
    protected $fillable = [
        'user_id',
        'type',
        'source',
        'amount',
        'date',
    ];
}
