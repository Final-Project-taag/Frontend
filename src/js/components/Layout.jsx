
import useAuthStore from '../hooks/useAuthStore';
import Header from './Heder';
import Footer from './Footer';


/* import { UserCircleIcon } from "@heroicons/react/24/outline"; */

function Layout() {
    const authStore = useAuthStore();

    return (
        <>
            <Header />
            <Footer />
        
        </>
    );
}

export default Layout;