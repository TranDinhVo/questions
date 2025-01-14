import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getResult } from "../../services/resultServices";
import { getUser } from "../../services/usersServices";
import { getTopic } from "../../services/topicServies";
import "./Answers.scss";

function Answers() {
  const [answer, setAnswer] = useState({});
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const resultUsers = await getUser();
      const result = await getResult();
      const resultTopics = await getTopic();

      const userCurrent = resultUsers.find(
        (us) => `token=${us.token}` === document.cookie
      );
      const resultOfUserCurrent = result.filter(
        (res) => res.userId == userCurrent.id
      );

      setAnswer(resultOfUserCurrent);
      setTopics(resultTopics);
    };
    fetchApi();
  }, []);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate("/result/" + id);
  };
  return (
    <>
      {answer.length > 0 && (
        <>
          <h2>Danh sách bài đã ôn luyện</h2>
          <table className="answer">
            <thead className="answer__header">
              <tr>
                <th className="answer__header--index">Id</th>
                <th className="answer__header--tp">Tên chủ đề</th>
                <th className="answer__header--empty"></th>
              </tr>
            </thead>
            <tbody className="answer__body">
              {(answer || []).reverse().map((item) => {
                return (
                  <tr key={item.id} className="answer__item">
                    <td className="answer__item--index">{item.id}</td>
                    <td className="answer__item--name">
                      {topics[item.topicId - 1].name}
                    </td>
                    <td>
                      <span
                        onClick={() => handleClick(item.id)}
                        className="answer__item--button"
                      >
                        <Link to={"/result/" + item.id}>Xem chi tiết</Link>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
export default Answers;
