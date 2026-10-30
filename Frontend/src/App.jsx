import "./App.css";
import { Route, Routes } from "react-router";
import Produit from "./Composants/Produit";
import Accueil from "./Composants/Accueil";
import Connexion from "./Composants/Connexion";
import Layout from "./Composants/Layout";
import Inscription from "./Composants/Inscription";
import Panier from "./Composants/Panier";
import ProtectedRoute from "./Composants/ProtectedRoute";
import Catalogue from "./Composants/Catalogue";

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
