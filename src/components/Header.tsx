import { NavLink, useNavigate } from "react-router-dom"; 
import '../css/Header.css';

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="menu">
      <div
        className="logo"
        onClick={() => {
          navigate("/movies");
        }}
      >
        FindMovie
      </div>
      <div className="menu__space"></div>
      <div className="menu__category">
        <NavLink to="/movies">Search</NavLink>
        <NavLink to="/favorite">Favorites</NavLink>
      </div>
    </div>
  );
}
