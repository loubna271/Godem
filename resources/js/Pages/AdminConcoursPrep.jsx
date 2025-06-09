import React, { useState } from 'react';
import Layout from '../Components/Layout';
import Footer from '../Components/Footer';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminConcoursPrep = ({ concours }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredConcours = concours.filter((concour) =>
        concour.nom_ecole.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Cette action est irréversible !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/concours-preparation/${id}`, {
                    onSuccess: () => {
                        Swal.fire('Supprimé !', 'Le concours a été supprimé.', 'success');
                    },
                    onError: () => {
                        Swal.fire('Erreur !', 'Une erreur est survenue.', 'error');
                    }
                });
            }
        });
    };

    const handleEdit = (id) => {
        router.get(`/admin/concours-preparation/${id}/edit`);
    };

    return (
        <Layout>
            <div className="container mx-auto my-8 px-4 pt-12">
                <h2 className="text-3xl font-extrabold text-center text-[#D3D141] mb-6">
                    Gérer les concours des grandes écoles
                </h2>

                <div className="max-w-md mx-auto space-y-4 mb-6">
    <button
        onClick={() => router.get('/admin/concours-preparation/create')}
        className="w-full bg-[#D3D141] hover:bg-[#bfb231] text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
    >
        + Ajouter un Concours
    </button>

    <input
        type="text"
        placeholder="Rechercher une école..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
    />
</div>

               


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    
                    {filteredConcours.map((concour) => (
                        <div key={concour.id} className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col justify-between">
                            <img
                                src={concour.logo_ecole}
                                alt={concour.nom_ecole}
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                    e.target.src = '/images/realisation1.png';
                                }}
                            />
                            <div className="p-4 flex-grow">
                                <h5 className="text-xl font-bold mb-2">{concour.nom_ecole}</h5>
                                <p className="text-gray-700">Année : {concour.annee_cncrs}</p>
                            </div>

                            <div className="px-4 pb-4">
                                <a
                                    href={concour.lien_pdf}
                                    className="bg-[#9674C3] text-white px-4 py-2 rounded hover:bg-blue-600 block text-center mb-2"
                                    download
                                >
                                    Télécharger le PDF
                                </a>

                                <div className="flex justify-between items-center bg-gray-100 p-2 rounded">
                                    <button
                                        onClick={() => handleEdit(concour.id)}
                                        className="text-yellow-600 hover:text-yellow-800 flex items-center gap-1 text-sm"
                                    >
                                        <FaEdit /> Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDelete(concour.id)}
                                        className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                                    >
                                        <FaTrash /> Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredConcours.length === 0 && (
                        <p className="col-span-full text-center text-gray-500">
                            Aucun concours trouvé pour ce nom d’école.
                        </p>
                    )}
                </div>
            </div>
            <Footer />
        </Layout>
    );
};

export default AdminConcoursPrep;
