import { useAuthStore } from "../../hooks/useAuthStore"


export const Navbar = () => {

  const { startLogout, user } = useAuthStore();
  return (
    <div className="navbar navbar-dark mb-4 px-4 bg-navbar">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt me-2"></i>
            { user.name }
        </span>

        <button className="btn btn-logout" onClick={ startLogout }>
            <i className="fas fa-sign-out-alt me-2"></i>
            <span>Salir</span>
        </button>
    </div>
  )
}
