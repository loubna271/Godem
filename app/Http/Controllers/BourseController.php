<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bourse;
use Inertia\Inertia;

class BourseController extends Controller
{
    public function index()
    {
        $bourses = Bourse::all();
        return Inertia::render('Bourses', [
            'bourses' => $bourses
        ]);
    }
    public function adminIndex()
    {
        $bourses = Bourse::all();
        return Inertia::render('AdminBourses', [
            'bourses' => $bourses
        ]);
    }
    // Affiche le formulaire
public function create()
{
    return Inertia::render('AdminAddBourses');
}

// Enregistre la bourse
public function store(Request $request)
{
    $validated = $request->validate([
        'nom' => 'required|string|max:255',
        'description' => 'required|string',
        'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'lien' => 'nullable|url',
    ]);

    if ($request->hasFile('logo')) {
        $image = $request->file('logo');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images'), $imageName);
        $validated['logo'] = $imageName;
    }

    Bourse::create($validated);

    return redirect()->route('admin.bourses')->with('success', 'Bourse ajoutée avec succès.');
}
  // Fonction destroy pour supprimer une bourse
public function destroy($id)
{
    $bourse = Bourse::findOrFail($id);
    
    // Supprimer le logo s'il existe
    if ($bourse->logo) {
        $oldPath = public_path('images/' . $bourse->logo);
        if (file_exists($oldPath)) {
            unlink($oldPath);
        }
    }

    // Supprimer la bourse de la base de données
    $bourse->delete();

    // Retourner à la liste avec un message de succès
    return redirect()->route('admin.bourses')->with('success', 'Bourse supprimée avec succès.');
}
     // Afficher le formulaire pré-rempli
public function edit($id)
{
    $bourse = Bourse::findOrFail($id);

    return Inertia::render('AdminEditBourses', [
        'bourse' => $bourse
    ]);
}

// Mettre à jour la bourse
public function update(Request $request, $id)
{
    $request->validate([
        'nom' => 'required|string|max:255',
        'description' => 'required|string',
        'lien' => 'nullable|url',
        'logo' => 'nullable|image|max:2048',
    ]);

    $bourse = Bourse::findOrFail($id);
    $bourse->nom = $request->nom;
    $bourse->description = $request->description;
    $bourse->lien = $request->lien;

    if ($request->hasFile('logo')) {
        // Supprimer l'ancien logo
        if ($bourse->logo) {
            $oldPath = public_path('images/' . $bourse->logo);
            if (file_exists($oldPath)) {
                unlink($oldPath);
            }
        }

        $logo = $request->file('logo');
        $logoName = time() . '_' . $logo->getClientOriginalName();
        $logo->move(public_path('images'), $logoName);
        $bourse->logo = $logoName;
    }

    $bourse->save();

    return redirect()->route('admin.bourses')->with('success', 'Bourse mise à jour avec succès.');
}

}
