import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./nav.css";
import { LoginFormContext } from "../../App";
import seperateName from "../../utils/seperateName";

//! importing the logout api

import { logout } from "../../utils/api/api";

type NavProps = {
  username: string;
};

const Nav: React.FC<NavProps> = ({ username }) => {
  const navigate = useNavigate();

  const { setAvatar } = useContext(LoginFormContext);

  useEffect(() => {
    const fetchAvatar = async () => {
      const parts = seperateName(username);
      if (parts) {
        const { first, last } = parts;
        console.log(first, last);
        const avatarResponse = await fetch(
          `https://ui-avatars.com/api/?name=${first}+${last}&background=random&rounded=true&size=50&bold=true&color=fff`
        );
        const avatarUrl = avatarResponse.url; // Assuming avatarResponse.url is the correct way to extract the URL
        setAvatar(avatarUrl); // Pass the URL string to setAvatar
      }
    };

    fetchAvatar();
  }, [username, setAvatar]); // Depend on username and setAvatar to re-run the effect if they change

  const handleLogout = async () => {
    const success = await logout();

    if (!success) {
      alert("error logging out");
    } else {
      console.log("logged out");
      navigate("/");
    }

    // // Implement logout logic here
    // alert("Logout clicked");
  };

  return (
    <nav>
      <div className="app-name">
        <h1>TaskFlow</h1>
      </div>
      <div className="user">
        <p>{username}</p>
        {/* <img src={avatar} alt="user" /> */}
        <div className="logout-wrapper">
          <img
            className="logout-icon"
            onClick={handleLogout}
            src="log-out.svg"
            alt="LOGOUT"
          />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
