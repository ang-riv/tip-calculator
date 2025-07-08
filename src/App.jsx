import { useState, useEffect, useRef } from "react";
import logo from "./assets/logo.svg";
import dollar from "./assets/icon-dollar.svg";
import person from "./assets/icon-person.svg";
import { useWindowSize } from "@uidotdev/usehooks";
import fitty from "fitty";
function App() {
  const [userInfo, setUserInfo] = useState({ billAmount: 0, people: null });
  const [tipPercent, setTipPercent] = useState(null);
  const [billFocus, setBillFocus] = useState(false);
  const [peopleFocus, setPeopleFocus] = useState(false);
  const [newAmounts, setNewAmounts] = useState({
    total: 0.0,
    singleTotal: 0.0,
    singleTip: 0.0,
  });
  const [selectedTip, setSelectedTip] = useState(null);
  const [peopleError, setPeopleError] = useState({
    mobile: true,
    desktop: true,
  });
  const billRef = useRef(null);
  const nameRef = useRef(null);

  const singleTipRef = useRef(null);
  const singleTotalRef = useRef(null);
  const size = useWindowSize();

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

  const tipAmounts = [5, 10, 15, 25, 50];

  const handleCalculations = () => {
    const tip = userInfo.billAmount * tipPercent;

    const newTotal = tip + userInfo.billAmount;
    const splitTotal = newTotal / userInfo.people;
    const splitTip = tip / userInfo.people;

    setNewAmounts((prev) => ({
      ...prev,
      total: newTotal,
      singleTotal: splitTotal,
      singleTip: splitTip,
    }));
  };

  useEffect(() => {
    if (
      userInfo.people != 0 &&
      userInfo.people != null &&
      userInfo.billAmount != 0 &&
      tipPercent != null
    ) {
      handleCalculations();
    }

    if (nameRef.current) {
      if (nameRef.current.value < 1 && nameRef.current.value != "") {
        size.width < 425
          ? setPeopleError({ mobile: false, desktop: true })
          : setPeopleError({ mobile: true, desktop: false });
      } else if (nameRef.current.value >= 1) {
        setPeopleError({ mobile: true, desktop: true });
      }
    }

    // make totals fit inside the container
    const resizeSingle = fitty(singleTipRef.current, {
      minSize: 12,
      maxSize: 48,
    });
    const resizeTotal = fitty(singleTotalRef.current, {
      minSize: 12,
      maxSize: 48,
    });

    resizeSingle.fit();
    resizeTotal.fit();

    return () => {
      resizeSingle.unsubscribe();
      resizeTotal.unsubscribe();
    };
  }, [userInfo, nameRef, tipPercent, singleTipRef, singleTotalRef]);

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
        if (nameRef.current.value >= 1 || nameRef.current.value === "") {
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
    <>
      <div className="bg-grey-200 overflow-y-scroll w-screen h-fit xs:h-screen flex flex-col items-center justify-center">
        <header className="h-[8.75em] min-xs:h-2/10 w-full flex justify-center items-center">
          <h1 className="sr-only">Tip Calculator</h1>
          <img
            src={logo}
            alt="main site logo"
            className="w-[5.625em] h-[3.438em]"
          />
        </header>
        <main className="bg-white h-fit w-full rounded-t-2xl py-5 px-6 flex flex-col justify-around items-center xs:max-w-lg md:max-w-[46.75em] md:flex-row md:shadow-[1px_3px_20px_0px_rgb(161,194,197)] rounded-2xl md:h-[28.125em] lg:max-w-[56.25em] lg:h-[31.25em]">
          {/* input section */}
          <section className="h-6/10 flex flex-col justify-around max-w-md md:h-full md:w-5/10 md:mr-5">
            {/* bill section */}
            <div className="section-margins">
              <label htmlFor="billInput">Bill</label>
              <div className={inputStyle("bill")} tabIndex={0}>
                <img src={dollar} alt="dollar icon" className="h-4 w-3" />
                <input
                  ref={billRef}
                  onFocus={() => setBillFocus(true)}
                  onBlur={() => setBillFocus(false)}
                  type="number"
                  id="billInput"
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
            {/* select tip section */}
            <div className="w-full section-margins">
              <label htmlFor="tipInput">Select Tip %</label>
              <div className="w-full flex justify-center ">
                <div className="section-div flex flex-wrap gap-3 justify-center max-w-[31.25em] ">
                  {tipAmounts.map((amount) => (
                    <button
                      key={amount}
                      className={`min-w-[130px] lg:min-w-[130px] text-2xl py-2.5 rounded-md md:min-w-[160px] ${
                        selectedTip === amount
                          ? "bg-grey-200 text-green-900"
                          : "bg-green-900 text-grey-50"
                      } bg-green-900 hover:text-green-900 hover:cursor-pointer hover:bg-grey-200`}
                      onClick={() => handleSelect(amount)}
                    >
                      {amount}%
                    </button>
                  ))}
                  <input
                    type="number"
                    id="tipInput"
                    min={2}
                    max={30}
                    placeholder="Custom"
                    className="bg-grey-50 w-[130px] text-2xl p-1 text-center rounded-md focus:outline-green-primary text-green-900 focus:text-right md:min-w-[160px] lg:min-w-[130px]"
                    onChange={(e) =>
                      setTipPercent(Number(e.target.value) / 100)
                    }
                  />
                </div>
              </div>
            </div>
            {/* people section */}
            <div className="section-margins">
              <div className="flex w-full justify-between">
                <label htmlFor="peopleInput">Number of People</label>
                <p className="text-red" hidden={peopleError.desktop}>
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
              <p className="mt-1.5 text-red" hidden={peopleError.mobile}>
                Can't be zero.
              </p>
            </div>
          </section>
          {/* output section */}
          <section className="bg-green-900 w-full px-5 pb-6 pt-8 min-h-58 flex flex-col justify-between rounded-lg max-w-md md:h-full md:w-5/10 md:p-10">
            <div>
              <div className="flex items-center mb-10">
                <div className="w-1/2">
                  <h2 className="text-grey-50">Tip Amount</h2>
                  <p className="text-grey-450 text-sm">/ person</p>
                </div>
                <div className="w-1/2 h-full">
                  <p
                    ref={singleTipRef}
                    className="text-2xl text-green-primary text-right md:text-5xl w-full h-full"
                  >
                    ${newAmounts.singleTip.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/2">
                  <h2 className="text-grey-50">Total</h2>
                  <p className="text-grey-450 text-sm">/ person</p>
                </div>
                <div className="w-1/2 h-full">
                  <p
                    ref={singleTotalRef}
                    className="text-2xl text-green-primary text-right md:text-5xl w-full h-full"
                  >
                    ${newAmounts.singleTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full mt-6 hover:bg-grey-200">
              <button
                onClick={handleReset}
                className="hover:cursor-pointer rounded-md py-2.5 w-full text-green-900 bg-green-primary text-center"
              >
                RESET
              </button>
            </div>
          </section>
        </main>
        <div className="text-sm mt-5 text-grey-550 text-center">
          <p>
            Challenge by{" "}
            <a
              href="https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX"
              target="_blank"
              className="text-green-900 hover:underline"
            >
              Frontend Mentor
            </a>
            . Coded by{" "}
            <a
              href="https://github.com/ang-riv"
              className="text-green-900 hover:underline"
            >
              Angela Rivera
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
