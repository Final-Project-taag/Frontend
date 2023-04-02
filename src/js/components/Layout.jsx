
import useAuthStore from '../hooks/useAuthStore';
import Header from './Heder';
import Footer from './Footer';
import AboutUs from './AboutUs';

/* import { UserCircleIcon } from "@heroicons/react/24/outline"; */

function Layout() {
    const authStore = useAuthStore();

    return (
        <>
            <Header />
            {/* <AboutUs />  */}
            <Footer />
          
        
        </>
    );
}

export default Layout;