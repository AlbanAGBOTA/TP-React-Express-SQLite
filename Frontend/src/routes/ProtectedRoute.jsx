// import { Navigate, Outlet } from "react-router";
// import { useAuth } from "../context/AuthContext";

// function ProtectedRoute() {
//     const { estConnecte, chargement } = useAuth();

//     // Attendre la restauration de la session
//     if (chargement) {
//         return <p>Chargement...</p>;
//     }

//     // Si l'utilisateur n'est pas connecté, redirection
//     if (!estConnecte) {
//         return <Navigate to="/connexion" replace />;
//     }
//     // Si l'utilisateur est connecté, afficher la page demandée
//     return <Outlet />;
// }
// export default ProtectedRoute;



import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ roleRequis }) {
    const { utilisateur, estConnecte, chargement } = useAuth();

    // Attendre la restauration de la session
    if (chargement) {
        return <p>Chargement...</p>;
    }

    // Vérifier si l'utilisateur est connecté
    if (!estConnecte) {
        return <Navigate to="/connexion" replace />;
    }

    // Vérifier si son rôle correspond au rôle requis
    if (roleRequis && utilisateur?.role !== roleRequis) {
        return <Navigate to="/" replace />;
    }

    // Autoriser l'accès à la route demandée
    return <Outlet />;
}

export default ProtectedRoute;
