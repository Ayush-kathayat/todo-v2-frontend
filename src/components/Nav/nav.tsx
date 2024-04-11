import "./nav.css";

type NavProps = {
    username: string;
}

const Nav: React.FC<NavProps> = ({username})=> {

    return (
        <nav>
          <div className="app-name">
            <h1>TaskFlow</h1>
          </div>
          <div className="user">
            <p>{username}</p>
            <img src="user.svg" alt="user" />
          </div>
        </nav>
    )
}

export default Nav;