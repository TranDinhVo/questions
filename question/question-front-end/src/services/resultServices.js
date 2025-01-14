import { get, post } from "../utils/request";

export const getResult = async () => {
  const result = await get("answers");
  return result;
};

export const createResult = async (option) => {
  const result = await post("answers", option);
  return result;
};
