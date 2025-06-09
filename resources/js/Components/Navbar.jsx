import React, { useState, useEffect } from "react";
import { Link, usePage,router} from "@inertiajs/react";
import { UserCircleIcon, Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
    const { auth } = usePage().props;
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isConcoursOpen, setIsConcoursOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };
    const scrollToFooter = (e) => {
        e.preventDefault();
        const footer = document.getElementById('footer');
        if (footer) {
            footer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            setIsMenuOpen(false);
            
            // Réinitialiser l'URL sans recharger la page
            setTimeout(() => {
                if (window.location.hash) {
                    window.history.replaceState(null, null, window.location.pathname + window.location.search);
                }
            }, 1000);
        }
    };
    return (
        <>
            {/* Barre de navigation */}
            <nav className={`fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-50 transition-all duration-300 ${isScrolled ? "bg-white/50 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
                
                {/* Logo */}
                <div className="flex items-center">
                    <img src="/images/godem.png" alt="Godem Logo" className="h-20 w-auto" />
                </div>

                {/* Menu Desktop */}
                <ul className="hidden md:flex space-x-8 text-gray-700 font-medium text-lg">
                    <li>
                        <Link 
                            href="/" 
                            className="relative hover:text-[#9674C3] transition duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[3px] after:bg-[#B399D4] after:transition-all after:duration-300 hover:after:w-full"
                        >
                            Accueil
                        </Link>
                    </li>
                    
                    {auth.user ? (
                        // Menu pour utilisateur authentifié
                        <>
                            <li>
                                <Link 
                                    href="/admin/etablissements" 
                                    className="relative hover:text-[#9674C3] transition duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[3px] after:bg-[#B399D4] after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    Établissements
                                </Link>
                            </li>
                            <li className="relative">
                                <button
                                    onClick={() => setIsConcoursOpen(!isConcoursOpen)}
                                    className="relative hover:text-[#9674C3] transition duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[3px] after:bg-[#B399D4] after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    Concours
                                </button>
                                {isConcoursOpen && (
                                    <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 px-4 z-50 min-w-[220px]">
                                        <li>
                                            <Link 
                                                href="/admin/concours-preparation" 
                                                className="block py-1 hover:text-[#9674C3] transition duration-300"
                                            >
                                                Préparation de Concours
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                href="/admin/concours-annonce" 
                                                className="block py-1 hover:text-[#9674C3] transition duration-300"
                                            >
                                                Annonce des Concours
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li>
                                <Link 
                                    href="/admin/bourses" 
                                    className="relative hover:text-[#9674C3] transition duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[3px] after:bg-[#B399D4] after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    Bourses
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/admin/users" 
                                    className="relative hover:text-[#9674C3] transition duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[3px] after:bg-[#B399D4] after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    Utilisateurs
                                </Link>
                            </li>
                            <li>
                            <a 
                            href="#footer" 
                            onClick={scrollToFooter}
                            className="relative hover:text-[#9674C3] transition duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[3px] after:bg-[#B399D4] after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
                        >
                            À propos
                        </a>
                            </li>
                        </>
                    ) : (
                        // Menu pour utilisateur non authentifié
                        <>
                            <li>
                                <Link 
                                    href="/etablissements" 
                                    className="relative hover:text-[#9674C3] transition duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[3px] after:bg-[#B399D4] after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    Établissements
                                </Link>
                            </li>
                            <li className="relative">
                                <button
                                    onClick={() => setIsConcoursOpen(!isConcoursOpen)}
                                    className="relative hover:text-[#9674C3] transition duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[3px] after:bg-[#B399D4] after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    Concours
                                </button>
                                {isConcoursOpen && (
                                    <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 px-4 z-50 min-w-[220px]">
                                        <li>
                                            <Link 
                                                href="/concours-preparation" 
                                                className="block py-1 hover:text-[#9674C3] transition duration-300"
                                            >
                                                Préparation de Concours
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                href="/concours-annonce" 
                                                className="block py-1 hover:text-[#9674C3] transition duration-300"
                                            >
                                                Annonce des Concours
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li>
                                <Link 
                                    href="/bourses" 
                                    className="relative hover:text-[#9674C3] transition duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[3px] after:bg-[#B399D4] after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    Bourses
                                </Link>
                            </li>
                            <li>
                            <a 
                            href="#footer" 
                            onClick={scrollToFooter}
                            className="relative hover:text-[#9674C3] transition duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[3px] after:bg-[#B399D4] after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
                        >
                            À propos
                        </a>
                            </li>
                        </>
                    )}
                </ul>

                {/* Icône de connexion & Menu Mobile */}
                <div className="flex items-center space-x-4">
                    {/* Icône de connexion/déconnexion */}
                    {auth.user ? (
                        <button onClick={handleLogout} className="flex items-center text-gray-600 hover:text-[#B399D4] transition duration-300">
                            <ArrowRightOnRectangleIcon className="h-8 w-8" />
                        </button>
                    ) : (
                        <Link href="/login">
                            <UserCircleIcon className="h-8 w-8 text-gray-600 hover:text-[#B399D4] transition duration-300" />
                        </Link>
                    )}

                    {/* Menu Hamburger (Mobile) */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-gray-700 hover:text-[#9674C3] transition duration-300"
                    >
                        {isMenuOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
                    </button>
                </div>
            </nav>

            {/* Padding pour éviter que le contenu soit caché */}
            <div className="pt-20 md:pt-0"></div>

            {/* Menu Mobile */}
            <div className={`fixed left-0 w-full bg-white/70 backdrop-blur-md z-40 flex flex-col items-center py-10 space-y-6 text-xl text-gray-700 font-medium transition-transform duration-300 md:hidden ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`} style={{ top: "80px" }}>
                <Link href="/" className="hover:text-[#9674C3] transition duration-300">Accueil</Link>
                
                {auth.user ? (
                    // Menu mobile pour utilisateur authentifié
                    <>
                        <Link href="/admin/etablissements" className="hover:text-[#9674C3] transition duration-300">Établissements</Link>
                        <Link href="/admin/concours-preparation" className="hover:text-[#9674C3] transition duration-300">Préparation de Concours</Link>
                        <Link href="/admin/concours-annonce" className="hover:text-[#9674C3] transition duration-300">Annonce des Concours</Link>
                        <Link href="/admin/bourses" className="hover:text-[#9674C3] transition duration-300">Bourses</Link>
                        <Link href="/admin/users" className="hover:text-[#9674C3] transition duration-300">Utilisateurs</Link>
                        <Link href="#footer" className="hover:text-[#9674C3] transition duration-300">À propos</Link>
                    </>
                ) : (
                    // Menu mobile pour utilisateur non authentifié
                    <>
                        <Link href="/etablissements" className="hover:text-[#9674C3] transition duration-300">Établissements</Link>
                         <Link href="/concours-preparation" className="hover:text-[#9674C3] transition duration-300">Préparation de Concours</Link>
                        <Link href="/concours-annonce" className="hover:text-[#9674C3] transition duration-300">Annonce des Concours</Link>
                        <Link href="/bourses" className="hover:text-[#9674C3] transition duration-300">Bourses</Link>
                        <Link href="#footer" className="hover:text-[#9674C3] transition duration-300">À propos</Link>

                    </>
                )}
            </div>
        </>
    );
};

export default Navbar;