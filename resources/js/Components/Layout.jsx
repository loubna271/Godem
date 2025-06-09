import React from 'react';
import Navbar from './Navbar'; // Importez le composant Navbar

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar /> {/* Ajoutez la navbar ici */}
            <main>{children}</main> {/* Contenu de la page */}
        </div>
    );
};

export default Layout;