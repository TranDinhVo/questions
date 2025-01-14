import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuiz } from "../../services/quizServices";
import { getUser } from "../../services/usersServices";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { createResult, getResult } from "../../services/resultServices";
import "./Quiz.scss";
import { getTopic } from "../../services/topicServies";

function QuizDetail() {
  const topicId = useParams();
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [user, setUser] = useState({});
  const [result, setResult] = useState([]);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const resultQuiz = await getQuiz();
      const resultUsers = await getUser();
      const resultPrev = await getResult();
      const resultTopics = await getTopic();
      let ques = resultQuiz.filter((q) => q.topicId === parseInt(topicId.id));
      let userCurrent = resultUsers.find(
        (us) => `token=${us.token}` === document.cookie.trim()
      );
      setQuiz(ques);
      setUser(userCurrent);
      setResult(resultPrev);
      setTopics(resultTopics);
    };
    fetchApi();
  }, []);
  const handleAnswerChange = (e) => {
    const { name, value } = e.target;
    setAnswers({
      ...answers,
      [name]: parseInt(value),
    });
  };

  const submitQuiz = (option) => {
    Swal.fire({
      title: "Đã Nộp",
      icon: "success",
      confirmButtonText: "Xem kết quả",
    });
    createResult(option);
    navigate(`/result/` + option.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const option = {
      id: (result.length + 1).toString(),
      userId: parseInt(user.id),
      topicId: parseInt(topicId.id),
      answers: quiz.map((item) => {
        return {
          questionId: parseInt(item.id),
          answer:
            answers[`question_${item.id}`] !== undefined
              ? parseInt(answers[`question_${item.id}`])
              : null,
        };
      }),
    };
    const quantityNoAns = quiz.length - Object.keys(answers).length;
    if (quantityNoAns > 0) {
      Swal.fire({
        title: "Bạn chắc chắn nộp chứ",
        text: `Bạn còn ${quantityNoAns} câu chưa hoàn thành`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vâng!",
        cancelButtonText: "Không, Tôi cần hoàn thành nó!",
      }).then((result) => {
        if (result.isConfirmed) {
          submitQuiz(option);
        }
      });
    } else submitQuiz(option);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="quiz">
          {quiz.length > 0 && (
            <>
              <h3>Bài Quiz chủ đề: {topics[topicId.id - 1].name}</h3>
              <ul className="quiz__list">
                {quiz.map((item, index) => {
                  return (
                    <li className="quiz__item" key={item.id}>
                      <p className="quiz__question">
                        Câu {index + 1}: {item.question}
                      </p>
                      <ul className="quiz__options">
                        {item.answers.map((option, idx) => (
                          <li className="quiz__options--item" key={idx}>
                            <input
                              type="radio"
                              name={`question_${item.id}`}
                              value={idx}
                              onChange={handleAnswerChange}
                              id={`option_${item.id}_${idx}`}
                            />
                            <label htmlFor={`option_${item.id}_${idx}`}>
                              {option}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
              <button type="submit" className="quiz__submit">
                Nộp bài
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
}
export default QuizDetail;
