import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { narBar } from "../../util/constan";
import Heading from "../../components/common/Heading";
import "./navbar.scss";
import logoMain from "../../../src/assets/images/logo-vntel.png";

//icons react-icons
import { BsChevronRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";

import { MdOutlineOndemandVideo } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import { useOnOutsideClick } from "../../hooks/use-outside";

import { getProfile } from "../../features/user/userSlice";

function Navbar(props) {
  const location = useLocation();
  const [hide, setHide] = useState(true);
  const { setMenu, menu, setDocumentPhone } = props;
  const activeRoute = (routeName) => {
    if (routeName) {
      return location.pathname.includes(routeName);
    }
    return false;
  };

  const [isSubMenuShow, setIsSubMenuShow] = useState(undefined);
  const [toggle, setToggle] = useState([]);
  const [openSub, setOpenSub] = useState(false);
  const [module, setModule] = useState([]);
  const [profile, setProfile] = useState();
  const dispatch = useDispatch();
  const hideNarBar = () => {
    setHide(!hide);
    setMenu(!menu);
  };

  useEffect(() => {
    dispatch(getProfile())
      .unwrap()
      .then((res) => {
        setProfile(res?.data);
      });
  }, []);

  const logout = async () => {
    await localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <div
        className="site-logo"
        style={{
          display: "flex",
          flexDirection: !hide && "column-reverse",
          alignItems: "center"
        }}
      >
        {/* <div
          onClick={hideNarBar}
          style={{
            cursor: "pointer",
            fontSize: "28px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          {hide ? <BsChevronLeft /> : <BsChevronRight />}
        </div>  */}
        <h2 className="logo-apps">
          <img src={logoMain} alt=""></img>
        </h2>
      </div>
      <div>
        <ul
          className="menu-main"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          {narBar?.map((v, i) => {
            return profile?.isStaff === true ? (
               v?.staff.includes("STAFF") && v?.staff.includes("USER") && (
                <li
                  className={`menu-item menu-single ${
                    activeRoute(v?.path) ? "active" : ""
                  }`}
                  key={i}
                >
                  <Link
                    to={v.path}
                    className="menu-toggle"
                    style={{
                      height: "40px",
                      justifyContent: !hide && "center",
                      backgroundColor: hide && activeRoute(v.path)
                    }}
                  >
                    <span className="inline-flex ml-4 items-center">
                      {v.svg}
                      {hide && (
                        <span>
                          {v.icons} {v.name}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              )
            ) : (
              v?.staff.includes("ALL") && v?.staff.includes("USER") && (
                <li
                  className={`menu-item menu-single ${
                    activeRoute(v?.path) ? "active" : ""
                  }`}
                  key={i}
                >
                  <Link
                    to={v.path}
                    className="menu-toggle"
                    style={{
                      height: "40px",
                      justifyContent: !hide && "center",
                      backgroundColor: hide && activeRoute(v.path)
                    }}
                  >
                    <span className="inline-flex ml-4 items-center">
                      {v.svg}
                      {hide && (
                        <span>
                          {v.icons} {v.name}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              )
            )
          })}
          <li>
            <p className="btn-logout" onClick={() => logout()}>
              <i className="fa fa-sign-out" aria-hidden="true"></i> Thoát
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
