import { useEffect, useState } from "react";
import { getUser } from "../../services/usersServices";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setLogin } from "../../actions/login";
function Login() {
  const init = {
    email: "",
    password: "",
  };
  const [login, setFormLogin] = useState(init);
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormLogin({
      ...login,
      [name]: value,
    });
  };
  // const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    let user = users.filter(
      (us) => us.email === login.email && us.password === login.password
    );
    if (user.length !== 0) {
      document.cookie = `token=${user[0].token}`;
      // dispatch(setLogin());
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Đăng nhập thành công!",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/");
        window.location.reload();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Đăng nhập thất bại!",
        text: "Email hoặc password sai!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUser();
      setUsers(result);
    };
    fetchApi();
  }, []);
  return (
    <>
      <div className="form">
        <h3 className="form__title">Login</h3>
        <form onSubmit={handleSubmit}>
          <table className="form__list">
            <tr className="form__item">
              <td className="form__item--desc">
                <label for="email">Email</label>
              </td>
              <td className="form__item--input">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={login.email}
                  onChange={handleChange}
                  placeholder="email"
                  required
                />
              </td>
            </tr>
            <tr className="form__item">
              <td className="form__item--desc">
                <label for="password">Password</label>
              </td>
              <td className="form__item--input">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </td>
            </tr>
          </table>
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    </>
  );
}
export default Login;
