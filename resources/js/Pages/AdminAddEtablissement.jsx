import React from 'react';
import { useForm } from '@inertiajs/react';
import Layout from '../Components/Layout';
import Footer from '../Components/Footer';

export default function AdminAddEtablissement() {
    const { data, setData, post, processing, errors } = useForm({
        logo_ecole: null,
        nom_universite: '',
        domaine: '',
        ville: '',
        type: '',
        type_baccalaureat: '',
        concours: '',
        nbre_annee_etude: '',
        concours_desc: '',
        description: '',
        lien_etablissement: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.etablissements.store'));
    };

    return (
        <Layout>
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow pt-20">
            <h2 className="text-2xl font-bold mb-6 text-center">Ajouter un établissement</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                <input
                    type="file"
                    onChange={e => setData('logo_ecole', e.target.files[0])}
                    className="w-full border rounded px-4 py-2"
                />

                <input
                    type="text"
                    placeholder="Nom université"
                    value={data.nom_universite}
                    onChange={e => setData('nom_universite', e.target.value)}
                    className="w-full border rounded px-4 py-2"
                />

                <input
                    type="text"
                    placeholder="Domaine"
                    value={data.domaine}
                    onChange={e => setData('domaine', e.target.value)}
                    className="w-full border rounded px-4 py-2"
                />

                <input
                    type="text"
                    placeholder="Ville"
                    value={data.ville}
                    onChange={e => setData('ville', e.target.value)}
                    className="w-full border rounded px-4 py-2"
                />

                <select
                    value={data.type}
                    onChange={e => setData('type', e.target.value)}
                    className="w-full border rounded px-4 py-2"
                >
                    <option value="">Type</option>
                    <option value="Privée">Privée</option>
                    <option value="Publique">Publique</option>
                    <option value="Semi-Publique">Semi-Publique</option>
                </select>

                <input
                    type="text"
                    placeholder="Type de baccalauréat"
                    value={data.type_baccalaureat}
                    onChange={e => setData('type_baccalaureat', e.target.value)}
                    className="w-full border rounded px-4 py-2"
                />

                <select
                    value={data.concours}
                    onChange={e => setData('concours', e.target.value)}
                    className="w-full border rounded px-4 py-2"
                >
                    <option value="">Concours</option>
                    <option value="oui">Oui</option>
                    <option value="non">Non</option>
                </select>

                <input
                    type="number"
                    placeholder="Nombre d'années d'études"
                    value={data.nbre_annee_etude}
                    onChange={e => setData('nbre_annee_etude', e.target.value)}
                    className="w-full border rounded px-4 py-2"
                />

                <textarea
                    placeholder="Description concours"
                    value={data.concours_desc}
                    onChange={e => setData('concours_desc', e.target.value)}
                    className="w-full border rounded px-4 py-2 h-24"
                />

                <textarea
                    placeholder="Description établissement"
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    className="w-full border rounded px-4 py-2 h-24"
                />

                <input
                    type="url"
                    placeholder="Lien de l’établissement"
                    value={data.lien_etablissement}
                    onChange={e => setData('lien_etablissement', e.target.value)}
                    className="w-full border rounded px-4 py-2"
                />

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                    Enregistrer
                </button>
            </form>
        </div>
        <Footer />
       </Layout>
    );
}
