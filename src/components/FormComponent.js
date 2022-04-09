import { v4 as uuidv4 } from "uuid";
import "./FormComponent.css";
import { useState, useEffect } from "react";

function FormComonent(props) {
  const [Title, setTitle] = useState("");
  const [amount, setamount] = useState(0);
  const [formValid, setFormValid] = useState(false);

  function inputTitle(evernt) {
    setTitle(evernt.target.value);
  }
  function inputAmount(event) {
    setamount(event.target.value);
  }
  function saveItem(event) {
    event.preventDefault();
    const itemData = {
      id: uuidv4(),
      title: Title,
      amount: Number(amount),
    };
    props.onAddItem(itemData);
    setTitle("");
    setamount("");
    setFormValid(false);
  }

  useEffect(() => {
    const check_data = Title.trim().length > 0 && amount !== 0;
    setFormValid(check_data);
  }, [Title, amount]);

  return (
    <div>
      <form onSubmit={saveItem}>
        <div className="form-control">
          <label>ชื่อรายการ</label>
          <input
            type="text"
            placeholder="ระบุชื่อรายการของคุณ"
            name=""
            id="title_input"
            onChange={inputTitle}
            value={Title}
          />
        </div>
        <div className="form-control">
          <label>จำนวนเงิน</label>
          <input
            onChange={inputAmount}
            type="number"
            placeholder="( + รายรับ | -รายจ่าย)"
            name=""
            id="amount_input"
            value={amount}
          />
        </div>
        <div>
          <button className="btn" type="submit" disabled={!formValid}>
            เพิ่มข้อมูล
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormComonent;
