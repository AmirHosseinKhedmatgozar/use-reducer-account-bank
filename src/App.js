import { useEffect, useReducer } from "react";
import "./styles.css";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  deposite: 0,
  withdraw: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...initialState, isActive: true };
    case "openAccount":
      return { ...state, isActive: !state.isActive, balance: 500 };
    case "deposite":
      return {
        ...state,
        deposite: action.payload,
      };
    case "withdraw":
      return {
        ...state,
        withdraw: action.payload,
      };
    case "balanceDeposite":
      return { ...state, balance: state.balance + state.deposite, deposite: 0 };
    case "balanceWithdraw":
      return { ...state, balance: state.balance - state.withdraw, withdraw: 0 };
    case "requestLoan":
      return {
        ...state,
        balance: state.balance + action.payload,
        loan: action.payload,
      };
    case "payLoan":
      return {
        ...state,
        balance: state.balance - action.payload,
        loan: state.loan - action.payload,
      };
    case "closeAccount":
      return { ...initialState, isActive: true };
    default:
      throw new Error("NOT CONECTION");
  }
}
export default function App() {
  const [{ balance, loan, isActive, deposite, withdraw }, dispatch] =
    useReducer(reducer, initialState);

  const disabled = isActive ? true : false;
  // let isLoan = loan > 0 ? true : false;

  useEffect(function () {
    dispatch({ type: "start" });
  }, []);

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "openAccount" });
          }}
          disabled={!disabled}
        >
          Open account
        </button>
      </p>
      <p>
        <input
          type="text"
          value={deposite}
          onChange={(e) => {
            dispatch({ type: "deposite", payload: Number(e.target.value) });
          }}
          disabled={disabled}
        />
        <button
          onClick={() => {
            dispatch({ type: "balanceDeposite" });
          }}
          disabled={disabled}
        >
          Deposit
        </button>
      </p>
      <p>
        <input
          type="text"
          value={withdraw}
          onChange={(e) => {
            dispatch({ type: "withdraw", payload: Number(e.target.value) });
          }}
          disabled={disabled}
        />
        <button
          onClick={() => {
            dispatch({ type: "balanceWithdraw" });
          }}
          disabled={disabled}
        >
          Withdraw
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            loan <= 0 && dispatch({ type: "requestLoan", payload: 5000 });
          }}
          disabled={disabled}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            loan >= 5000 && dispatch({ type: "payLoan", payload: 5000 });
          }}
          disabled={disabled}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            balance === 0 && dispatch({ type: "closeAccount" });
          }}
          disabled={disabled}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
