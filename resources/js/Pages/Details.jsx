import React from 'react';
import Layout from '../Components/Layout';
import Footer from '../Components/Footer';

const Details = ({ etablissement }) => {
    return (
        <Layout>
            {/* Conteneur principal en Flex pour aligner à gauche et à droite */}
            <div className="flex flex-col lg:flex-row gap-8 mx-auto mt-16">
                
                {/* Détail de l'établissement (à gauche) */}
                <div className="whitespace-pre-line max-w-4xl w-full lg:w-[75%] p-6 bg-white shadow-md rounded-lg">
                    <img 
                        src={`/images/${etablissement.logo_ecole}`} 
                        alt={`Logo de ${etablissement.nom_universite}`} 
                        className="w-100 h-64 mx-auto object-contain bg-white p-4"
                        onError={(e) => (e.target.src = "/images/default-logo.png")} 
                    />
                    <h1 className="text-2xl sm:text-3xl font-bold mt-4">{etablissement.nom_universite}</h1>
<p className="text-sm sm:text-base text-gray-600 mt-2 ">{etablissement.description}</p>

<ul className="mt-4 space-y-2">
    <li className="text-sm sm:text-base"><strong>Ville:</strong> {etablissement.ville}</li>
    <li className="text-sm sm:text-base"><strong>Domaine:</strong> {etablissement.domaine}</li>
    <li className="text-sm sm:text-base"><strong>Type:</strong> {etablissement.type}</li>
    <li className="text-sm sm:text-base"><strong>Type Baccalauréat:</strong> {etablissement.type_baccalaureat}</li>
    <li className="text-sm sm:text-base"><strong>Concours:</strong> {etablissement.concours}</li>
    <li className="text-sm sm:text-base"><strong>Description du concours:</strong> {etablissement.concours_desc}</li>
    <li className="text-sm sm:text-base"><strong>Années d'étude:</strong> {etablissement.nbre_annee_etude}</li>
    <li>
        <a 
            href={etablissement.lien_etablissement} 
            target="_blank" 
            className="text-sm sm:text-base text-blue-500 underline"
        >
            Site officiel
        </a>
    </li>
</ul>

                </div>

                {/* Section "Nos Réalisations" (à droite) */}
                <div id="nos-realisations" 
     className=" mt-16 w-full lg:w-[25%] bg-[#F5E9FB] p-6 flex flex-col items-center justify-start 
                max-h-screen 
                  overflow-y-auto sticky top-0 self-start hidden lg:block ">
                    {/* Titre dans un cadre coloré */}
                    <div className="bg-[#9674C3] p-4 shadow-lg mb-6 w-full text-center">
                        <h2 className="text-2xl font-bold text-white">Nos Réalisations</h2>
                    </div>

                    {/* Grille des réalisations */}
                    <div className="grid grid-cols-1 gap-6 w-full">
                        {[1, 2, 3, 4].map((index) => (
                            <div key={index} className="animate-fade-in-up transform transition-all duration-500 hover:scale-105">
                                <img
                                    src={`/images/realisation${index}.png`}
                                    alt={`Réalisation ${index}`}
                                    className="w-full h-auto rounded-lg shadow-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </Layout>
    );
};

export default Details;
