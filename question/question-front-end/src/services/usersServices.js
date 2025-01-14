import { get, post } from "../utils/request";

export const getUser = async () => {
  const result = await get("users");
  return result;
};

export const createUser = async (options) => {
  const result = await post("users", options);
  return result;
};
