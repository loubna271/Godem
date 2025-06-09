import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Layout from '../Components/Layout';
import Footer from '../Components/Footer';

const AdminAddBourses = () => {
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        lien: '',
        logo: null,
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
        const data = new FormData();
        data.append('nom', formData.nom);
        data.append('description', formData.description);
        data.append('lien', formData.lien);
        if (formData.logo) {
            data.append('logo', formData.logo);
        }

        router.post('/admin/bourses', data);
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto pt-24 p-6">
                <h1 className="text-3xl font-bold text-center text-[#D3D141] mb-8">Ajouter une bourse</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
                    <div>
                        <label className="block font-semibold mb-1">Nom de la bourse</label>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 h-32"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Lien (facultatif)</label>
                        <input
                            type="url"
                            name="lien"
                            value={formData.lien}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Logo (facultatif)</label>
                        <input
                            type="file"
                            name="logo"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#D3D141] text-white font-semibold px-6 py-2 rounded hover:bg-yellow-500"
                    >
                        Ajouter
                    </button>
                </form>
            </div>
            <Footer />
        </Layout>
    );
};

export default AdminAddBourses;
