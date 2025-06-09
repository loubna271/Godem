import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Layout from '../Components/Layout';
import Footer from '../Components/Footer';

const AdminEditConcoursPrep = ({ concours }) => {
    const [nomEcole, setNomEcole] = useState(concours.nom_ecole);
    const [domaine, setDomaine] = useState(concours.domaine);
    const [anneeCncrs, setAnneeCncrs] = useState(concours.annee_cncrs);
    const [logo, setLogo] = useState(null);
    const [pdf, setPdf] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('_method', 'put'); // <-- Important pour indiquer à Laravel que c'est un PUT
        formData.append('nom_ecole', nomEcole);
        formData.append('domaine', domaine);
        formData.append('annee_cncrs', anneeCncrs);
        if (logo) formData.append('logo_ecole', logo);
        if (pdf) formData.append('lien_pdf', pdf);
    
        router.post(`/admin/concours-preparation/${concours.id}`, formData, {
            forceFormData: true,
        });
    };
    

    return (
        <Layout>
            <div className="max-w-xl mx-auto my-12 p-8 bg-white shadow rounded">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#D3D141]">Modifier un concours</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold">Nom de l'école</label>
                        <input
                            type="text"
                            value={nomEcole}
                            onChange={(e) => setNomEcole(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Domaine</label>
                        <textarea
                            value={domaine}
                            onChange={(e) => setDomaine(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Année</label>
                        <input
                            type="number"
                            value={anneeCncrs}
                            onChange={(e) => setAnneeCncrs(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Logo (laisser vide pour ne pas changer)</label>
                        <input
                            type="file"
                            onChange={(e) => setLogo(e.target.files[0])}
                            accept="image/*"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Fichier PDF (laisser vide pour ne pas changer)</label>
                        <input
                            type="file"
                            onChange={(e) => setPdf(e.target.files[0])}
                            accept="application/pdf"
                            className="w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#9674C3] text-white px-4 py-2 rounded hover:bg-purple-700 w-full"
                    >
                        Enregistrer les modifications
                    </button>
                </form>
            </div>
            <Footer />
        </Layout>
    );
};

export default AdminEditConcoursPrep;
