<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_register_user_successfully()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => $this->faker->unique()->safeEmail(), // Email unique
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['id', 'name', 'email']);
    }

    public function test_register_user_fails_due_to_password_confirmation()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => $this->faker->unique()->safeEmail(), // Email unique
            'password' => 'password123',
            'password_confirmation' => 'wrongpassword',
        ]);

        $response->assertStatus(422);
    }

    public function test_login_user_successfully()
    {
        // Créer un utilisateur avec un email unique
        $user = User::factory()->create([
            'email' => $this->faker->unique()->safeEmail(), // Email unique
            'password' => bcrypt('password123'),
        ]);

        // Connexion avec les informations de l'utilisateur créé
        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['token']);
    }

    public function test_login_fails_with_wrong_credentials()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'nonexistent@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401);
    }

    public function test_fetch_all_users()
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/users');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     '*' => [
                         'id',
                         'name',
                         'email',
                     ]
                 ]);
    }

    public function test_fetch_user_by_id()
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/users/' . $user->id);

        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $user->id,
                     'name' => $user->name,
                     'email' => $user->email,
                 ]);
    }

    public function test_update_user()
{
    $user = User::factory()->create();
    $token = $user->createToken('TestToken')->plainTextToken;

    // Nouveau email à utiliser pour la mise à jour
    $newEmail = 'updatedemail@example.com';

    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->putJson('/api/users/' . $user->id, [
        'name' => 'Updated Name',
        'email' => $newEmail, // Utilisez le nouveau email
        'password' => 'newpassword123',
        'password_confirmation' => 'newpassword123',
    ]);

    $response->assertStatus(200)
             ->assertJson([
                 'name' => 'Updated Name',
                 'email' => $newEmail, // Vérifiez que l'email est le nouveau email
             ]);
}


    public function test_delete_user()
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson('/api/users/' . $user->id);

        $response->assertStatus(204);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}
