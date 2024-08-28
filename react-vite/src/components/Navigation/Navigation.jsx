import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import pinnovatelogo from '../../../public/pinnovate-logo.png'
import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar";
import NavigationLoggedOut from "./NavigationLoggedOut";

import "./Navigation.css";


function Navigation() {

  const currentUser = useSelector((state) => state.session.user)
  return (
    <>
     {currentUser &&
      <nav id="navigation-main-container">
        <div id="nav-left-container">
          <Link to="/" id='logo-homepage-container'>
          <img src={pinnovatelogo} alt='website logo' style={{height: '30px'}} />innovate
          </Link>
          {/* <div id='nav-explore-create-button'>Explore
          </div> */}
          <Link to='/' id='nav-home-create-button'>Home
          </Link>

        </div>
        <div id="nav-middle-container">
          {/* <h1>ʕ*•ﻌ•ʔฅ</h1> */}
          <SearchBar />
        </div>

        <div id="nav-right-container">
          <div id='nav-explore-create-button'>
            <Link to='/pins/new'>Create</Link>
            </div>
          <ProfileButton />
        </div>
      </nav>
      }

      {!currentUser &&
      <div>
        <NavigationLoggedOut />
        </div>}

    </>
  );
}

export default Navigation;
