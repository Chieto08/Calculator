const e = React.createElement;


const intialState = {
  current: "0",
  total: "0",
  isInitial: true,
  operator: "+",
  prevAction: "number",
};

function Calculator() {
  const [calc, setCalc] = React.useState(intialState);
  function handleNumber(value) {
    let newValue = value;
    if (!calc.isInitial) {
      newValue = +calc.current + value;
    }

    setCalc({
      current: newValue,
      total: calc.total,
      isInitial: false,
      operator: calc.operator,
      prevAction: "number",
    });
  }

  function doCalculation() {
    let total = parseInt(calc.total);

    switch (calc.operator) {
      case "*":
        total *= parseInt(calc.current);
        break;
      case "/":
        total /= parseInt(calc.current);
        break;
      case "+":
        total += parseInt(calc.current);
        break;
      case "-":
        total -= parseInt(calc.current);
        break;
      default:
        total = parseInt(calc.current);
    }

    return total;
  }

  function handleOperator(value) {
    const prevCalc = {
      current: calc.total,
      total: calc.total,
      isInitial: true,
      operator: value,
      prevAction: "op",
    };

    if (calc.prevAction === "number") {
      let total = doCalculation();
      setCalc({
        ...prevCalc,
        total: total,
        current: total,
      });
    } else {
      setCalc({
        ...prevCalc,
        operator: value,
      });
    }
  }

  function handleEquals() {
    let total = doCalculation();
    setCalc(initialState);
  }

  function handleClear() {
    setCalc(intialState);
  }

  function renderDisplay() {
    return calc.current;
  }

  return (
    <div className="calculator">
      <div className="display">{renderDisplay()}</div>
      <CalcButton value="7" onClick={handleNumber} />
      <CalcButton value="8" onClick={handleNumber} />
      <CalcButton value="9" onClick={handleNumber} />
      <CalcButton className="operator" value="/" onClick={handleOperator} />

      <CalcButton value="4" onClick={handleNumber} />
      <CalcButton value="5" onClick={handleNumber} />
      <CalcButton value="6" onClick={handleNumber} />
      <CalcButton className="operator" value="*" onClick={handleOperator} />

      <CalcButton value="1" onClick={handleNumber} />
      <CalcButton value="2" onClick={handleNumber} />
      <CalcButton value="3" onClick={handleNumber} />
      <CalcButton className="operator" value="-" onClick={handleOperator} />

      <CalcButton value="C" onClick={handleClear} />
      <CalcButton value="0" onClick={handleNumber} />
      <CalcButton value="=" onClick={handleEquals} />
      <CalcButton className="operator" value="+" onClick={handleOperator} />
    </div>
  );
}

function CalcButton(props) {
  return (
    <button
      className={props.className}
      onClick={() => props.onClick(props.value)}
    >
      {props.value}
    </button>
  );
}

const root = React.createElement("div", { className: "app-container"}, <Calculator/>);
ReactDOM.render(root, document.getElementById("root"));
// ReactDOM.render(
//   <div className="app-container">
//     <Calculator />
//   </div>,
//   document.getElementById("root")
// );
