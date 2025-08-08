import AfricasTalking from "africastalking";
import axios from "axios";

const AT = AfricasTalking({
  apiKey: process.env.AFRICASTALKING_API_KEY!,
  username: process.env.AFRICASTALKING_USERNAME!,
});

class ATService {
  constructor() {}

  async purchaseAirtime(phoneNumber: string, amount: number) {
    const data = {
      username: "Pei",
      recipients: [
        {
          phoneNumber: `+254${phoneNumber.slice(1)}`,
          currencyCode: "KES",
          amount: amount,
        },
      ],
      maxNumRetry: 2,
    };

    const atResponse = await axios.post(
      "https://api.sandbox.africastalking.com/version1/airtime/send",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Indempotency-Key": "",
          apiKey: "",
        },
      }
    );

    console.log(atResponse.data);
    return atResponse.data;
  }
}

export default ATService;
