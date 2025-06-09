<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\EtablissementController;
use App\Http\Controllers\ConcoursPreparationController;
use App\Http\Controllers\BourseController;
use App\Http\Controllers\ConcoursAnnonceController;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;

use Illuminate\Support\Facades\Mail;
use App\Mail\TestMail;

use App\Http\Controllers\Admin\UserController;



Route::middleware(['auth'])->group(function () {
    Route::get('/admin/users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('admin.users');
    Route::delete('/admin/users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('admin.users.destroy');

    Route::get('/admin/users/create', [UserController::class, 'create'])->name('admin.users.create');
    Route::post('/admin/users', [UserController::class, 'store'])->name('admin.users.store');
});
// Login
Route::get('/login', [AuthenticatedSessionController::class, 'create'])
    ->middleware('guest')
    ->name('login');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest');

// Logout
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth');

// Route GET pour afficher le formulaire (celle qui rend votre composant React)
Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])
    ->middleware('guest')
    ->name('password.request');

// Traitement du formulaire (POST)
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware('guest')
    ->name('password.email');

    Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
    ->middleware('guest')
    ->name('password.reset');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->middleware('guest')
    ->name('password.update');



Route::get('/etablissements', [EtablissementController::class, 'index']); 
Route::get('/etablissements/{id}', [EtablissementController::class, 'show']);
Route::get('/bourses', [BourseController::class, 'index'])->name('bourses.index');
Route::get('/concours-preparation', [ConcoursPreparationController::class, 'show'])->name('concours_preparation.index');
Route::get('/concours-annonce', [ConcoursAnnonceController::class, 'index']);
Route::get('/', function () {
    return Inertia::render('HomePage');
});

Route::middleware(['auth'])->group(function () {
Route::get('/admin/etablissements', [EtablissementController::class, 'adminIndex'])->name('admin.etablissements');
Route::get('/admin/etablissements/create', [EtablissementController::class, 'create'])->name('admin.etablissements.create');
Route::post('/admin/etablissements', [EtablissementController::class, 'store'])->name('admin.etablissements.store');
Route::delete('/admin/etablissements/{id}', [EtablissementController::class, 'destroy'])->name('admin.etablissements.destroy');

Route::get('/admin/etablissements/{id}/edit', [EtablissementController::class, 'edit'])->name('admin.etablissements.edit');
Route::put('/admin/etablissements/{id}', [EtablissementController::class, 'update'])->name('admin.etablissements.update');

Route::get('/admin/concours-preparation', [ConcoursPreparationController::class, 'adminIndex'])->name('admin.concours-preparation');
Route::get('/admin/concours-preparation/create', [ConcoursPreparationController::class, 'create'])->name('concours.create');
Route::post('/admin/concours-preparation', [ConcoursPreparationController::class, 'store'])->name('concours.store');
Route::delete('/admin/concours-preparation/{id}', [ConcoursPreparationController::class, 'destroy']);
Route::get('/admin/concours-preparation/{id}/edit', [ConcoursPreparationController::class, 'edit']);
Route::put('/admin/concours-preparation/{id}', [ConcoursPreparationController::class, 'update']);

Route::get('/admin/concours-annonce', [ConcoursAnnonceController::class, 'adminIndex'])->name('admin.concours-annonce.index');
Route::get('/admin/concours-annonce/create', [ConcoursAnnonceController::class, 'create'])->name('admin.concours-annonce.create');
Route::post('/admin/concours-annonce', [ConcoursAnnonceController::class, 'store'])->name('admin.concours-annonce.store');
Route::delete('/admin/concours-annonce/{id}', [ConcoursAnnonceController::class, 'destroy'])->name('admin.concours-annonce.destroy');
Route::get('/admin/concours-annonce/{id}/edit', [ConcoursAnnonceController::class, 'edit'])->name('admin.concours-annonce.edit');
Route::put('/admin/concours-annonce/{id}', [ConcoursAnnonceController::class, 'update'])->name('admin.concours-annonce.update');

Route::get('/admin/bourses', [BourseController::class, 'adminIndex'])->name('admin.bourses');
Route::get('/admin/bourses/create', [BourseController::class, 'create'])->name('admin.bourses.create'); // FORM CREATE
Route::post('/admin/bourses', [BourseController::class, 'store'])->name('admin.bourses.store'); // ENREGISTRER
Route::delete('/admin/bourses/{id}', [BourseController::class, 'destroy'])->name('admin.bourses.destroy');
Route::get('/admin/bourses/{id}/edit', [BourseController::class, 'edit'])->name('admin.bourses.edit');
Route::put('/admin/bourses/{id}', [BourseController::class, 'update'])->name('admin.bourses.update');
});