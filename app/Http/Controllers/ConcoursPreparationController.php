<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ConcoursPrep;
use Inertia\Inertia;

class ConcoursPreparationController extends Controller
{
    public function show()
    {
        // Récupérer tous les concours de préparation
        $concours = ConcoursPrep::all();

        // Ajouter le chemin vers les logos et les PDF
        $concours->map(function ($concoursItem) {
            $concoursItem->logo_ecole = asset('images/' . $concoursItem->logo_ecole); // Chemin complet vers le logo
            $concoursItem->lien_pdf = asset('images/' . $concoursItem->lien_pdf); // Chemin complet vers le PDF
            return $concoursItem;
        });

        // Retourner la page avec Inertia
        return Inertia::render('ConcoursPrep', [
            'concours' => $concours
        ]);
    }

    public function adminIndex()
{
    $concours = ConcoursPrep::all();

    $concours->map(function ($item) {
        $item->logo_ecole = asset('images/' . $item->logo_ecole);
        $item->lien_pdf = asset('images/' . $item->lien_pdf);
        return $item;
    });

    return Inertia::render('AdminConcoursPrep', [
        'concours' => $concours
    ]);
}
public function create()
{
    return Inertia::render('AdminAddConcoursPrep');
}

public function store(Request $request)
{
    $validated = $request->validate([
        'logo_ecole' => 'required|image|mimes:jpeg,png,jpg,svg|max:2048',
        'nom_ecole' => 'required|string|max:255',
        'domaine' => 'required|string',
        'annee_cncrs' => 'required|digits:4|integer|min:2000',
        'lien_pdf' => 'required|file|mimes:pdf|max:5120',
    ]);

    // Stocker les fichiers
    $logoName = time() . '_' . $request->file('logo_ecole')->getClientOriginalName();
    $pdfName = time() . '_' . $request->file('lien_pdf')->getClientOriginalName();

    $request->file('logo_ecole')->move(public_path('images'), $logoName);
    $request->file('lien_pdf')->move(public_path('images'), $pdfName);

    // Créer l'entrée en base de données
    ConcoursPrep::create([
        'logo_ecole' => $logoName,
        'nom_ecole' => $validated['nom_ecole'],
        'domaine' => $validated['domaine'],
        'annee_cncrs' => $validated['annee_cncrs'],
        'lien_pdf' => $pdfName,
    ]);

    return redirect()->route('admin.concours-preparation')->with('success', 'Concours ajouté avec succès.');
}

public function destroy($id)
{
    $concours = ConcoursPrep::findOrFail($id);

    // Supprimer les fichiers du serveur (facultatif, si nécessaire)
    $logoPath = public_path('images/' . $concours->logo_ecole);
    $pdfPath = public_path('images/' . $concours->lien_pdf);

    if (file_exists($logoPath)) {
        unlink($logoPath);
    }

    if (file_exists($pdfPath)) {
        unlink($pdfPath);
    }

    // Supprimer l'enregistrement de la base de données
    $concours->delete();

    return redirect()->back()->with('success', 'Le concours a été supprimé avec succès.');
}

public function edit($id)
{
    $concours = ConcoursPrep::findOrFail($id);

    return Inertia::render('AdminEditConcoursPrep', [
        'concours' => $concours
    ]);
}

public function update(Request $request, $id)
{
    $concours = ConcoursPrep::findOrFail($id);

    $validated = $request->validate([
        'nom_ecole' => 'required|string|max:255',
        'domaine' => 'required|string',
        'annee_cncrs' => 'required|integer',
        'logo_ecole' => 'nullable|image',
        'lien_pdf' => 'nullable|file|mimes:pdf'
    ]);

    // Gérer les fichiers (facultatif : supprimer l'ancien fichier si remplacé)
    if ($request->hasFile('logo_ecole')) {
        $logoName = time() . '_' . $request->file('logo_ecole')->getClientOriginalName();
        $request->file('logo_ecole')->move(public_path('images'), $logoName);
        $concours->logo_ecole = $logoName;
    }

    if ($request->hasFile('lien_pdf')) {
        $pdfName = time() . '_' . $request->file('lien_pdf')->getClientOriginalName();
        $request->file('lien_pdf')->move(public_path('images'), $pdfName);
        $concours->lien_pdf = $pdfName;
    }

    $concours->nom_ecole = $validated['nom_ecole'];
    $concours->domaine = $validated['domaine'];
    $concours->annee_cncrs = $validated['annee_cncrs'];

    $concours->save();

    return redirect('/admin/concours-preparation')->with('success', 'Concours modifié avec succès.');
}

}