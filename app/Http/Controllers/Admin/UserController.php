<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('AdminUsers', [
            'users' => User::select('id', 'name', 'email', 'created_at')->get()
        ]);
    }
    public function create()
    {
        return Inertia::render('AdminAddUsers');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ], [
            'email.unique' => 'Cet email est déjà utilisé par un autre utilisateur',
            'password.min' => 'Le mot de passe doit contenir au moins 8 caractères',
            'password.confirmed' => 'La confirmation du mot de passe ne correspond pas'
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->back()->with('success', true);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->back();
    }
}