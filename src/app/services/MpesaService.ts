import axios from "axios";
import { v4 as uuidV4 } from "uuid";

const CONSUMER_KEY = process.env.CONSUMER_KEY!;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET!;
const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE!;

class MpesaService {
  constructor() {}

  private async generateAccessToken() {
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString(
      "base64"
    );
    const tokenResponse = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: { Authorization: `Basic ${auth}` },
      }
    );
    const { access_token } = await tokenResponse.data;
    return access_token;
  }

  async makeB2CPayment(amount: number, phoneNumber: number) {
    const access_token = await this.generateAccessToken();
    const OriginatorConversationID = uuidV4();
    const mpesaResponse = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/b2c/v3/paymentrequest",
      {
        OriginatorConversationID,
        InitiatorName: process.env.MPESA_INITIATOR_NAME,
        SecurityCredential: process.env.MPESA_SECURITY_CREDENTIAL,
        CommandID: "BusinessPayment",
        Amount: amount,
        PartyA: MPESA_SHORTCODE,
        PartyB: phoneNumber,
        Remarks: "Pei withdrawal",
        QueueTimeOutURL: `${process.env.BASE_URL}/api/mpesa/b2c/queue`,
        ResultURL: `${process.env.BASE_URL}/api/mpesa/b2c/result`,
        Occassion: "Hedera withdrawal",
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return mpesaResponse.data;
  }
}

export default MpesaService;
