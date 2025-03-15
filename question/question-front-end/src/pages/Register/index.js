import { useEffect, useState } from "react";
import "./Register.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";
import { createUser, getUser } from "../../services/usersServices";
function Register() {
  const init = {
    id: "",
    fullname: "",
    email: "",
    password: "",
    token: "",
  };
  const [formData, setFormData] = useState(init);
  const [users, setUsers] = useState({});
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const s = "abcdefhijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const handleSubmit = (e) => {
    e.preventDefault();
    let token;
    let check = true;
    while (check) {
      token = "";
      for (let i = 0; i < 15; i++) {
        token = token + s[Math.floor(Math.random() * s.length)];
      }
      check = users.some((us) => us.token === token);
    }
    formData.token = token;
    formData.id = (users.length + 1).toString();
    const result = createUser(formData);
    if (result) {
      setFormData(init);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Chúc mừng bạn đã đăng kí thành công!",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/login");
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
        <h3 className="form__title">Register Account</h3>
        <form onSubmit={handleSubmit}>
          <table className="form__list">
            <tr className="form__item">
              <td className="form__item--desc">
                <label for="fullName">Họ và tên</label>
              </td>
              <td className="form__item--input">
                <input
                  id="fullName"
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Họ và tên"
                  required
                />
              </td>
            </tr>
            <tr className="form__item">
              <td className="form__item--desc">
                <label for="email">Email</label>
              </td>
              <td className="form__item--input">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
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
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </td>
            </tr>
          </table>
          <button type="submit">Đăng kí</button>
        </form>
      </div>
    </>
  );
}
export default Register;
