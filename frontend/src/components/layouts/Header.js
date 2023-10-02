import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Image } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { logOut } from "../../actions/userActions";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(logOut);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            className="img-fluid" // Use 'img-fluid' to make images responsive
            alt="thiru-cart logo"
            src="/images/logo.png"
            style={{ maxWidth: "150px" }} // Set a maximum width for the logo
          />
        </Link>

        <div className="navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <img
                  className="img-fluid" // Make the title image responsive
                  src="/images/title.png"
                  alt="Title"
                  style={{ maxWidth: "100%" }} // Set a maximum width for the title image
                />
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {isAuthenticated ? (
                <Dropdown className="d-inline">
                  <DropdownToggle variant="default text-white pr-5" id="dropdown-basic">
                    <figure className="avatar avatar-nav">
                      <Image
                        className="img-fluid rounded-circle" // Make the avatar image responsive
                        width="50px"
                        src={user.avatar ?? "./images/default_avatar.png"}
                      />
                    </figure>
                    <span>{user.name}</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    {user.role === "admin" && (
                      <DropdownItem onClick={() => navigate('/admin/dashboard')} className="text-danger">
                        Dashboard
                      </DropdownItem>
                    )}
                    <DropdownItem onClick={() => navigate('/myprofile')} className="text-danger">
                      Profile
                    </DropdownItem>
                    <DropdownItem onClick={() => navigate('/location')} className="text-danger">
                      Location
                    </DropdownItem>
                    <DropdownItem onClick={() => navigate('/paymentr')} className="text-danger">
                      Booking
                    </DropdownItem>
                    <DropdownItem onClick={() => navigate('/orders')} className="text-danger">
                      Booked slot
                    </DropdownItem>
                    <DropdownItem onClick={logOutHandler} className="text-danger">
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <li className="nav-item">
                  <Link to="/login" className="btn btn-link" id="login_btn">
                    Login
                  </Link>
                </li>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
