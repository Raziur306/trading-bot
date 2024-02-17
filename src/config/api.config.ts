import WebSocket from "ws";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const predictCurrentMarketByNews = async () => {
  try {
    const res = await axios.get("https://data.alpaca.markets/v1beta1/news", {
      headers: {
        "APCA-API-KEY-ID": process.env.APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": process.env.APCA_API_SECRET_KEY,
      },
      params: {
        symbols: "BTCUSD,AAPL,TSLA,AMD",
        limit: 1,
      },
    });

    const data = res.data;
    const { headline, summary, symbols } = data.news[0];

    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMNI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: ` Title: ${headline}Summary: ${summary}Should I take the trade or not? Please provide a response on a scale from 1 to 100, where 1 indicates cautious consideration before taking the trade, and 100 denotes a strong recommendation to proceed with the trade. So always return a number.`,
              },
            ],
          },
        ],
      }
    );
    const companyImpact =
      parseInt(geminiRes.data.candidates[0].content.parts[0].text) || 0;

    return [companyImpact, symbols[0]];
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

export default predictCurrentMarketByNews;
