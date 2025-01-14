import { getTopic } from "../../services/topicServies";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Topic.scss";
function Topic() {
  const [topic, setTopic] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getTopic();
      setTopic(result);
    };
    fetchApi();
  }, []);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate("/quiz/" + id);
  };
  return (
    <>
      {topic.length > 0 && (
        <>
          <h2>Danh sách chủ đề ôn luyện</h2>
          <table className="topic">
            <thead className="topic__header">
              <tr>
                <th className="topic__header--index">Id</th>
                <th className="topic__header--tp">Tên chủ đề</th>
                <th className="topic__header--empty"></th>
              </tr>
            </thead>
            <tbody className="topic__body">
              {topic.map((item) => {
                return (
                  <tr key={item.id} className="topic__item">
                    <td className="topic__item--index">{item.id}</td>
                    <td className="topic__item--name">{item.name}</td>
                    <td>
                      <span
                        onClick={() => handleClick(item.id)}
                        className="topic__item--button"
                      >
                        <Link to={"/quiz/" + item.id}>Làm bài</Link>
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
export default Topic;
