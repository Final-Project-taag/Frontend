
import useAuthStore from '../hooks/useAuthStore';



/* import contactImage from "./contact.jpg"; */

function ContactPage() {
  return (
    <div className="flex flex-row">
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-4">Muster Firmenname</h1>
        <p className="mb-2">1234 Musterstraße</p>
        <p className="mb-2">12345 Musterstadt</p>
        <p className="mb-4">Deutschland</p>
        <p className="mb-2">Telefon: 0123-4567890</p>
        <p className="mb-4">E-Mail: info@muster-firmenname.de</p>
      </div>
      <div className="flex-1">
        {/* <img src={s} alt="Kontaktbild" className="w-full h-auto" /> */}
      </div>
    </div>
  );
}

export default ContactPage;