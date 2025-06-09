import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Layout from '../Components/Layout';
import Footer from '../Components/Footer';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaSearch, FaPlus } from 'react-icons/fa';

const AdminBourses = () => {
    const { bourses } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: 'Cette action est irréversible.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/bourses/${id}`);
            }
        });
    };

    const handleEdit = (id) => {
        router.visit(`/admin/bourses/${id}/edit`);
    };

    const handleAddBourse = () => {
        router.visit('/admin/bourses/create');
    };

    const filteredBourses = bourses.filter(bourse =>
        bourse.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="p-6 max-w-6xl mx-auto pt-24">
                <h1 className="text-3xl font-extrabold text-center text-[#D3D141] mb-6">Gestion des bourses</h1>
                
                {/* Barre de recherche et bouton Ajouter */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="relative w-full md:w-1/2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher par nom de bourse..."
                            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3D141]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleAddBourse}
                        className="flex items-center justify-center bg-[#D3D141] hover:bg-[#b8b83a] text-white font-bold py-2 px-4 rounded-lg transition duration-200 w-full md:w-auto"
                    >
                        <FaPlus className="mr-2" />
                        Ajouter une bourse
                    </button>
                </div>

                {/* Liste des bourses */}
                <div className="space-y-6">
                    {filteredBourses.length > 0 ? (
                        filteredBourses.map((bourse) => (
                            <div
                                key={bourse.id}
                                className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden relative"
                            >
                                {bourse.logo && (
                                    <img
                                        src={`/images/${bourse.logo}`}
                                        alt={bourse.nom}
                                        className="w-full md:w-1/4 h-auto object-contain p-4"
                                    />
                                )}
                                <div className="p-4 flex flex-col justify-between flex-1">
                                    <div>
                                        <h2 className="text-xl font-semibold">{bourse.nom}</h2>
                                        <p className="text-gray-700 mt-2 whitespace-pre-line">{bourse.description}</p>
                                    </div>
                                    {bourse.lien && (
                                        <a
                                            href={bourse.lien}
                                            target="_blank"
                                            className="text-blue-600 hover:underline mt-4 inline-block"
                                            rel="noopener noreferrer"
                                        >
                                            Voir plus
                                        </a>
                                    )}
                                </div>

                                <div className="absolute top-3 right-3 flex space-x-3">
                                    <button onClick={() => handleEdit(bourse.id)} className="text-blue-600 hover:text-blue-800">
                                        <FaEdit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(bourse.id)} className="text-red-600 hover:text-red-800">
                                        <FaTrash size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Aucune bourse trouvée{searchTerm && ` pour "${searchTerm}"`}</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </Layout>
    );
};

export default AdminBourses;