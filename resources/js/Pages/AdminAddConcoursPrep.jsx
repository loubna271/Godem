import React, { useState } from 'react';
import Layout from '../Components/Layout';
import Footer from '../Components/Footer';
import { router, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

const AdminAddConcoursPrep = () => {
    const { data, setData, post, reset, errors } = useForm({
        logo_ecole: null,
        nom_ecole: '',
        domaine: '',
        annee_cncrs: '',
        lien_pdf: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/concours-preparation', {
            onSuccess: () => {
                Swal.fire('Succès !', 'Le concours a été ajouté.', 'success');
                reset();
            },
            onError: () => {
                Swal.fire('Erreur', 'Veuillez vérifier les champs.', 'error');
            }
        });
    };

    return (
        <Layout>
            <div className="container mx-auto my-12 px-4 max-w-2xl">
                <h2 className="text-3xl font-bold text-center text-[#D3D141] mb-6">
                    Ajouter un Concours
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Logo de l’école</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('logo_ecole', e.target.files[0])}
                            className="mt-1 block w-full"
                        />
                        {errors.logo_ecole && <p className="text-red-500 text-sm">{errors.logo_ecole}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nom de l’école</label>
                        <input
                            type="text"
                            value={data.nom_ecole}
                            onChange={(e) => setData('nom_ecole', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.nom_ecole && <p className="text-red-500 text-sm">{errors.nom_ecole}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Domaine</label>
                        <textarea
                            value={data.domaine}
                            onChange={(e) => setData('domaine', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.domaine && <p className="text-red-500 text-sm">{errors.domaine}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Année du concours</label>
                        <input
                            type="number"
                            value={data.annee_cncrs}
                            onChange={(e) => setData('annee_cncrs', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.annee_cncrs && <p className="text-red-500 text-sm">{errors.annee_cncrs}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fichier PDF</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setData('lien_pdf', e.target.files[0])}
                            className="mt-1 block w-full"
                        />
                        {errors.lien_pdf && <p className="text-red-500 text-sm">{errors.lien_pdf}</p>}
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-[#9674C3] text-white px-6 py-2 rounded hover:bg-purple-700"
                        >
                            Ajouter le concours
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </Layout>
    );
};

export default AdminAddConcoursPrep;
