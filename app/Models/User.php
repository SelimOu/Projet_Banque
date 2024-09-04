<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;
/**
 * @OA\Schema(
 *     schema="User",
 *     type="object",
 *     title="User",
 *     description="User model",
 *     required={"name", "email", "password"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="The unique identifier of the user",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="The name of the user",
 *         example="John Doe"
 *     ),
 *     @OA\Property(
 *         property="email",
 *         type="string",
 *         format="email",
 *         description="The email address of the user",
 *         example="john.doe@example.com"
 *     ),
 *     @OA\Property(
 *         property="email_verified_at",
 *         type="string",
 *         format="date-time",
 *         description="The date and time when the email was verified",
 *         example="2023-09-04T12:34:56Z"
 *     ),
 *     @OA\Property(
 *         property="password",
 *         type="string",
 *         description="The hashed password of the user",
 *         example="$2y$10$..."
 *     ),
 *     @OA\Property(
 *         property="remember_token",
 *         type="string",
 *         description="A token to remember the user",
 *         example="abc123"
 *     ),
 *     @OA\Property(
 *         property="two_factor_recovery_codes",
 *         type="array",
 *         description="Two-factor authentication recovery codes",
 *         @OA\Items(type="string"),
 *         example={"code1", "code2"}
 *     ),
 *     @OA\Property(
 *         property="two_factor_secret",
 *         type="string",
 *         description="The secret for two-factor authentication",
 *         example="ABCD1234"
 *     ),
 *     @OA\Property(
 *         property="profile_photo_url",
 *         type="string",
 *         format="url",
 *         description="The URL of the user's profile photo",
 *         example="https://example.com/profile_photo.jpg"
 *     )
 * )
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasProfilePhoto, Notifiable, TwoFactorAuthenticatable;

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
     *         example="name"
     *     )
     * )
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     * @OA\Property(
     *     property="hidden",
     *     type="array",
     *     @OA\Items(
     *         type="string",
     *         description="Attributes that should be hidden in serialization",
     *         example="password"
     *     )
     * )
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     * @OA\Property(
     *     property="appends",
     *     type="array",
     *     @OA\Items(
     *         type="string",
     *         description="Attributes that should be appended to the model's array form",
     *         example="profile_photo_url"
     *     )
     * )
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     * @OA\Property(
     *     property="casts",
     *     type="object",
     *     description="Attributes that should be cast to other types",
     *     @OA\Property(property="email_verified_at", type="string", format="date-time"),
     *     @OA\Property(property="password", type="string", example="hashed")
     * )
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
