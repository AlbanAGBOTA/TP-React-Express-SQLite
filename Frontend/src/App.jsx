// import "./App.css";
// import { Route, Routes } from "react-router";
// import Produit from "./pages/backoffice/Produits/Produit";
// import Accueil from "./pages/frontoffice/Accueil/Accueil";
// import Connexion from "./pages/auth/Connexion/Connexion";
// import Layout from "./layouts/Layout";
// import Inscription from "./pages/auth/Inscription/Inscription";
// import Panier from "./pages/frontoffice/Panier/Panier";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import Catalogue from "./pages/backoffice/Produits/Catalogue";

// function App() {
//   return (
//     <div className="layout">
//       <Routes>
//         <Route element={<Layout />}>
//           {/* Les fonctions public a tous */}
//           <Route path="/" element={<Accueil />} />
//           <Route path="/connexion" element={<Connexion />} />
//           <Route path="/inscription" element={<Inscription />} />

//           {/* //Fonctionalité protegée */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/produit" element={<Catalogue />} />
//             <Route path="/produits" element={<Produit />} />
//             {/* <Route path="/recherche" element={<Recherche />} /> */}
//             <Route path="/panier" element={<Panier />} />
//           </Route>
//         </Route>
//       </Routes>
//     </div>
//   );
// }
// export default App;

import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";

// Pages publiques
import Accueil from "./pages/frontoffice/Accueil/Accueil";
import Connexion from "./pages/auth/Connexion/Connexion";
import Inscription from "./pages/auth/Inscription/Inscription";

// Pages client
import Panier from "./pages/frontoffice/Panier/Panier";

// Pages administrateur
import Catalogue from "./pages/backoffice/Produits/Catalogue";
import Produit from "./pages/backoffice/Produits/Produit";
import CataloguePublic from "./pages/frontoffice/Catalogue/CataloguePublic";

function App() {
  return (
    <div className="layout">
      <Routes>
        <Route element={<Layout />}>
          {/* Pages accessibles à tous */}
          <Route path="/" element={<Accueil />} />
          <Route path="/catalogue" element={<CataloguePublic/>} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />

          {/* Pages réservées aux clients connectés */}
          <Route element={<ProtectedRoute roleRequis="client" />}>
            <Route path="/panier" element={<Panier />} />
          </Route>

          {/* Pages réservées aux administrateurs */}
          <Route element={<ProtectedRoute roleRequis="admin" />}>
            <Route path="/admin/produits" element={<Catalogue />} />
            <Route path="/admin/produits/nouveau" element={<Produit />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
