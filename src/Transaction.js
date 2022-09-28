import "./Transaction.css";

function Transaction(props) {
  const data = props.item;
  return (
    <ul>
      {data.map((element) => {
        return (
          <li>
            <span
              className={
                element.amount < 0 ? "expense list-ex" : "income list-in"
              }
            >
              <span className="title">{element.title}</span>
              <span style={{ color: element.amount >= 0 ? "green" : "red" }}>
                {element.amount}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default Transaction;
