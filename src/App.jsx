import { useState, useEffect } from "react";
function App() {
  const [userInfo, setUserInfo] = useState({ billAmount: 0, people: null });
  const [tipPercent, setTipPercent] = useState(null);
  const [calculate, setCalculate] = useState(false);
  const [newAmounts, setNewAmounts] = useState({
    total: 0.0,
    singleTotal: 0.0,
    singleTip: 0.0,
  });
  // tip buttons
  const tipAmounts = [5, 10, 15, 25, 50];

  // event handlers
  const handleCalculations = () => {
    // full tip amount
    const tip = userInfo.billAmount * tipPercent;

    const newTotal = tip + userInfo.billAmount;
    const splitTotal = newTotal / userInfo.people;
    const splitTip = tip / userInfo.people;

    setCalculate(true);
    setNewAmounts((prev) => ({
      ...prev,
      total: newTotal,
      singleTotal: splitTotal,
      singleTip: splitTip,
    }));
  };

  useEffect(() => {
    // useMemo here or after the amounts have been calculated?
    // ! gonna also need to run this if the billAmount, tipPercent, and numOfPeople change!
    if (userInfo.people != 0 && userInfo.people != null) {
      handleCalculations();
    }

    if (userInfo.billAmount != 0 && tipPercent != 0 && userInfo.people === 0) {
      console.log("Can't be zero!");
    }
  }, [userInfo]);
  return (
    <>
      <div>
        <h1>Tip Calculator</h1>
        <input
          type="number"
          id="billInput"
          className="border border-amber-200"
          placeholder="0"
          onChange={(e) =>
            setUserInfo((prev) => ({
              ...prev,
              billAmount: Number(e.target.value),
            }))
          }
        />
        {/* tip amounts */}
        <div>
          {tipAmounts.map((amount) => (
            <button
              key={amount}
              className="border border-green-300"
              onClick={() => setTipPercent(amount / 100)}
            >
              {amount}%
            </button>
          ))}
          <input
            type="number"
            id="tipInput"
            placeholder="0"
            className="border border-green-200"
            onChange={(e) => setTipPercent(Number(e.target.value) / 100)}
          />
        </div>

        <input
          type="number"
          id="peopleInput"
          placeholder="0"
          className="border border-blue-200"
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, people: Number(e.target.value) }))
          }
        />
        <button className=" bg-pink-200" onClick={handleCalculations}>
          Calculate
        </button>
        {/* info calculated */}
        <div>
          <p>Bill Amount: {userInfo.billAmount}</p>
          <p>Tip Percent: {tipPercent}</p>
          <p>Num of People: {userInfo.people}</p>
        </div>
        {calculate && (
          <div>
            <p>New Total: {newAmounts.total.toFixed(2)}</p>
            <p>Split Tip: {newAmounts.singleTip.toFixed(2)}</p>
            <p>Split Total: {newAmounts.singleTotal.toFixed(2)}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
