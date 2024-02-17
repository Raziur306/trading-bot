import Alpaca from "@alpacahq/alpaca-trade-api";
import dotenv from "dotenv";

dotenv.config();

const alpaca = new Alpaca({
  keyId: process.env.APCA_API_KEY_ID,
  secretKey: process.env.APCA_API_SECRET_KEY,
  paper: true,
});

export const printAccount = async () => {
  const account = await alpaca.getAccount();
  return account;
};

export default alpaca;
