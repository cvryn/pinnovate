import { useState } from "react";
import { useSelector } from "react-redux";
import pinnovatelogo from '../../../public/pinnovate-logo.png';
import ManageBoards from "../Board/ManageBoards";
import ManagePins from "../Pins/ManagePins";
// import LikedPins from "../Likes/ManageLikedPins";

import './UserProfile.css';

function UserProfile() {
    const [activeTab, setActiveTab] = useState("pins");
    const currentUser = useSelector((state) => state.session.user);

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div id='user-profile-main-container'>
                <section id='user-profile-top-container'>
                    <div className='user-profile-image'>
                        <img src={currentUser.profile_image_url} alt='user profile image' />
                    </div>
                    <h1>{currentUser.first_name} {currentUser.last_name}</h1>
                    <div className='user-profile-username'>
                        <img src={pinnovatelogo} alt='pinnovate logo' /> {currentUser.username}
                    </div>
                </section>
                < br/>
                <section id='user-profile-bottom-container'>
                    <div id="user-profile-tabs">
                        <button
                            className={activeTab === "pins" ? "active" : ""}
                            onClick={() => handleTabSwitch("pins")}
                        >
                            Created Pins
                        </button>
                        {/* <button
                        className={activeTab === "liked" ? "active" : ""}
                        onClick={() => handleTabSwitch("liked")}
                    >
                        Liked Pins
                    </button> */}
                        <button
                            className={activeTab === "boards" ? "active" : ""}
                            onClick={() => handleTabSwitch("boards")}
                        >
                            Boards
                        </button>
                    </div>

                    <div id="profile-content">
                        {activeTab === "pins" && <ManagePins />}
                        {/* {activeTab === "liked" && <LikedPins />} */}
                        {activeTab === "boards" && <ManageBoards />}
                    </div>
                </section>
            </div>
        </>
    );
}

export default UserProfile;
