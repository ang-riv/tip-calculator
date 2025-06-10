import { useState, useEffect, useRef } from "react";
import logo from "./assets/logo.svg";
import dollar from "./assets/icon-dollar.svg";
import person from "./assets/icon-person.svg";
function App() {
  const [userInfo, setUserInfo] = useState({ billAmount: 0, people: null });
  const [tipPercent, setTipPercent] = useState(null);
  const [calculate, setCalculate] = useState(false);
  const [billFocus, setBillFocus] = useState(false);
  const [peopleFocus, setPeopleFocus] = useState(false);
  const [newAmounts, setNewAmounts] = useState({
    total: 0.0,
    singleTotal: 0.0,
    singleTip: 0.0,
  });
  const [selectedTip, setSelectedTip] = useState(null);
  const billRef = useRef(null);
  const nameRef = useRef(null);

  const handleSelect = (amount) => {
    setSelectedTip((prev) => (prev === amount ? null : amount));
    setTipPercent(amount / 100);
  };

  const handleReset = () => {
    if (billRef.current) {
      billRef.current.value = "";
    }
    if (nameRef.current) {
      nameRef.current.value = "";
    }
    setUserInfo({ billAmount: 0, people: null });
    setNewAmounts({
      total: 0.0,
      singleTotal: 0.0,
      singleTip: 0.0,
    });
  };

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
    if (
      userInfo.people != 0 &&
      userInfo.people != null &&
      userInfo.people != 0
    ) {
      handleCalculations();
    }

    // only show if everything else has been filled in except for people or if it's 0
    if (userInfo.billAmount != 0 && tipPercent != 0 && userInfo.people === 0) {
      console.log("Can't be zero!");
    }
  }, [userInfo]);

  const inputStyle = (input) => {
    let outlineStyle = "";
    let errorStyle = "";
    let inputArea = false;

    if (nameRef.current) {
      errorStyle = nameRef.current.checkValidity();
    }

    if (input === "bill") {
      inputArea = billFocus;
    } else if (input === "name") {
      if (nameRef.current) {
        if (nameRef.current.value >= 2 || nameRef.current.value === "") {
          inputArea = peopleFocus;
          errorStyle = "";
        } else {
          errorStyle = "outline-2 outline-red";
        }
      }
    }

    if (inputArea === true) {
      outlineStyle = "outline-2 outline-green-primary";
    } else {
      outlineStyle = "";
    }
    return `section-div w-full flex items-center px-3 py-1 bg-grey-50 rounded-md ${outlineStyle} ${errorStyle}`;
  };

  return (
    <div className="bg-grey-200 w-screen h-screen">
      <header className="h-2/10 w-full flex justify-center items-center">
        <img src={logo} alt="logo" className="w-[90px] h-[55px]" />
      </header>
      <main className="bg-white h-full w-full rounded-t-2xl py-5 px-6 flex flex-col justify-around">
        <section className="h-6/10 flex flex-col justify-around">
          <div>
            <label htmlFor="billInput">Bill</label>
            <div className={inputStyle("bill")} tabIndex={0}>
              <img src={dollar} alt="dollar icon" className="h-4 w-3" />
              <input
                ref={billRef}
                onFocus={() => setBillFocus(true)}
                onBlur={() => setBillFocus(false)}
                type="number"
                name="billInput"
                className="w-full text-2xl text-right focus:outline-0 text-green-900"
                placeholder="0"
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    billAmount: Number(e.target.value),
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="tipInput">Select Tip %</label>
            <div className="section-div w-full flex flex-wrap gap-3 justify-center">
              {tipAmounts.map((amount) => (
                <button
                  name="tipInput"
                  key={amount}
                  className={`w-[130px] text-2xl py-1.5 rounded-md ${
                    selectedTip === amount
                      ? "bg-green-primary text-green-900"
                      : "bg-green-900 text-grey-50"
                  } bg-green-900 hover:text-green-900 hover:bg-green-primary`}
                  onClick={() => handleSelect(amount)}
                >
                  {amount}%
                </button>
              ))}
              <input
                type="number"
                name="tipInput"
                min={2}
                max={30}
                placeholder="Custom"
                className="bg-grey-50 w-[130px] text-2xl p-1 text-center rounded-md focus:outline-green-primary text-green-900 focus:text-right"
                onChange={(e) => setTipPercent(Number(e.target.value) / 100)}
              />
            </div>
          </div>
          <div>
            <div className="flex w-full justify-between">
              <label htmlFor="peopleInput">Number of People</label>
              <p className="text-red" hidden={true}>
                Can't be zero.
              </p>
            </div>
            <div className={inputStyle("name")} tabIndex={0}>
              <img src={person} alt="person icon" className="h-4 w-3" />
              <input
                ref={nameRef}
                type="number"
                id="peopleInput"
                placeholder="0"
                onFocus={() => setPeopleFocus(true)}
                onBlur={() => setPeopleFocus(false)}
                className="w-full text-2xl text-right focus:outline-0 text-green-900"
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    people: Number(e.target.value),
                  }))
                }
              />
            </div>
            <p className="mt-1.5 text-red" hidden={true}>
              Can't be zero.
            </p>
          </div>
        </section>
        <section className="bg-green-900 w-full px-5 pb-6 pt-8 min-h-58 flex flex-col justify-between rounded-lg">
          <div className="flex items-center">
            <div className="w-1/2">
              <p className="text-grey-50">Tip Amount</p>
              <p className="text-grey-400 text-sm">/ per person</p>
            </div>
            <div className="w-1/2">
              <p className="text-2xl text-green-primary text-right">
                ${newAmounts.singleTip.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-1/2">
              <p className="text-grey-50">Total</p>
              <p className="text-grey-400 text-sm">/ per person</p>
            </div>
            <div className="w-1/2">
              <p className="text-2xl text-green-primary text-right">
                ${newAmounts.singleTotal.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="w-full text-green-900 bg-green-primary text-center py-2 rounded-md">
            <button onClick={handleReset}>RESET</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
