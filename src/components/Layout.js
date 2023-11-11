import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div class="wrapper">
            <Header />
            <main class="page-body">
                <div className="page-body-container">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    )
}
export default Layout