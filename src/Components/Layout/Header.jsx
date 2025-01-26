import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
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
          <li>
            <NavLink to="/infinite-scroll">Infinite Scroll</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
