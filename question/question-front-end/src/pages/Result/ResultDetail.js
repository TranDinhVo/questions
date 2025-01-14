import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz } from "../../services/quizServices";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { getResult } from "../../services/resultServices";
import { useNavigate } from "react-router-dom";
import "../Quiz/Quiz.scss";
import { getTopic } from "../../services/topicServies";

function ResultDetail() {
  const params = useParams();
  const [answer, setAnswer] = useState({});
  const [quiz, setQuiz] = useState([]);
  const [quantityTrue, setQuantityTrue] = useState(0);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getResult();
      const resultQuiz = await getQuiz();
      const resultTopics = await getTopic();
      const resultParams = result.find((ans) => ans.id === params.id);
      const resultQuizCurrent = resultQuiz.filter(
        (quiz) => quiz.topicId === resultParams.topicId
      );
      let cnt = 0;
      for (let i = 0; i < resultQuizCurrent.length; i++) {
        cnt +=
          resultParams.answers[i].answer === resultQuizCurrent[i].correctAnswer;
      }
      setAnswer(resultParams);
      setQuiz(resultQuizCurrent);
      setTopics(resultTopics);
      setQuantityTrue(cnt);
    };
    fetchApi();
  }, []);
  let cnt = 0;
  const trueOrFalse = (index) => {
    cnt += answer.answers[index].answer === quiz[index].correctAnswer ? 1 : 0;
    return answer.answers[index].answer === quiz[index].correctAnswer
      ? "quiz__question quiz__question--true"
      : "quiz__question quiz__question--false";
  };
  const itemTrueOrFalse = (correct, index) => {
    const ansOp = answer.answers[index].answer;
    const check = correct === ansOp;
    return correct === quiz[index].correctAnswer
      ? `quiz__options--item quiz__options--true`
      : `quiz__options--item ${check ? "quiz__options--false" : ""}`;
  };
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="quiz">
        {quiz.length > 0 && (
          <>
            <h3>Kết quả chủ đề: {topics[quiz[0].topicId - 1].name}</h3>
            <div className="quiz__result">
              Đúng: {quantityTrue} | Sai: {quiz.length - quantityTrue} | Tổng số
              câu: {quiz.length} | Tỷ lệ đúng:{" "}
              {((quantityTrue / quiz.length) * 100).toFixed(0)}%
            </div>
            <ul className="quiz__list">
              {quiz.map((item, index) => {
                return (
                  <li className="quiz__item" key={item.id}>
                    <p className={trueOrFalse(index)}>
                      Câu {index + 1}: {item.question}
                    </p>
                    <ul className="quiz__options">
                      {item.answers.map((option, idx) => (
                        <li className={itemTrueOrFalse(idx, index)} key={idx}>
                          <span>{option}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
            <button className="quiz__redo" onClick={handleClick}>
              Làm lại
            </button>
          </>
        )}
      </div>
    </>
  );
}
export default ResultDetail;
