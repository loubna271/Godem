import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Layout from '../Components/Layout';

const AdminAddConcoursAnnonce = () => {
    const [formData, setFormData] = useState({
        logo: null,
        nom: '',
        date: '',
        lieu: '',
        lien: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post('/admin/concours-annonce', formData, {
            forceFormData: true,
        });
    };

    return (
        <Layout>
            <div className="max-w-xl mx-auto pt-24 p-4">
                <h1 className="text-2xl font-bold mb-6 text-center text-[#9674C3]">Ajouter un nouveau concours</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Logo (Image)</label>
                        <input
                            type="file"
                            name="logo"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Nom</label>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Lieu</label>
                        <input
                            type="text"
                            name="lieu"
                            value={formData.lieu}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Lien (ou lien de l'école)</label>
                        <input
                            type="url"
                            name="lien"
                            value={formData.lien}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#9674C3] text-white py-2 px-4 rounded hover:bg-purple-700 w-full"
                    >
                        Ajouter le concours
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default AdminAddConcoursAnnonce;
