import React from "react";
import { usePage } from "@inertiajs/react";
import { FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
    const { auth } = usePage().props;

    return (
        <footer id="footer" className="bg-[#9674C3] text-white py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Section About Us */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-[#D3D141]">About Us</h2>
                        <p className="text-sm">
                            GODEM, c'est bien plus qu'un guide, c'est un projet créé par le club JLM ENSAM Casablanca, un club social de l'ENSAM Casablanca. Notre mission ? T'aider à faire les bons choix pour ton futur avec des infos fiables, des conseils pratiques et un accompagnement sur-mesure. Parce que chaque étudiant mérite la meilleure orientation !                 
                        </p>
                    </div>

                    {/* Section Liens Rapides */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-[#D3D141]">Liens Rapides</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="/" className="hover:text-[#B399D4] transition duration-300">Accueil</a></li>
                            
                            {auth.user ? (
                                // Liens pour utilisateur authentifié
                                <>
                                    <li><a href="/admin/etablissements" className="hover:text-[#B399D4] transition duration-300">Établissements</a></li>
                                    <li><a href="/admin/concours-preparation" className="hover:text-[#B399D4] transition duration-300">Préparation de Concours</a></li>
                                    <li><a href="/admin/concours-annonce" className="hover:text-[#B399D4] transition duration-300">Annonces des Concours</a></li>
                                    <li><a href="/admin/bourses" className="hover:text-[#B399D4] transition duration-300">Bourses</a></li>
                                    <li><a href="/admin/users" className="hover:text-[#B399D4] transition duration-300">Utilisateurs</a></li>

                                </>
                            ) : (
                                // Liens pour utilisateur non authentifié
                                <>
                                    <li><a href="/etablissements" className="hover:text-[#B399D4] transition duration-300">Établissements</a></li>
                                    <li><a href="/concours-preparation" className="hover:text-[#B399D4] transition duration-300">Préparation de Concours</a></li>
                                    <li><a href="/concours-annonce" className="hover:text-[#B399D4] transition duration-300">Annonces des Concours</a></li>
                                    <li><a href="/bourses" className="hover:text-[#B399D4] transition duration-300">Bourses</a></li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Section Contact Us */}
                    <div className="ml-4">
                        <h2 className="text-2xl font-bold mb-4 text-[#D3D141]">Contact Us</h2>
                        <div className="text-sm space-y-2">
                            <p className="flex items-center">
                                <FaMapMarkerAlt className="w-5 h-5 mr-2" /> 150 Bd du Nil, Casablanca 20670
                            </p>
                            
                            <p className="flex items-center">
                                <FaEnvelope className="w-5 h-5 mr-2" /> ensamcasajlm@gmail.com
                            </p>
                        </div>
                        <div className="flex space-x-4 mt-4">
                            <a href="https://www.linkedin.com/company/jlm-ensam-casablanca/" target="_blank" rel="noopener noreferrer" className="hover:text-[#B399D4] transition duration-300">
                                <FaLinkedin className="w-6 h-6" />
                            </a>
                            <a href="https://www.instagram.com/godem__ensamc?igsh=cnZhOXY5a29tMTZo" target="_blank" rel="noopener noreferrer" className="hover:text-[#B399D4] transition duration-300">
                                <FaInstagram className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/20 mt-8 pt-4 text-center">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} GODEM. Tous droits réservés. {/*| <a href="/terms" className="hover:text-[#B399D4]">Mentions légales</a> */}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;