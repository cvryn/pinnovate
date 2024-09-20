import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import catloading from "../../../public/cat-what.gif";
import { fetchLikedPins } from "../../redux/likeReducer";

import "./ManageLikedPins.css";


const ManageLikedPins = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const currentUser = useSelector((state) => state.session.user);
    const likedPins = useSelector((state) => state.like);
    console.log("which are liked", likedPins)

    if (loading) {
        return (
            <div
                id="loading-screen"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <div className="loader">Loading liked pins right meow...</div>
                <div>
                    <img src={catloading} alt="Loading" />
                </div>
            </div>
        );
    }

    return (
        <>
        <h1>ʕ•͈ ﻌ •͈ʔฅ</h1>
        <div id="manage-liked-pins-container">

        </div>
        </>
    );
};

export default ManageLikedPins;
