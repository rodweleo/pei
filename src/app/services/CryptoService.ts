import axios from "axios";

class CryptoService {
  constructor() {}

  async getHBARExchangeRate(): Promise<number> {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=hedera-hashgraph&vs_currencies=kes"
      );
      return response.data["hedera-hashgraph"].kes;
    } catch (err) {
      console.error("Failed to fetch HBAR/KES rate from CoinGecko:", err);
      return 0;
    }
  }

  async checkTransaction(txId: string, expectedAmount?: number) {
    const mirrorNode = `https://testnet.mirrornode.hedera.com/api/v1/transactions/${txId}`;
    const response = await axios.get(mirrorNode);
    const data = await response.data;

    // return data.transactions[0].transfers.some(
    //   (transfer) =>
    //     transfer.account === TREASURY_ACCOUNT_ID &&
    //     transfer.amount === expectedAmount * 100000000 // Convert to tinybars
    // );

    return data;
  }
}

export default CryptoService;
