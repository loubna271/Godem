import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout';
import Footer from '../Components/Footer';
import { FaUserPlus, FaSave, FaCheckCircle } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';

const AdminAddUsers = () => {
    const { errors } = usePage().props;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccess(false);
        
        router.post('/admin/users', formData, {
            onSuccess: () => {
                setShowSuccess(true);
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                });
                setTimeout(() => setShowSuccess(false), 5000);
            },
            preserveScroll: true
        });
    };

    return (
        <Layout>
            <div className="min-h-screen p-6 bg-gray-50 pt-16">
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 relative">
                    {/* Message de succès */}
                    {showSuccess && (
                        <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                            <div className="flex items-center">
                                <FaCheckCircle className="mr-2 text-green-500" />
                                <p>Utilisateur ajouté avec succès!</p>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-2 mb-6">
                        <FaUserPlus className="text-[#9674C3] text-xl" />
                        <h1 className="text-2xl font-bold text-[#9674C3]">Ajouter un utilisateur</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nom complet
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md ${errors.name ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-[#9674C3] focus:ring focus:ring-[#9674C3] focus:ring-opacity-50`}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <FiAlertCircle className="mr-1" /> {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md ${errors.email ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-[#9674C3] focus:ring focus:ring-[#9674C3] focus:ring-opacity-50`}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <FiAlertCircle className="mr-1" /> {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mot de passe (min. 8 caractères)
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md ${errors.password ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-[#9674C3] focus:ring focus:ring-[#9674C3] focus:ring-opacity-50`}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <FiAlertCircle className="mr-1" /> {errors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                Confirmer le mot de passe
                            </label>
                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#9674C3] focus:ring focus:ring-[#9674C3] focus:ring-opacity-50"
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 bg-[#9674C3] border border-transparent rounded-md font-semibold text-white hover:bg-[#7a5b9d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9674C3] transition"
                            >
                                <FaSave className="mr-2" />
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </Layout>
    );
};

export default AdminAddUsers;