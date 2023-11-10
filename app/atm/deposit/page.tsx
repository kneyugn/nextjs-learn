import { Card } from "@/components/card/card";
import { Header } from "@/components/header/header";
import { Main } from "@/components/main/main";
import {
  DynamicTransaction,
  StaticTransaction,
} from "@/components/transactionInput/transactionInput";
import { getCardInfoFromJwt } from "@/lib/utils/helper";
import { TransactionType } from "@/lib/utils/types";
import { cookies } from "next/headers";

function fetchAccount() {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access_token")?.value || "";
  const card = getCardInfoFromJwt(accessToken);
  const cardId = card?.cardId || "";
  return cardId;
}

export default async function AccountDeposit() {
  let cardId = fetchAccount();
  const transactionMenu = [
    {
      title: "Deposit $20",
      amount: 20,
      buttonText: "Deposit $20",
    },
    {
      title: "Deposit $50",
      amount: 50,
      buttonText: "Deposit $50",
    },
    {
      title: "Deposit $100",
      amount: 100,
      buttonText: "Deposit $100",
    },
    {
      title: "Deposit Custom amount",
      customAmount: true,
      buttonText: "Deposit",
    },
  ];
  return (
    <>
      <Header secondaryHeader={"Deposit"}></Header>
      <Main>
        {transactionMenu.map((item) => {
          return (
            <>
              <Card>
                {item.amount && !item.customAmount ? (
                  <>
                    <h3 className="card-title">{item.title}</h3>
                    <div className="card-actions justify-end">
                      <StaticTransaction
                        transactionType={TransactionType.Deposit}
                        amount={item.amount}
                        text={item.buttonText}
                        cardId={cardId}
                      ></StaticTransaction>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="card-title">{item.title}</h3>
                    <div className="card-actions justify-end">
                      <DynamicTransaction
                        transactionType={TransactionType.Deposit}
                        text={item.buttonText}
                        cardId={cardId}
                      ></DynamicTransaction>
                    </div>
                  </>
                )}
              </Card>
            </>
          );
        })}
      </Main>
    </>
  );
}
