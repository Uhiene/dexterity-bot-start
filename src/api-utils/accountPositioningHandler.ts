import dexterity, { Trader } from "@hxronetwork/dexterity-ts";
import { TransactionInstruction } from "@solana/web3.js";

export const accountPositioningHandler = async (
  AppState: Map<string, any>,
  copiedTrader: Trader,
  trader: Trader
) => {
  const [traderInfo, copiedTraderInfo] = [
    await tradeInfoHandler(trader),
    await tradeInfoHandler(copiedTrader),
  ];

  const positioningRatio =
    Math.floor(
      (copiedTraderInfo.portfolioValue / traderInfo.portfolioValue) * 1000
    ) / 1000;

  AppState.set("positioningRatio", positioningRatio);

  console.log(`Positioning Ratio: ${positioningRatio}`);

  return await copyInitialAccountHandler(
    trader,
    traderInfo.positions,
    copiedTraderInfo.positions,
    positioningRatio
  );
};

const tradeInfoHandler = async (trader: Trader) => {
  await trader.update();

  const positions = trader.getPositions();
  const portfolioValue = trader.getPortfolioValue().toDecimal();

  return { positions, portfolioValue };
};

const copyInitialAccountHandler = async (
trader: Trader,
traderPositions: Map<any, any>,
copiedTraderPositions: Map<any, any>,
positioningRatio: number
) => {

};
