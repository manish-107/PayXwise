import { v4 as uuidv4 } from "uuid";

export const generatecharid = (): string => {
  const uuid = uuidv4().replace(/-/g, "");
  console.log(uuid);
  const elevenCharId: string = uuid.substring(0, 15);
  return elevenCharId;
};
