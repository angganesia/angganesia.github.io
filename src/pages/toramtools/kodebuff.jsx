import React, { useState } from "react";
import kodeBuff from "@datas/toramonline/kodebuff.json";
import TombolMenu from "@components/TombolMenu";

export default function KodeBuff() {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  const filteredBuff = kodeBuff.buffs.filter((buff) => {
    return buff.type.toUpperCase().includes(search.toUpperCase());
  });

  return (
    <>
      <h2>Kode Buff</h2>
      <input
        className="input"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari buff ..."
      />
      <p>Tekan kode buff untuk copy code</p>
      <p className="noteInfo">
        Jika menemukan kode yang sering kosong, salah kode atau masukan kode yang belum ada, silahkan chat ke <a href="https://wa.me/6289676091927?text=*%23KODEBUFF*%0A%0A">sini</a>
      </p>
      <div className="kodebufflist">
        <table>
          <tbody>
            {filteredBuff.map((buff, index) => (
              <div
                className="mt"
                key={index}>
                <th
                  className="text-center"
                  colspan="2">
                  {buff.type}
                </th>
                {buff.codes
                  .sort((a, b) => b.level - a.level)
                  .map((code, codeIndex) => (
                    <tr key={codeIndex}>
                      <th className="">Level {code.level}</th>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => handleCopy(code.code)}>
                        {code.code}
                      </td>
                    </tr>
                  ))}
              </div>
            ))}
          </tbody>
        </table>
      </div>
    
      <TombolMenu
        to="/toramtools"
        text="Back Toram Online Tools"
      />
    </>
  );
}
