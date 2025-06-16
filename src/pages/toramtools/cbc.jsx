import React, { useState } from "react";
import TombolMenu from "@components/TombolMenu";

export default function Cbc() {
  const [price, setPrice] = useState("");
  const [tax, setTax] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  const handleCalculate = () => {
    if (price === "" || isNaN(price)) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    const taxAmountNonVIP = Math.floor(price * (10 / 100));
    const profitNonVIP = price - taxAmountNonVIP;
    const taxAmountVIP = Math.floor(price * (4 / 100));
    const profitVIP = price - taxAmountVIP;
    const globalPrice = Math.floor(price * (tax / 100) + price);

    setResult({
      taxAmountNonVIP,
      profitNonVIP,
      taxAmountVIP,
      profitVIP,
      globalPrice
    });
  };

  const taxOptions = Array.from({ length: 21 }, (_, i) => (
    <option
      key={i}
      value={i}>
      {i}%
    </option>
  ));

  return (
    <>
      <h2>Consignment Board Calculator</h2>
      <div className="boxCbc">
        <label>Harga Jual:</label>
        <input
          className="input"
          type="number"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          placeholder="100000"
          style={{ "box-shadow": error ? "0 0 10px red" : "0 0 10px rgba(0, 0, 0, 0.4" }}
        />
        <label>Pajak Global:</label>
        <select
          className="select"
          value={tax}
          onChange={(e) => setTax(parseInt(e.target.value))}>
          {taxOptions}
        </select>
        <button
          className="button"
          onClick={handleCalculate}>
          Hitung
        </button>
        <p
          style={{
            "box-shadow": "0 0 10px rgba(0, 0, 0, 0.8)",
            "border-radius": "5px",
            "font-weight": "bold",
            padding: "10px 20px",
            width: "100%",
            "background-color": "red",
            color: "white",
            "text-align": "center",
            display: error ? "" : "none"
          }}>
          Isi harga jual !!
        </p>
      </div>
      {result && (
        <div className="resultCbc">
          <div className="">
            <p>Tanpa VIP Tiket:</p>
            <p>Fee: {result.taxAmountNonVIP.toLocaleString()}</p>
            <p>Laba: {result.profitNonVIP.toLocaleString()}</p>
          </div>
          <hr />
          <div className="">
            <p>Dengan VIP Tiket:</p>
            <p>Fee: {result.taxAmountVIP.toLocaleString()}</p>
            <p>Laba: {result.profitVIP.toLocaleString()}</p>
          </div>
          <hr />
          <div className="">
            <p>GLOBAL:</p>
            <p>Harga yang tampil di board: {result.globalPrice.toLocaleString()}</p>
          </div>
        </div>
      )}
      <TombolMenu
        to="/toramtools"
        text="Back Toram Online Tools"
      />
    </>
  );
}
