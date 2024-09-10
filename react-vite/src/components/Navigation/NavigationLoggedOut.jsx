
import { NavLink } from "react-router-dom"
import pinnovatefulllogo from '../../../public/pinnovate-full-logo.png'

import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";


function NavigationLoggedOut() {

    return (
        <>
      <nav id="navigation-main-container">
        <div id="nav-left-container">
          <NavLink to="/" id='logo-homepage-container'>
          <img src={pinnovatefulllogo} alt='website logo' style={{height: '30px'}} />
          </NavLink>
          {/* <div id='nav-explore-create-button'>Explore
          </div> */}

        </div>
        <div id="nav-middle-container">
          {/* <h1>ʕ*•ﻌ•ʔฅ</h1> */}
          {/* <SearchBar /> */}
        </div>

        <div id="nav-right-container">
          {/* <div id='nav-explore-create-button'>Create
            </div> */}
          <>
              <OpenModalMenuItem
                itemText="Log In"
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </>
        </div>
      </nav>
        </>
    )
}

export default NavigationLoggedOut
