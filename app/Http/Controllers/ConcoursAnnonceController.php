<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ConcoursAnnonce;
use Inertia\Inertia;

class ConcoursAnnonceController extends Controller
{
    public function index()
    {
        // Récupère tous les concours
        $concoursAnnonce = ConcoursAnnonce::all();

        // Renvoie la vue Inertia avec les données
        return Inertia::render('ConcoursAnnonce', [
            'concoursAnnonce' => $concoursAnnonce,
        ]);
    }
    public function adminIndex()
{
    $concoursAnnonce = ConcoursAnnonce::all();

    return Inertia::render('AdminConcoursAnnonce', [
        'concoursAnnonce' => $concoursAnnonce,
    ]);
}

public function create()
{
    return Inertia::render('AdminAddConcoursAnnonce');
}

public function store(Request $request)
{
    $request->validate([
        'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        'nom' => 'required|string|max:255',
        'date' => 'required|date',
        'lieu' => 'required|string|max:255',
        'lien' => 'required|url|max:255',
    ]);

    $logoName = time() . '.' . $request->logo->extension();
    $request->logo->move(public_path('images'), $logoName);

    \App\Models\ConcoursAnnonce::create([
        'logo' => $logoName,
        'nom' => $request->nom,
        'date' => $request->date,
        'lieu' => $request->lieu,
        'lien' => $request->lien,
    ]);

    return redirect()->route('admin.concours-annonce.index')->with('success', 'Concours ajouté avec succès');
}
public function destroy($id)
{
    $concours = ConcoursAnnonce::findOrFail($id);

    // Supprimer l'image du dossier public/images si elle existe
    $imagePath = public_path('images/' . $concours->logo);
    if (file_exists($imagePath)) {
        unlink($imagePath);
    }

    $concours->delete();

    return redirect()->back()->with('success', 'Annonce supprimée avec succès.');
}
public function edit($id)
{
    $concours = ConcoursAnnonce::findOrFail($id);
    return Inertia::render('AdminEditConcoursAnnonce', [
        'concours' => $concours,
    ]);
}

public function update(Request $request, $id)
{
    $concours = ConcoursAnnonce::findOrFail($id);
    
    \Log::info('Modification concours ID: ' . $id);
    \Log::info('Données reçues:', $request->all());
    
    $request->validate([
        'nom' => 'required|string|max:255',
        'date' => 'required|date',
        'lieu' => 'required|string|max:255',
        'lien' => 'required|url',
        'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    if ($request->hasFile('logo')) {
        // supprimer l'ancien fichier
        $oldPath = public_path('images/' . $concours->logo);
        if (file_exists($oldPath)) {
            unlink($oldPath);
        }

        $file = $request->file('logo');
        $fileName = time() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('images'), $fileName);
        $concours->logo = $fileName;
    }

    $concours->nom = $request->nom;
    $concours->date = $request->date;
    $concours->lieu = $request->lieu;
    $concours->lien = $request->lien;
    $concours->save();

    return redirect()->route('admin.concours-annonce.index')->with('success', 'Annonce modifiée avec succès.');
}

}
