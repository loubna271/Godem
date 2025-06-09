import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';

const AdminEditBourses = () => {
    const { bourse } = usePage().props;

    const { data, setData, put, errors } = useForm({
        nom: bourse.nom || '',
        description: bourse.description || '',
        lien: bourse.lien || '',
        logo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        put(`/admin/bourses/${bourse.id}`);
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
                    className="bg-[#D3D141] hover:bg-yellow-400 text-white px-4 py-2 rounded"
                >
                    Enregistrer les modifications
                </button>
            </form>
        </div>
    );
};

export default AdminEditBourses;
