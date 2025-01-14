import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import Answers from "../pages/Answers";
import Login from "../pages/Login";
import Quiz from "../pages/Quiz";
import QuizDetail from "../pages/Quiz/QuizDetail";
import Register from "../pages/Register";
import Result from "../pages/Result";
import ResultDetail from "../pages/Result/ResultDetail";
import Topic from "../pages/Topic";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "topic",
        element: <Topic />,
      },
      {
        path: "quiz",
        element: <Quiz />,
        children: [
          {
            path: ":id",
            element: <QuizDetail />,
          },
        ],
      },
      {
        path: "result",
        element: <Result />,
        children: [
          {
            path: ":id",
            element: <ResultDetail />,
          },
        ],
      },
      {
        path: "answers",
        element: <Answers />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];
