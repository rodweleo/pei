import BuyAirtimeQuickLink from "./BuyAirtime";
import PayUtilitiesQuickLink from "./PayUtilities";
import SendMoneyQuickLink from "./SendMoney";
import WithdrawQuickLink from "./Withdraw";

export default function QuickLinks() {
  return (
    <ul className="flex items-center gap-4 *li:rounded-full">
      <li>
        <SendMoneyQuickLink />
      </li>
      <li>
        <BuyAirtimeQuickLink />
      </li>
      <li>
        <WithdrawQuickLink />
      </li>
    </ul>
  );
}
