
import { Outlet } from "react-router";
import Banner from "../components/navigation/Banner";
import Footer from "../components/navigation/Footer";

function Layout() {
    return (
        <>
            <Banner />
            <main className="contenuPrincipal">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
export default Layout;
