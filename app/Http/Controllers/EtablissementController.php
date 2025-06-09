<?php
namespace App\Http\Controllers;

use App\Models\Etablissement;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class EtablissementController extends Controller
{
    public function index()
    {
        return Inertia::render('Etablissements', [
            'etablissements' => Etablissement::select('id', 'logo_ecole', 'nom_universite', 'domaine', 'type', 'ville')->get()
        ]);
    }

    public function adminIndex()
{
    $etablissements = Etablissement::all();

    return Inertia::render('AdminEtablissements', [
        'etablissements' => $etablissements
    ]);
}


    public function show($id)
{
    $etablissement = Etablissement::findOrFail($id);

    return Inertia::render('Details', [
        'etablissement' => $etablissement
    ]);
}

   // Affiche le formulaire
public function create()
{
    return Inertia::render('AdminAddEtablissement');
}

// Enregistre le formulaire
public function store(Request $request)
{
    $request->validate([
        'logo_ecole' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'nom_universite' => 'required|string',
        'domaine' => 'required|string',
        'ville' => 'required|string',
        'type' => 'required|in:Privée,Publique,Semi-Publique',
        'type_baccalaureat' => 'required|string',
        'concours' => 'required|in:oui,non',
        'nbre_annee_etude' => 'required|integer',
        'concours_desc' => 'nullable|string',
        'description' => 'nullable|string',
        'lien_etablissement' => 'nullable|string',
    ]);

    $etablissement = new Etablissement(); // ← tu dois le créer ici

    if ($request->hasFile('logo_ecole')) {
        $file = $request->file('logo_ecole');
        $filename = $file->getClientOriginalName(); // ← pas de timestamp
        $file->move(public_path('images'), $filename);
        $etablissement->logo_ecole = $filename;    }
    

    $etablissement->nom_universite = $request->nom_universite;
    $etablissement->domaine = $request->domaine;
    $etablissement->ville = $request->ville;
    $etablissement->type = $request->type;
    $etablissement->type_baccalaureat = $request->type_baccalaureat;
    $etablissement->concours = $request->concours;
    $etablissement->nbre_annee_etude = $request->nbre_annee_etude;
    $etablissement->concours_desc = $request->concours_desc;
    $etablissement->description = $request->description;
    $etablissement->lien_etablissement = $request->lien_etablissement;

    $etablissement->save();

    return redirect()->route('admin.etablissements')->with('success', 'Établissement ajouté avec succès');
}



public function destroy($id)
{
    $etablissement = Etablissement::findOrFail($id);
    $etablissement->delete();

    return Redirect::back()->with('success', 'Établissement supprimé avec succès.');
}

public function edit($id)
{
    $etablissement = Etablissement::findOrFail($id);
    return Inertia::render('AdminEditEtablissement', [
        'etablissement' => $etablissement
    ]);
}
public function update(Request $request, $id)
{
    $etablissement = Etablissement::findOrFail($id);
    
    \Log::info('Modification établissement ID: ' . $id);
    \Log::info('Données reçues:', $request->all());
    
    $request->validate([
        'nom_universite' => 'required|string|max:255',
        'domaine' => 'required|string|max:255',
        'ville' => 'required|string|max:255',
        'type' => 'required|in:Privée,Publique,Semi-Publique',
        'type_baccalaureat' => 'required|string',
        'concours' => 'required|in:oui,non',
        'nbre_annee_etude' => 'required|integer',
        'concours_desc' => 'required|string',
        'description' => 'required|string',
        'lien_etablissement' => 'required|url',
        'logo_ecole' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    if ($request->hasFile('logo_ecole')) {
        // supprimer l'ancien fichier
        $oldPath = public_path('images/' . $etablissement->logo_ecole);
        if (file_exists($oldPath)) {
            unlink($oldPath);
        }

        $file = $request->file('logo_ecole');
        $fileName = time() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('images'), $fileName);
        $etablissement->logo_ecole = $fileName;
    }

    $etablissement->nom_universite = $request->nom_universite;
    $etablissement->domaine = $request->domaine;
    $etablissement->ville = $request->ville;
    $etablissement->type = $request->type;
    $etablissement->type_baccalaureat = $request->type_baccalaureat;
    $etablissement->concours = $request->concours;
    $etablissement->nbre_annee_etude = $request->nbre_annee_etude;
    $etablissement->concours_desc = $request->concours_desc;
    $etablissement->description = $request->description;
    $etablissement->lien_etablissement = $request->lien_etablissement;
    
    $etablissement->save();

    return redirect()->route('admin.etablissements')->with('success', 'Établissement modifié avec succès.');
}
}
