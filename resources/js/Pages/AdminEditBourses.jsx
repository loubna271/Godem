import React, { useState } from 'react';
import { useForm, usePage, router } from '@inertiajs/react'; // Importe 'router'

const AdminEditBourses = () => {
    const { bourse } = usePage().props;

    const { data, setData, processing, errors } = useForm({ // Ajout de processing pour le bouton
        nom: bourse.nom || '',
        description: bourse.description || '',
        lien: bourse.lien || '',
        logo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT'); // Important pour simuler la méthode PUT
        formData.append('nom', data.nom);
        formData.append('description', data.description);
        formData.append('lien', data.lien);

        if (data.logo) { // N'ajoute le logo que si un nouveau fichier a été sélectionné
            formData.append('logo', data.logo);
        }

        router.post(`/admin/bourses/${bourse.id}`, formData, {
            // forceFormData: true, // Cette ligne est inutile ici car tu utilises FormData
            onSuccess: () => {
                console.log('Bourse mise à jour avec succès!');
                // Tu peux ajouter une redirection ou un message flash ici si tu veux
                // router.visit(route('admin.bourses.index'));
            },
            onError: (errors) => {
                console.error('Erreur de validation:', errors);
                // useForm gère déjà les erreurs automatiqument, donc cela est plus pour le debug
            },
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 pt-24">
            <h1 className="text-2xl font-bold text-center text-[#D3D141] mb-6">Modifier la bourse</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6">
                <div>
                    <label className="block font-medium mb-1">Nom</label>
                    <input
                        type="text"
                        value={data.nom}
                        onChange={(e) => setData('nom', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.nom && <div className="text-red-500 text-sm">{errors.nom}</div>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full border p-2 rounded"
                        rows={5}
                    />
                    {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Lien (facultatif)</label>
                    <input
                        type="url"
                        value={data.lien}
                        onChange={(e) => setData('lien', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.lien && <div className="text-red-500 text-sm">{errors.lien}</div>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Logo (laisser vide pour garder l’actuel)</label>
                    <input
                        type="file"
                        onChange={(e) => setData('logo', e.target.files[0])}
                        className="w-full border p-2 rounded"
                    />
                    {errors.logo && <div className="text-red-500 text-sm">{errors.logo}</div>}
                </div>

                <button
                    type="submit"
                    disabled={processing} // Utilise la variable 'processing' de useForm
                    className="bg-[#D3D141] hover:bg-yellow-400 text-white px-4 py-2 rounded"
                >
                    {processing ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </button>
            </form>
        </div>
    );
};

export default AdminEditBourses;