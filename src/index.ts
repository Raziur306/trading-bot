import alpaca from "./config/alpaca.config";
import predictCurrentMarketByNews from "./config/api.config";
import { CronJob } from "cron";

const byAndSellStock = async () => {
  try {
    const result = await predictCurrentMarketByNews();
    if (result?.[0] >= 70) {
      const order = await alpaca.createOrder({
        symbol: result?.[1],
        qty: 2,
        side: "buy",
        type: "market",
        time_in_force: "day",
      });
    } else if (result?.[0] <= 30) {
      const closedPosition = await alpaca.closePosition(result?.[1]);
    }
  } catch (error: any) {
    console.error("Error: ", error.response.data.message);
  }
};

const job = CronJob.from({
  cronTime: "*/5 * * * * *",
  onTick: async () => {
    await byAndSellStock();
  },
  start: true,
  timeZone: "America/Los_Angeles",
});
job.start();
