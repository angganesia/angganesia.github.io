import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import normalMobs from "@datas/toramonline/normal_monster.json";
import bosMobs from "@datas/toramonline/bos_monster.json";
import miniBosMobs from "@datas/toramonline/miniBos_monster.json";
import TombolMenu from "@components/TombolMenu";
import "@css/toramtools/monsters.css";

export default function monstersDatas() {
  const allMobs = [...normalMobs.map((mob) => ({ ...mob, types: "Normal" })), ...miniBosMobs.map((mob) => ({ ...mob, types: "Mini Boss" })), ...bosMobs.map((mob) => ({ ...mob, types: "Boss" }))];
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const [search, setSearch] = useState(name || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("all");
  const itemsPerPage = 10;

  const filteredItems = allMobs.filter((item) => {
    const matchType = type === "all" || item.types.toLowerCase().includes(type.toLowerCase());
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());

    return matchType && matchSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const element = document.getElementById("up");
    element.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, type]);

  return (
    <>
      <div id="up"></div>
      <h2>
        Total Data {type === "normal" ? "normal monster" : type === "all" ? "all monster" : type} {filteredItems.length}
      </h2>
      <input
        className="searchKodeItems"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari monster ..."
      />
      <p className="noteKodeItems">
        Jika menemukan informasi yang salah atau monster yang tidak tersedia, silahkan chat ke <a href="https://wa.me/6289676091927?text=*%23ITEMS*%0A%0A">sini</a>
      </p>

      <select
      className="select"
        value={type}
        onChange={(e) => setType(e.target.value)}>
        <option value="all">All</option>
        <option value="normal">Normal</option>
        <option value="mini boss">Mini Bos</option>
        <option value="boss">Bos</option>
      </select>

      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}>
          <i className="fas fa-chevron-left"></i>
        </button>
        {currentPage > 1 && (
          <>
            <button onClick={() => paginate(1)}>1</button>
            <span>...</span>
          </>
        )}
        <button
          className={currentPage === currentPage ? "active" : ""}
          onClick={() => paginate(currentPage)}>
          {currentPage}
        </button>
        {currentPage < Math.ceil(filteredItems.length / itemsPerPage) - 0 && (
          <>
            <span>...</span>
            <button onClick={() => paginate(Math.ceil(filteredItems.length / itemsPerPage))}>{Math.ceil(filteredItems.length / itemsPerPage)}</button>
          </>
        )}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {currentItem.map((item, index) => (
        <div
          className="itemBox"
          key={index}>
          <h3>
            {item.name}
            {item.type === "-" ? "" : ` ${item.type}`}
          </h3>
          <hr />
          <p>• Level: {item.level}</p>
          <p>• Hp: {parseInt(item.hp).toLocaleString()}</p>
          <p>• Element: {item.element}</p>
          <p>• Exp: {parseInt(item.exp).toLocaleString()}</p>
          <p>• Tamable: {item.tamable}</p>
          <hr />
          <p>• Spawn at: {item.spawn_at}</p>
          {item.drops.length > 0 && (
            <>
              <hr />
              <h4>Drops:</h4>
              <ul>
                {item.drops.map((drop, dropIndex) => (
                  <li
                    key={dropIndex}
                    className="itemLi">
                    •{" "}
                    {[
                      "1 Handed Sword",
                      "2 Handed Sword",
                      "Additional",
                      "Arrow",
                      "Armor",
                      "Bow",
                      "Bowgun",
                      "Dagger",
                      "Knuckles",
                      "Magic Device",
                      "Shield",
                      "Special",
                      "Staff",
                      "Halberd",
                      "Katana"
                    ].some((word) => drop.includes(word)) ? (
                      <a
                        href={`#/toramtools/equipments?name=${drop.replace(/\[.*?]/g, "").trim()}`}
                        rel="noopener noreferrer">
                        {drop}
                      </a>
                    ) : (
                      <span>{drop}</span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}

      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}>
          <i className="fas fa-chevron-left"></i>
        </button>
        {currentPage > 1 && (
          <>
            <button onClick={() => paginate(1)}>1</button>
            <span>...</span>
          </>
        )}
        <button
          className={currentPage === currentPage ? "active" : ""}
          onClick={() => paginate(currentPage)}>
          {currentPage}
        </button>
        {currentPage < Math.ceil(filteredItems.length / itemsPerPage) - 0 && (
          <>
            <span>...</span>
            <button onClick={() => paginate(Math.ceil(filteredItems.length / itemsPerPage))}>{Math.ceil(filteredItems.length / itemsPerPage)}</button>
          </>
        )}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <TombolMenu
        to="toramtools"
        text="Back Toram Online Tools"
      />
    </>
  );
}
