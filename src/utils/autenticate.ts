import { compare } from "bcrypt";

export const validatePassword  = async (password: string, hash: string): Promise<boolean> => {

    return await compare(password, hash);
}