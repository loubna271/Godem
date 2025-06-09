import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '../Components/Layout';
import Footer from '../Components/Footer';
import { FaSearch } from 'react-icons/fa';

const Bourses = () => {
    const { bourses } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBourses = bourses.filter(bourse =>
        bourse.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-24">
                <h1 className="text-3xl font-extrabold text-center text-[#D3D141] mb-8">
                    Découvrez les bourses proposées
                </h1>

                {/* Barre de recherche */}
                <div className="mb-8">
                    <div className="relative max-w-md mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher une bourse par nom..."
                            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3D141]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Liste des bourses */}
                <div className="space-y-8">
                    {filteredBourses.length > 0 ? (
                        filteredBourses.map((bourse) => (
                            <div
                                key={bourse.id}
                                className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                {bourse.logo && (
                                    <div className="w-full sm:w-1/3 flex items-center justify-center p-4 bg-gray-50">
                                        <img
                                            src={`/images/${bourse.logo}`}
                                            alt={bourse.nom}
                                            className="max-h-32 object-contain"
                                        />
                                    </div>
                                )}
                                <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold mb-2">{bourse.nom}</h2>
                                        <p className="text-gray-700 whitespace-pre-line">{bourse.description}</p>
                                    </div>
                                    {bourse.lien && (
                                        <a
                                            href={bourse.lien}
                                            target="_blank"
                                            className="text-blue-600 hover:underline mt-4 self-start"
                                            rel="noopener noreferrer"
                                        >
                                            Voir plus
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                {searchTerm ? `Aucune bourse trouvée pour "${searchTerm}"` : "Aucune bourse disponible"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </Layout>
    );
};

export default Bourses;