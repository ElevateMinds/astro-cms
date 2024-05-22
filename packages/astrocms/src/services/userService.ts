import { User } from "../types";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";

const usersDir = path.join(__dirname, "../../data/users");

if (!fs.existsSync(usersDir)) {
  fs.mkdirSync(usersDir, { recursive: true });
}

export const createUser = (user: User): void => {
  const userFilePath = path.join(usersDir, `${user.email}.yaml`);
  const yamlStr = yaml.dump(user);
  fs.writeFileSync(userFilePath, yamlStr, "utf8");
};

export const getUserByEmail = (email: string): any => {
  const userFilePath = path.join(usersDir, `${email}.yaml`);
  if (fs.existsSync(userFilePath)) {
    const userData = fs.readFileSync(userFilePath, "utf8");
    return yaml.load(userData);
  }
  return null;
};
