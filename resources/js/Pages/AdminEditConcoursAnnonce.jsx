import React, { useState } from 'react';
import { useForm,router} from '@inertiajs/react';
import Layout from '../Components/Layout';
import Footer from '../Components/Footer';

const AdminEditConcoursAnnonce = ({ concours }) => {
    const { data, setData, post, processing, errors } = useForm({
        nom: concours.nom,
        date: concours.date,
        lieu: concours.lieu,
        lien: concours.lien,
        logo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('_method', 'PUT'); // Important pour que Laravel accepte la requête POST comme un PUT
        formData.append('nom', data.nom);
        formData.append('date', data.date);
        formData.append('lieu', data.lieu);
        formData.append('lien', data.lien);
    
        if (data.logo) {
            formData.append('logo', data.logo);
        }
    
        router.post(`/admin/concours-annonce/${concours.id}`, formData, {
            forceFormData: true, // pour que Inertia n’encode pas en JSON
            onSuccess: () => console.log('Modifié !'),
        });
    };
    
    

    return (
        <Layout>
            <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded shadow pt-12">
                <h2 className="text-2xl font-bold mb-4 text-center">Modifier l’annonce du concours</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Nom</label>
                        <input
                            type="text"
                            value={data.nom}
                            onChange={(e) => setData('nom', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.nom && <div className="text-red-500 text-sm">{errors.nom}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Date</label>
                        <input
                            type="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.date && <div className="text-red-500 text-sm">{errors.date}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Lieu</label>
                        <input
                            type="text"
                            value={data.lieu}
                            onChange={(e) => setData('lieu', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.lieu && <div className="text-red-500 text-sm">{errors.lieu}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Lien du concours (ou Lien de l'école)</label>
                        <input
                            type="text"
                            value={data.lien}
                            onChange={(e) => setData('lien', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.lien && <div className="text-red-500 text-sm">{errors.lien}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Logo (laisser vide si inchangé)</label>
                        <input
                            type="file"
                            onChange={(e) => setData('logo', e.target.files[0])}
                            className="w-full"
                        />
                        {errors.logo && <div className="text-red-500 text-sm">{errors.logo}</div>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Modifier
                    </button>
                </form>
            </div>
            <Footer />
        </Layout>
    );
};

export default AdminEditConcoursAnnonce;
