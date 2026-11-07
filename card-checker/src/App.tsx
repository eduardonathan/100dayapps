import { useEffect, useState } from "react";
import "./App.css";
import { CheckCardBinUseCase } from "./api/CheckCardBinUseCase";

function App() {
  const [bin, setBin] = useState("");
  const [cardInfo, setCardInfo] = useState<{
    brand: string;
    accepted: boolean;
  } | null>(null);

  useEffect(() => {
    if (bin.length < 4) return;

    let canceled = false;

    const timeoutId = setTimeout(() => {
      async function checkCardBin() {
        try {
          const result = await new CheckCardBinUseCase().handle({ bin });
          if (!canceled) {
            setCardInfo(result);
          }
        } catch (error) {
          console.log("Error to check card bin", error);
        }
      }
      checkCardBin();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      canceled = true;
    };
  }, [bin]);

  return (
    <div>
      <input
        value={bin}
        onChange={(e) => setBin(e.target.value)}
        placeholder="Digite o numero do cartão"
      />
      {cardInfo && (
        <p>
          Bandeira: {cardInfo.brand} — Aceito:{" "}
          {cardInfo.accepted ? "Sim" : "Não"}
        </p>
      )}
    </div>
  );
}

export default App;
