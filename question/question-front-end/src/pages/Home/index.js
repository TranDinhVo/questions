import { useEffect, useState } from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/usersServices";
function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  let indexUser;
  useEffect(() => {
    const cookie = document.cookie.trim();
    const checkLogin = cookie !== "";
    if (checkLogin) {
      setIsLogin(true);
      const fetchApi = async () => {
        const result = await getUser();
        setUsers(result);
        const token = cookie.split("=")[1];
        const user = result.find((us) => us.token === token);
        setCurrentUser(user);
      };
      fetchApi();
    } else {
      setIsLogin(false);
    }
  }, []);
  const handleToTopic = () => {
    navigate("/topic");
  };
  const handleToAnswers = () => {
    navigate("/answers");
  };
  return (
    <>
      {isLogin ? (
        <>
          <p>Xin chào {currentUser.fullname}</p>
          <p>Chúc mừng {currentUser.fullname} đã đăng nhập thành công!</p>
          <ul className="list">
            <li className="list__topic" onClick={handleToTopic}>
              Danh sách chủ đề ôn luyện
            </li>
            <li className="list__practice" onClick={handleToAnswers}>
              Danh sách bài đã luyện tập
            </li>
          </ul>
          <hr></hr>
        </>
      ) : (
        <></>
      )}
      <p>
        Website trắc nghiệm online lập trình Frontend là một nền tảng trực tuyến
        cho phép các lập trình viên Frontend thực hiện các bài kiểm tra, đánh
        giá và đo đạc kiến thức của mình trong lĩnh vực lập trình Frontend.
      </p>
      <p>
        Đối với các lập trình viên Frontend, website trắc nghiệm online cung cấp
        các bài kiểm tra để giúp họ nâng cao kiến thức và kỹ năng trong nghề và
        công cụ lập trình như HTML, CSS, JavaScript, jQuery, Bootstrap, Angular,
        React, Vue,...
      </p>
    </>
  );
}
export default Home;
