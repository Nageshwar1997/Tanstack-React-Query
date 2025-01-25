import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <NavLink to="/">Hangeshwar Pawar</NavLink>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/trad">FetchOld</NavLink>
          </li>
          <li>
            <NavLink to="/rq">FetchRQ</NavLink>
          </li>
          <li>
            <NavLink to="/rq2">FetchRQ2</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
