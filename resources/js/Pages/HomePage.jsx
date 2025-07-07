import React , {useState}from "react";
import Lottie from "lottie-react";
import animationData from "/public/lottie/Animation6.json"; // Chemin de ton fichier JSON
import animationData2 from "/public/lottie/animation2.json"; // Chemin de ton fichier JSON
import animationData3 from "/public/lottie/Animation7.json"; // Chemin de ton fichier JSON
import '../Pages/animations.css';
import { Link } from "@inertiajs/react"; // Importez Link depuis Inertia.js
import 'animate.css';



import { FaChevronDown } from "react-icons/fa"; // Icône de flèche corrigée
import Layout from '../Components/Layout';
import Footer from '../Components/Footer';


const HomePage = () => {
    // Tableau des fonctionnalités avec leurs liens respectifs
    const fonctionnalites = [
        { id: 1, image: "/images/fonctionnalite1.png", link: "/concours-preparation" },
        { id: 2, image: "/images/fonctionnalite2.png", link: "/etablissements" },
        { id: 3, image: "/images/fonctionnalite3.png", link: "/concours-annonce" },
        { id: 4, image: "/images/fonctionnalite4.png", link: "/bourses" },
    ];
    // State pour le carrousel
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

   const realisations = [
  {
    image: '/images/realisations1.png',
    titre: "FORUM d'ORIENTATION",
  },
  {
    image: '/images/realisations2.jpeg',
    titre: "PARTICIPATION AU HACKATHON",
  },
  {
    image: '/images/realisations3.jpeg',
    titre: "NOTRE PAGE INSTAGRAM",
  },
  {
    image: '/images/realisations4.jpeg',
    titre: "L'ORIENTATION' À L'ORPHELINAT",
  },
];


   const nextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    setCurrentIndex((prev) => (prev === realisations.length - 1 ? 0 : prev + 1));
};

const prevImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    setCurrentIndex((prev) => (prev === 0 ? realisations.length - 1 : prev - 1));
};


    return (
        <Layout>
            {/* Première section */}
            <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full bg-[#FFF0F5] p-6 relative z-10">
  {/* Texte à gauche */}
  <div className="text-center md:text-left md:w-1/2">
    <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold text-[#9674C3] animate__animated animate__fadeIn animate__duration-500 animate__delay-1s">
      GODEM
    </h1>
    <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold mt-4 text-gray-800 animate__animated animate__fadeIn animate__duration-500 animate__delay-2s">
      Guide d’Orientation des Étudiants Marocains
    </h2>
    <p className="mt-4 text-sm sm:text-lg md:text-xl text-gray-600 animate__animated animate__fadeIn animate__duration-500 animate__delay-3s">
      Votre guide vers un avenir brillant ! Découvrez les meilleures formations, écoles et opportunités au Maroc pour construire votre avenir.
    </p>
  </div>

  {/* Animation Lottie à droite */}
  <div className="md:w-1/2 flex justify-center animate__animated animate__zoomIn animate__duration-700 animate__delay-1s">
    <Lottie 
      animationData={animationData} 
      loop={true} 
      className=" w-[80%] h-[80%]"  // Taille responsive pour Lottie
    />
  </div>

  {/* Flèche en bas pour rediriger vers la section suivante */}
  <a href="#qui-sommes-nous" className="absolute bottom-14 animate-bounce hidden md:block">
  <FaChevronDown className="text-[#9674C3] w-12 h-20" />
</a>
</div>



            {/* Section "Qui sommes-nous ?" */}
            <div id="qui-sommes-nous" className=" flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-6">
                {/* Animation Lottie à gauche */}
                <div className="md:w-1/2 flex justify-center">
                    <Lottie animationData={animationData2} loop={true} className="w-full h-full" />
                </div>

                {/* Texte à droite */}
                <div className="text-center md:text-left md:w-1/2">
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#D3D141] mb-6">
    Qui sommes-nous ?
  </h2>

  <p className="text-base sm:text-lg md:text-xl text-gray-600">
    GODEM, c’est bien plus qu’un guide, c’est un projet créé par le club JLM ENSAM Casablanca,
    un club social de l’ENSAM Casablanca. Notre mission ? T’aider à faire les bons choix pour ton
    futur avec des infos fiables, des conseils pratiques et un accompagnement sur-mesure.
    Parce que chaque étudiant mérite la meilleure orientation !
  </p>
</div>

            </div>

            {/* Nouvelle Section "Nos Réalisations" - Version Carrousel Plein Écran */}
           <div className="py-6">
<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#9674C3] mb-12 text-center">
  Nos Réalisations
</h2></div>

<div id="nos-realisations" className="w-full bg-black">
  <div className="relative w-full overflow-hidden">
    <div
      className="flex transition-transform duration-700 ease-in-out"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {realisations.map((item, index) => (
        <div
          key={index}
          className="w-full md:w-full h-[50vh] md:h-[80vh] relative flex-shrink-0"
        >
          <img
            src={item.image}
            alt={`Réalisation ${index + 1}`}
            className="w-full h-full object-cover"
            draggable="false"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
  <h3 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)] ">
    {item.titre}
  </h3>
</div>

        </div>
      ))}
    </div>

    {/* Flèches */}
    <button
      onClick={prevImage}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center z-20"
    >
      ‹
    </button>
    <button
      onClick={nextImage}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center z-20"
    >
      ›
    </button>

    {/* Points d’indication */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
      {realisations.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
        />
      ))}
    </div>
  </div>
</div>



            {/* Section "Pourquoi Godem ?" */}
            <div id="qui-sommes-nous" className=" flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-6">

                {/* Texte à gauche */}
               <div className="text-center md:text-left md:w-1/2">
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#D3D141] mb-6">
    Pourquoi GODEM ?
  </h2>

  <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
    Ton avenir mérite plus qu’une simple recherche sur Internet ! GODEM, c’est un guide conçu pour te donner des réponses claires, des conseils pertinents et une orientation adaptée à tes ambitions. 
    Avec nous, fini l’incertitude : tu avances avec confiance vers les études qui te correspondent vraiment.
  </p>
</div>

                {/* Animation Lottie à droit */}
                <div className="md:w-1/2 flex justify-center">
                    <Lottie animationData={animationData3} loop={true} className="w-200 h-200" />
                </div>

                
            </div>

            {/* Section "Découvrez nos fonctionnalités" */}
            <div id="fonctionnalites" className="min-h-screen bg-white p-6 flex flex-col items-center justify-center">
                {/* Titre */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#9674C3] mb-12 text-center">
                    Découvrez nos fonctionnalités
                </h2>

                {/* Conteneur pour les images défilantes */}
<div className="w-full overflow-hidden relative">
    <div className="flex animate-scroll-horizontal gap-2">
        {/* Afficher les images avec leurs liens */}
        {[...fonctionnalites, ...fonctionnalites].map((fonctionnalite, index) => (
            <div key={`${fonctionnalite.id}-${index}`} className="flex-shrink-0 w-1/5 p-0.5">
                <Link href={fonctionnalite.link}>
                    <img
                        src={fonctionnalite.image}
                        alt={`Fonctionnalité ${fonctionnalite.id}`}
                        className="w-79 h-64 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                </Link>
            </div>
        ))}
    </div>
</div>

            </div>
            <Footer/>
        </Layout>
    );
};

export default HomePage;