import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
    const { estConnecte, chargement } = useAuth();

    // Attendre la restauration de la session
    if (chargement) {
        return <p>Chargement...</p>;
    }

    // Si l'utilisateur n'est pas connecté, redirection
    if (!estConnecte) {
        return <Navigate to="/connexion" replace />;
    }
    // Si l'utilisateur est connecté, afficher la page demandée
    return <Outlet />;
}
export default ProtectedRoute;
