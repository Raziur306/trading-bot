import alpaca from "../config/alpaca.config";

const getHistoricalData =  async(symbol: string, options: any) => {
  const res =  await alpaca.getBarsV2(symbol, options);
  return res;
};

export{getHistoricalData};