import "./App.css";
import { Route, Routes } from "react-router";
import Produit from "./pages/backoffice/Produits/Produit";
import Accueil from "./pages/frontoffice/Accueil/Accueil";
import Connexion from "./pages/auth/Connexion/Connexion";
import Layout from "./layouts/Layout";
import Inscription from "./pages/auth/Inscription/Inscription";
import Panier from "./pages/frontoffice/Panier/Panier";
import ProtectedRoute from "./routes/ProtectedRoute";
import Catalogue from "./pages/backoffice/Produits/Catalogue";


function App() {
  return (
    <div className="layout">
      <Routes>
        <Route element={<Layout />}>
          {/* Les fonctions public a tous */}
          <Route path="/" element={<Accueil />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />

          {/* //Fonctionalité protegée */}
          <Route element={<ProtectedRoute />}>
            <Route path="/produit" element={<Catalogue />} />
            <Route path="/produits" element={<Produit />} />
            {/* <Route path="/recherche" element={<Recherche />} /> */}
            <Route path="/panier" element={<Panier />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
export default App;
