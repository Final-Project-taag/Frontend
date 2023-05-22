import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  // Speicherort fuer user objekt
  user: null,

  isAuthenticated: function () {
    return this.user !== null;

    // let resp = await axios.get('/auth/validate-token', {withCredentials: true});
  },

  // Methode zum Speichern des users und des tokens
  authenticate: (user) => {
    // Speichere token im localStorage
    localStorage.setItem("token", user.token);

    // Speichere user Objekt im store
    set({ user: user }); // setze neuen user
  },

  // Methode zum Holen des gespeicherten tokens
  getToken: () => localStorage.getItem("token"),

  // Methode zum Ausloggen (loeschen des users und des tokens)
  logout: () => {
    // entferne token aus localStorage
    localStorage.removeItem("token");

    // entferne user Objekt aus user Store
    set({ user: null });
  },
  loadUser: async () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:8081/auth/auth", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        set({ user: res.data });
      } catch (err) {
        console.log(err);
      }
    }
  },
}));

export default useAuthStore;
