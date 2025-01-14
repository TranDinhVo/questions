import { useEffect, useState } from "react";
import "./LayoutDefault.scss";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
const navLinkActive = (e) => {
  return e.isActive ? "log__link log__link--active" : "log__link";
};
const navLinkActiveBg = (e) => {
  return e.isActive ? "quiz__link quiz__link--active" : "quiz__link";
};

function LayoutDefault() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLogin(false);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    const check = document.cookie.trim() !== "";
    if (check) {
      setIsLogin(true);
    } else setIsLogin(false);
  }, [isLogin]);

  return (
    <>
      <div className="layout-default">
        <header className="layout-default__header">
          <h2 className="layout-default__title">
            <NavLink to="/" className={navLinkActive}>
              Quiz
            </NavLink>
          </h2>
          {isLogin ? (
            <>
              <div className="layout-default__quiz">
                <ul>
                  <li>
                    <NavLink to="/" className={navLinkActiveBg}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/topic" className={navLinkActiveBg}>
                      Topic
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/answers" className={navLinkActiveBg}>
                      Answers
                    </NavLink>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="layout-default__log">
            <ul>
              {isLogin ? (
                <>
                  <li>
                    <NavLink
                      to="/"
                      className="quiz__logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/login" className={navLinkActive}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className={navLinkActive}>
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </header>
        <main className="layout-default__main">
          <Outlet />
        </main>
        <footer className="layout-default__footer">
          Copyright @ 2025 by Tial
        </footer>
      </div>
    </>
  );
}
export default LayoutDefault;
