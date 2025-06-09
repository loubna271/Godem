import React, { useState } from "react";
import { usePage, Link, router } from "@inertiajs/react";
import Layout from '../Components/Layout';
import Footer from '../Components/Footer';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash,FaPlus} from 'react-icons/fa';  

const AdminEtablissements = () => {
    const { etablissements } = usePage().props;

    const [searchTerm, setSearchTerm] = useState({
        nom: "",
        ville: "",
        domaine: "",
        type: ""
    });

    const filteredEtablissements = etablissements.filter((etablissement) => {
        return (
            etablissement.nom_universite.toLowerCase().includes(searchTerm.nom.toLowerCase()) &&
            etablissement.ville.toLowerCase().includes(searchTerm.ville.toLowerCase()) &&
            etablissement.domaine.toLowerCase().includes(searchTerm.domaine.toLowerCase()) &&
            etablissement.type.toLowerCase().includes(searchTerm.type.toLowerCase())
        );
    });

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
                router.delete(`/admin/etablissements/${id}`, {
                    onSuccess: () => {
                        Swal.fire('Supprimé !', 'L’établissement a été supprimé.', 'success');
                        // Optionnel : rafraîchir la page ou retirer l'élément localement
                        // window.location.reload(); 
                    },
                    onError: () => {
                        Swal.fire('Erreur !', 'Une erreur est survenue.', 'error');
                    }
                });
            }
        });
    };
    

    return (
        <Layout>
            <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-[75%]">
                <div className="flex justify-between items-center mb-6 mt-16">
                        <h1 className="text-xl md:text-3xl text-[#9674C3] font-bold text-center">Gestion des Établissements</h1>
                        {/* Bouton Ajouter un établissement */}
                        <Link 
                            href="/admin/etablissements/create" 
                            className="flex items-center gap-2 bg-[#9674C3] hover:bg-[#7a5b9d] text-white px-4 py-2 rounded-lg transition duration-200"
                        >
                            <FaPlus /> Ajouter un établissement
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-6 justify-center">
                        <input type="text" placeholder="Nom de l'établissement" value={searchTerm.nom} onChange={(e) => setSearchTerm({ ...searchTerm, nom: e.target.value })} className="p-2 border rounded-md w-full sm:w-1/4" />
                        <input type="text" placeholder="Ville" value={searchTerm.ville} onChange={(e) => setSearchTerm({ ...searchTerm, ville: e.target.value })} className="p-2 border rounded-md w-full sm:w-1/4" />
                        <input type="text" placeholder="Domaine" value={searchTerm.domaine} onChange={(e) => setSearchTerm({ ...searchTerm, domaine: e.target.value })} className="p-2 border rounded-md w-full sm:w-1/4" />
                        <input type="text" placeholder="Type" value={searchTerm.type} onChange={(e) => setSearchTerm({ ...searchTerm, type: e.target.value })} className="p-2 border rounded-md w-full sm:w-1/4" />
                        
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {filteredEtablissements.length > 0 ? (
                            filteredEtablissements.map((etablissement) => (
                                <div key={etablissement.id} className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col justify-between">
  <Link href={`/etablissements/${etablissement.id}`}>
    <img
      src={`/images/${etablissement.logo_ecole}`}
      alt={`Logo de ${etablissement.nom_universite}`}
      className="w-full aspect-[4/3] object-contain bg-gray-100 h-32 sm:h-16 md:h-auto"
      onError={(e) => (e.target.src = "/images/default-logo.png")}
    />
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-800">{etablissement.nom_universite}</h2>
      <p className="text-sm text-gray-600"><strong>Domaine :</strong> {etablissement.domaine}</p>
      <p className="text-sm text-gray-600"><strong>Type :</strong> {etablissement.type}</p>
      <p className="text-sm text-gray-600"><strong>Ville :</strong> {etablissement.ville}</p>
    </div>
  </Link>

  {/* Boutons en bas */}
  <div className="flex justify-between px-4 py-2 border-t mt-auto">
    <Link href={`/admin/etablissements/${etablissement.id}/edit`} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm">
      <FaEdit /> Modifier
    </Link>
    <button
      onClick={() => handleDelete(etablissement.id)}
      className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
    >
      <FaTrash /> Supprimer
    </button>
  </div>
</div>
                                
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Aucun établissement trouvé.</p>
                        )}
                    </div>
                </div>

                <div id="nos-realisations" className="mt-16 w-full lg:w-[25%] bg-[#F5E9FB] p-6 flex flex-col items-center justify-start max-h-screen overflow-y-auto sticky top-0 self-start hidden lg:block">
                    <div className="bg-[#9674C3] p-4 shadow-lg mb-6 w-full text-center">
                        <h2 className="text-2xl font-bold text-white">Nos Réalisations</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 w-full">
                        {[1, 2, 3, 4].map((index) => (
                            <div key={index} className="animate-fade-in-up transform transition-all duration-500 hover:scale-105">
                                <img src={`/images/realisation${index}.png`} alt={`Réalisation ${index}`} className="w-full h-40 sm:h-auto rounded-lg shadow-lg" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </Layout>
    );
};

export default AdminEtablissements;
