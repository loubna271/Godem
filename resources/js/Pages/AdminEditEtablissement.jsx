import React from 'react';
import { useForm, router } from '@inertiajs/react';
import Layout from '../Components/Layout';
import Footer from '../Components/Footer';

const AdminEditEtablissement = ({ etablissement }) => {
    const { data, setData, processing, errors } = useForm({
        nom_universite: etablissement.nom_universite,
        domaine: etablissement.domaine,
        ville: etablissement.ville,
        type: etablissement.type,
        type_baccalaureat: etablissement.type_baccalaureat,
        concours: etablissement.concours,
        nbre_annee_etude: etablissement.nbre_annee_etude,
        concours_desc: etablissement.concours_desc,
        description: etablissement.description,
        lien_etablissement: etablissement.lien_etablissement,
        logo_ecole: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('nom_universite', data.nom_universite);
        formData.append('domaine', data.domaine);
        formData.append('ville', data.ville);
        formData.append('type', data.type);
        formData.append('type_baccalaureat', data.type_baccalaureat);
        formData.append('concours', data.concours);
        formData.append('nbre_annee_etude', data.nbre_annee_etude);
        formData.append('concours_desc', data.concours_desc);
        formData.append('description', data.description);
        formData.append('lien_etablissement', data.lien_etablissement);
    
        if (data.logo_ecole) {
            formData.append('logo_ecole', data.logo_ecole);
        }
    
        router.post(`/admin/etablissements/${etablissement.id}`, formData, {
            forceFormData: true,
            onSuccess: () => console.log('Établissement modifié avec succès!'),
        });
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded shadow pt-12">
                <h2 className="text-2xl font-bold mb-4 text-center">Modifier l'établissement</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Nom de l'université</label>
                        <input
                            type="text"
                            value={data.nom_universite}
                            onChange={(e) => setData('nom_universite', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.nom_universite && <div className="text-red-500 text-sm">{errors.nom_universite}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Domaine</label>
                        <input
                            type="text"
                            value={data.domaine}
                            onChange={(e) => setData('domaine', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.domaine && <div className="text-red-500 text-sm">{errors.domaine}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Ville</label>
                        <input
                            type="text"
                            value={data.ville}
                            onChange={(e) => setData('ville', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.ville && <div className="text-red-500 text-sm">{errors.ville}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Type</label>
                        <select
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="Privée">Privée</option>
                            <option value="Publique">Publique</option>
                            <option value="Semi-Publique">Semi-Publique</option>
                        </select>
                        {errors.type && <div className="text-red-500 text-sm">{errors.type}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Type de baccalauréat</label>
                        <input
                            type="text"
                            value={data.type_baccalaureat}
                            onChange={(e) => setData('type_baccalaureat', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.type_baccalaureat && <div className="text-red-500 text-sm">{errors.type_baccalaureat}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Concours</label>
                        <select
                            value={data.concours}
                            onChange={(e) => setData('concours', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="oui">Oui</option>
                            <option value="non">Non</option>
                        </select>
                        {errors.concours && <div className="text-red-500 text-sm">{errors.concours}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Nombre d'années d'études</label>
                        <input
                            type="number"
                            value={data.nbre_annee_etude}
                            onChange={(e) => setData('nbre_annee_etude', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.nbre_annee_etude && <div className="text-red-500 text-sm">{errors.nbre_annee_etude}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Description concours</label>
                        <textarea
                            value={data.concours_desc}
                            onChange={(e) => setData('concours_desc', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.concours_desc && <div className="text-red-500 text-sm">{errors.concours_desc}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Lien de l'établissement</label>
                        <input
                            type="url"
                            value={data.lien_etablissement}
                            onChange={(e) => setData('lien_etablissement', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.lien_etablissement && <div className="text-red-500 text-sm">{errors.lien_etablissement}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Logo (laisser vide si inchangé)</label>
                        <input
                            type="file"
                            onChange={(e) => setData('logo_ecole', e.target.files[0])}
                            className="w-full"
                        />
                        {errors.logo_ecole && <div className="text-red-500 text-sm">{errors.logo_ecole}</div>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        {processing ? 'Modification en cours...' : 'Modifier'}
                    </button>
                </form>
            </div>
            <Footer />
        </Layout>
    );
};

export default AdminEditEtablissement;