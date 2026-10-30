import { Outlet } from "react-router";
import Banner from "./Banner";
import Footer from "./Footer";
import ColonneGauche from "./Sidebar";
import ContenueDroite from "./RightContenu";

function Layout() {
    return (
        <>
            <Banner />
            <ColonneGauche />
            <main>
                <Outlet />
            </main>
            <ContenueDroite />
            <Footer />
        </>
    );
}
export default Layout;
