import { useEffect, useState } from "react";
import "./App.css";
import "./style.css";
import Transaction from "./Transaction";
import FormComonent from "./components/FormComponent";
import DataContext from "./data/dataContext";
import ReportComponent from "./components/reportComponent";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const title = "โปรแกรมบัญชีรายรับ - รายจ่าย";
  var description = "บันทึกข้อมูลในแต่ละวัน";
  const [data, setData] = useState([
    {
      id: 1,
      title: "ค่าเช่าบ้าน",
      amount: -2000,
    },
    {
      id: 2,
      title: "เงินเดือน",
      amount: 100000,
    },
  ]);

  function onAddNewItem(newItem) {
    setData([newItem, ...data]);
  }

  const [reportIncome, setreportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);

  useEffect(() => {
    const amounts = data.map((data) => data.amount);
    const income = amounts
      .filter((element) => element > 0)
      .reduce((total_income, element) => (total_income += element), 0);
    const expense = amounts
      .filter((element) => element < 0)
      .reduce((total_expense, element) => (total_expense += element), 0);

    setreportIncome(income);
    setReportExpense(expense);
  }, [data, reportIncome, reportExpense]);

  const [showInput, setShowInput] = useState(true);
  function changeShowinput() {
    if (showInput) {
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  }

  const [showReport, setShowReport] = useState(true);
  function changeReport() {
    if (showReport) {
      setShowReport(false);
    } else {
      setShowReport(true);
    }
  }

  return (
    <DataContext.Provider
      value={{
        income: reportIncome,
        expense: reportExpense,
      }}
    >
      <div className="box">
        <h1>
          <span className="title">{title}</span>
        </h1>
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Routes>
              <Route path="/" element={<ReportComponent />}></Route>
              <Route
                path="/insert"
                element={<Transaction item={[...data]} />}
              ></Route>
            </Routes>
          </div>
        </Router>
        <p>{description}</p>
        <FormComonent onAddItem={onAddNewItem} />
        <div style={{ height: "50px" }}></div>
      </div>
    </DataContext.Provider>
  );
}

export default App;
