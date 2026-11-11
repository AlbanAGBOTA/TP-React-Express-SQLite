// import { Outlet } from "react-router";
// import Banner from "./Banner";
// import Footer from "./Footer";
// import ColonneGauche from "./Sidebar";
// import ContenueDroite from "./RightContenu";

// function Layout() {
//     return (
//         <>
//             <Banner />
//             <ColonneGauche />
//             <main>
//                 <Outlet />
//             </main>
//             <ContenueDroite />
//             <Footer />
//         </>
//     );
// }
// export default Layout;

import { Outlet } from "react-router";
import Banner from "../components/navigation/Banner";
import Footer from "../components/navigation/Footer";
import ColonneGauche from "../components/navigation/Sidebar";
import ContenueDroite from "../components/navigation/RightContenu";

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
