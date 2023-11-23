import { compare, hash } from "bcryptjs";

async function HashedPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

async function VerifyPassword(password, hashedPassword) {
  const verfication = await compare(password, hashedPassword);
  return verfication;
}

export { HashedPassword, VerifyPassword };
