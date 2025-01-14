import { get } from "../utils/request";
export const getTopic = async () => {
  const result = await get("topics");
  return result;
};
