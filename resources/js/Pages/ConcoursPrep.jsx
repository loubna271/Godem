import React, { useState } from 'react';
import Layout from '../Components/Layout';
import Footer from '../Components/Footer';

const ConcoursPrep = ({ concours }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredConcours = concours.filter((concour) =>
        concour.nom_ecole.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
        <div className="container mx-auto my-8 px-4  pt-12">
            {/* Titre accrocheur */}
            <h2 className="text-3xl font-extrabold text-center text-[#D3D141] mb-6">
            Explorez les concours des grandes écoles disponibles pour vous.
            </h2>

            {/* Barre de recherche */}
            <div className="mb-6 max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="Rechercher une école..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Grille des concours filtrés */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredConcours.map((concour) => (
                    <div key={concour.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
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
                        <div className="p-4 bg-gray-100">
                            <a
                                href={concour.lien_pdf}
                                className="bg-[#9674C3] text-white px-4 py-2 rounded hover:bg-blue-600 block text-center"
                                download
                            >
                                Télécharger le PDF
                            </a>
                        </div>
                    </div>
                ))}
                {filteredConcours.length === 0 && (
                    <p className="col-span-full text-center text-gray-500">Aucun concours trouvé pour ce nom d’école.</p>
                )}
            </div>
        </div>
            <Footer/>
        </Layout>
    );
};

export default ConcoursPrep;
