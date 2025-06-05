import { useState, useEffect } from "react";
function App() {
  const [userInfo, setUserInfo] = useState({ billAmount: 0, people: 0 });
  const [tipPercent, setTipPercent] = useState(0);
  const [calculate, setCalculate] = useState(false);
  const [newAmounts, setNewAmounts] = useState({
    total: 0,
    singleTotal: 0,
    singleTip: 0,
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
  return (
    <>
      <div>
        <h1>Tip Calculator</h1>
        <input
          type="number"
          id="billInput"
          className="border border-amber-200"
          placeholder="Enter bill amount..."
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
              className="border border-green-300"
              onClick={() => setTipPercent(amount / 100)}
            >
              {amount}%
            </button>
          ))}
          <input
            type="number"
            id="tipInput"
            placeholder="Enter tip amount..."
            className="border border-green-200"
            onChange={(e) => setTipPercent(Number(e.target.value) / 100)}
          />
        </div>

        <input
          type="number"
          id="peopleInput"
          placeholder="Enter number of people..."
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
