import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    useEffect,
} from "react";

// Création du contexte
const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    // Informations de l'utilisateur connecté
    const [utilisateur, setUtilisateur] = useState(null);

    // Indique si la restauration de la session est en cours
    const [chargement, setChargement] = useState(true);

    // Restaurer l'utilisateur au démarrage de l'application
    useEffect(() => {
        try {
            const sauvegarde = localStorage.getItem("utilisateur");
            if (sauvegarde) {
                setUtilisateur(JSON.parse(sauvegarde));
            }
        } catch (error) {
            console.error("Erreur de restauration de session :", error);
            localStorage.removeItem("utilisateur");
        } finally {
            setChargement(false);
        }
    }, []);

    // Fonction de connexion
    const connecter = useCallback(async (email, password) => {
        const res = await fetch("/api/connexion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (!res.ok) {
            return {
                ok: false,
                message: data.message || "Email ou mot de passe incorrect.",
            };
        }

        // Le backend renvoie { id: 2, prenom: "Alban" }
        const session = {
            id: data.id,
            prenom: data.prenom,
        };
        setUtilisateur(session);

        // Sauvegarder les informations de l'utilisateur
        localStorage.setItem("utilisateur", JSON.stringify(session));
        return { ok: true };
    }, []);

    // Fonction de déconnexion
    const deconnecter = useCallback(() => {
        setUtilisateur(null);
        localStorage.removeItem("utilisateur");
    }, []);

    // Valeurs et fonctions accessibles dans toute l'application
    const value = useMemo(
        () => ({
            utilisateur,
            estConnecte: utilisateur !== null,
            chargement,
            connecter,
            deconnecter,
        }),
        [utilisateur, chargement, connecter, deconnecter],
    );
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

// Hook personnalisé pour utiliser le contexte
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error(
            "useAuth doit être utilisé à l'intérieur de <AuthProvider>",
        );
    }
    return ctx;
}
