import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Logo, TextLogo } from '../assets/img/index'
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { FaCrown } from "react-icons/fa";
import { useStateValue } from "../Context/StateProvider";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { motion } from "framer-motion";

const Header = () => {
    const [{ user }, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false);
    const navigate = useNavigate;

    const logout = () => {
        const firebaseAuth = getAuth(app);
        firebaseAuth
            .signOut()
            .then(() => {
                window.localStorage.setItem("auth", "false");
            })
            .catch((e) => console.log(e));
        navigate("/login", { replace: true });
    };

    return (
        <header className='flex justify-between w-full p-4 md:py-1 md:px-6'>
            <div className="flex justify-center items-center">
                <NavLink to="/home">
                    <img src={Logo} alt="Logo" className='w-16' />
                </NavLink>
            </div>


            <div className="flex justify-center items-center ml-7">
                <NavLink to="/home">
                    <img src={TextLogo} alt="Logo" className='h-12' />
                </NavLink>
            </div>

            <div className="flex items-center cursor-pointer gap-2 relative"
                onMouseEnter={() => setIsMenu(true)}
                onMouseLeave={() => setIsMenu(false)}
            >
                <img
                    className="w-12 min-w-[44px] object-cover rounded-full shadow-lg"
                    src={user?.user?.imageURL}
                    alt=""
                    referrerPolicy="no-referrer"
                />
                <div className='flex flex-col'>
                    <p className="text-textColor text-lg hover:text-headingColor font-semibold">
                        {user?.user.name}
                    </p>
                    <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
                        Premium Member <FaCrown className="text-xm -ml-1 text-yellow-500" />
                    </p>
                </div>
                {isMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="absolute z-10 top-12 right-0 w-275 p-4 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
                    >
                        <NavLink to={"/userProfile"}>
                            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                                Profile
                            </p>
                        </NavLink>
                        <hr />
                        {user?.user.role === "admin" && (
                            <>
                                <NavLink to={"/dashboard/home"}>
                                    <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                                        Dashboard
                                    </p>
                                </NavLink>
                                <hr />
                            </>
                        )}
                        <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
                            onClick={logout}>
                            Sign out
                        </p>
                    </motion.div>
                )}

            </div>

        </header>
    )
}

export default Header