import { get } from "../utils/request";
export const getQuiz = async () => {
  const result = await get("questions");
  return result;
};
