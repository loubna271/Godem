import React from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import Layout from '../Components/Layout';
import Footer from '../Components/Footer';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminConcoursAnnonce = () => {
    const { concoursAnnonce } = usePage().props;

    const handleEdit = (id) => {
        router.get(`/admin/concours-annonce/${id}/edit`);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Supprimer ce concours ?',
            text: 'Cette action est irréversible.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/concours-annonce/${id}`, {
                    onSuccess: () => {
                        Swal.fire('Supprimé !', 'Le concours a été supprimé.', 'success');
                    },
                    onError: () => {
                        Swal.fire('Erreur !', 'Une erreur est survenue.', 'error');
                    },
                });
            }
        });
    };

    return (
        <Layout>
            <div className="p-6 max-w-6xl mx-auto pt-24">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-extrabold text-[#D3D141]">
                        Gestion des concours annoncés
                    </h1>
                    {/* Bouton Ajouter un concours */}
                    <Link 
                        href="/admin/concours-annonce/create" 
                        className="flex items-center gap-2 bg-[#9674C3] hover:bg-[#7a5b9d] text-white px-4 py-2 rounded-lg transition duration-200"
                    >
                        <FaPlus /> Ajouter un concours
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {concoursAnnonce.map((concours) => (
                        <div
                            key={concours.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                        >
                            {concours.logo && (
                                <img
                                    src={`/images/${concours.logo}`}
                                    alt={concours.nom}
                                    className="w-full h-48 object-contain"
                                />
                            )}
                            <div className="p-4 flex-grow">
                                <h2 className="text-xl font-semibold text-gray-800">{concours.nom}</h2>
                                <p className="text-gray-600">{concours.date}</p>
                                <p className="text-gray-600">{concours.lieu}</p>
                            </div>

                            {concours.lien && (
                                <div className="p-4 bg-gray-100">
                                    <a
                                        href={concours.lien}
                                        target="_blank"
                                        className="bg-[#9674C3] text-white px-4 py-2 rounded hover:bg-blue-600 block text-center mb-2"
                                        rel="noopener noreferrer"
                                    >
                                        Site du concours
                                    </a>
                                </div>
                            )}

                            <div className="flex justify-between items-center bg-gray-100 p-2">
                                <button
                                    onClick={() => handleEdit(concours.id)}
                                    className="text-yellow-600 hover:text-yellow-800 flex items-center gap-1 text-sm"
                                >
                                    <FaEdit /> Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(concours.id)}
                                    className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                                >
                                    <FaTrash /> Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </Layout>
    );
};

export default AdminConcoursAnnonce;