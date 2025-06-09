import React from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import Layout from '../Components/Layout';
import Footer from '../Components/Footer';
import Swal from 'sweetalert2';
import { FaTrash, FaUser, FaPlus } from 'react-icons/fa';

const AdminUsers = () => {
    const { users } = usePage().props;

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Supprimer cet utilisateur?',
            text: "Cette action est irréversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/users/${id}`, {
                    onSuccess: () => {
                        Swal.fire('Supprimé!', "L'utilisateur a été supprimé.", 'success');
                    }
                });
            }
        });
    };

    return (
        <Layout>
            <div className="p-6 max-w-6xl mx-auto pt-24">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                        <FaUser className="text-3xl text-[#9674C3] mr-2" />
                        <h1 className="text-3xl font-extrabold text-[#9674C3]">
                            Liste des Utilisateurs
                        </h1>
                    </div>
                    {/* Bouton Ajouter un utilisateur */}
                    <Link 
                        href="/admin/users/create" 
                        className="flex items-center gap-2 bg-[#9674C3] hover:bg-[#7a5b9d] text-white px-4 py-2 rounded-lg transition duration-200"
                    >
                        <FaPlus /> Ajouter un utilisateur
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#F5E9FB]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#9674C3] uppercase tracking-wider">
                                    Nom
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#9674C3] uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#9674C3] uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {user.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Supprimer"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Aucun utilisateur trouvé
                    </div>
                )}
            </div>
            <Footer />
        </Layout>
    );
};

export default AdminUsers;