import React from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '../Components/Layout'; // Assure-toi que le chemin du Layout est correct
import Footer from '../Components/Footer'; // Assure-toi que le chemin du Footer est correct

const ConcoursAnnonce = () => {
    const { concoursAnnonce } = usePage().props; // Récupère les concours depuis Inertia

    return (
        <Layout>
            <div className="p-6 max-w-6xl mx-auto pt-24">
                <h1 className="text-3xl font-extrabold text-center text-[#D3D141] mb-6">
                    Découvrez les concours proposés
                </h1>
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
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="text-xl font-semibold text-gray-800">{concours.nom}</h2>
                                <p className="text-gray-600 mt-2">{concours.date}</p>
                                <p className="text-gray-600">{concours.lieu}</p>
                            </div>
                            {concours.lien && (
                                <div className="p-4 bg-gray-100 mt-auto">
                                    <a
                                        href={concours.lien}
                                        target="_blank"
                                        className="bg-[#9674C3] text-white px-4 py-2 rounded hover:bg-blue-600 block text-center"
                                        rel="noopener noreferrer"
                                    >
                                        Site d'inscription au concours
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </Layout>
    );
};

export default ConcoursAnnonce;
