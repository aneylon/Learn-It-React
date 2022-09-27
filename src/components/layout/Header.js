import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      {/* <h1>Learn It</h1> */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
