<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

/**
 * @OA\Info(title="User API", version="1.0.0")
 * @OA\Tag(name="User", description="Operations related to users")
 */
class UserController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/register",
     *     summary="Register a new user",
     *     tags={"User"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","email","password","password_confirmation"},
     *             @OA\Property(property="name", type="string", example="Test User"),
     *             @OA\Property(property="email", type="string", format="email", example="test@example.com"),
     *             @OA\Property(property="password", type="string", example="password123"),
     *             @OA\Property(property="password_confirmation", type="string", example="password123"),
     *         )
     *     ),
     *     @OA\Response(response=201, description="User registered successfully"),
     *     @OA\Response(response=422, description="Validation error"),
     * )
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json($user, 201);
    }

    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="Login a user",
     *     tags={"User"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", format="email", example="test@example.com"),
     *             @OA\Property(property="password", type="string", example="password123"),
     *         )
     *     ),
     *     @OA\Response(response=200, description="User logged in successfully"),
     *     @OA\Response(response=401, description="Invalid credentials"),
     * )
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!auth()->attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = auth()->user();
        $token = $user->createToken('MyApp')->plainTextToken;

        return response()->json(['token' => $token]);
    }

    /**
     * @OA\Get(
     *     path="/api/users",
     *     summary="Get all users",
     *     tags={"User"},
     *     @OA\Response(response=200, description="List of users"),
     * )
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * @OA\Get(
     *     path="/api/users/{id}",
     *     summary="Get user by ID",
     *     tags={"User"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="User found"),
     *     @OA\Response(response=404, description="User not found"),
     * )
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    /**
     * @OA\Put(
     *     path="/api/users/{id}",
     *     summary="Update a user",
     *     tags={"User"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","email"},
     *             @OA\Property(property="name", type="string", example="Updated Name"),
     *             @OA\Property(property="email", type="string", format="email", example="updatedemail@example.com"),
     *             @OA\Property(property="password", type="string", example="newpassword123"),
     *             @OA\Property(property="password_confirmation", type="string", example="newpassword123"),
     *         )
     *     ),
     *     @OA\Response(response=200, description="User updated successfully"),
     *     @OA\Response(response=404, description="User not found"),
     *     @OA\Response(response=422, description="Validation error"),
     * )
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json($user);
    }

    /**
     * @OA\Delete(
     *     path="/api/users/{id}",
     *     summary="Delete a user",
     *     tags={"User"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=204, description="User deleted successfully"),
     *     @OA\Response(response=404, description="User not found"),
     * )
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(null, 204);
    }
}
