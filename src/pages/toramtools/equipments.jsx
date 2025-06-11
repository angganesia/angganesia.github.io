import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import items from "@datas/toramonline/equipments.json";
import TombolMenu from "@components/TombolMenu";
import "@css/toramtools/equipments.css";

export default function itemsDatas() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const [search, setSearch] = useState(name || "");
  const [selectType, setSelectType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const types = [...new Set(items.map((item) => item.type))];

  const filteredItems = selectType
    ? items.filter((item) => item.type === selectType)
    : items.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
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
    setSelectType(null);
  }, [search]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [selectType]);

  return (
    <>
      <div id="up"></div>
      <h2>Total Equipments {items.length}</h2>
      <input
        className="searchKodeItems"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari equipments ..."
      />
      <p className="noteKodeItems">
        Jika menemukan informasi yang salah atau equipments yang tidak tersedia, silahkan chat ke <a href="https://wa.me/6289676091927?text=*%23equipments*%0A%0A">sini</a>
      </p>
      <select
        className="select"
        onChange={(e) => setSelectType(e.target.value)}
        value={selectType || "All"}>
        <option value="">All</option>
        {types.map((type, typeIndex) => (
          <option
            key={typeIndex}
            value={type}>
            {type}
          </option>
        ))}
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
          <h3>{item.name}</h3>
          <hr />
          <p>• Type: {item.type}</p>
          <p>• Sell: {item.sell}</p>
          <p>• process: {item.process}</p>
          <hr />
          <h3>Stat:</h3>
          <ul>
            {item.stats.map((stat, statIndex) => (
              <>
                {stat.statOnly ? <h4>{stat.statOnly}:</h4> : null}
                <li
                  className="itemLi"
                  key={statIndex}>
                  • {stat.stat}: {stat.value}
                </li>
              </>
            ))}
          </ul>

          {item.obtained_from.length > 0 && (
            <>
              <hr />
              <h3>Obtained from:</h3>
              <div className="grid-obtained-from">
                <div className="grid-header">
                  <div>Source</div>
                  <div>Dye</div>
                  <div>Map</div>
                </div>
                {item.obtained_from.map((source, sourceIndex) => (
                  <div
                    key={sourceIndex}
                    className="grid-row">
                    <div>
                      {source.source.includes("Lv") ? (
                        <a
                          href={`#/toramtools/monsters?name=${source.source.replace(/\(Lv.*?\)/g, "")}`}
                          rel="noopener noreferrer">
                          {source.source}
                        </a>
                      ) : (
                        <span>{source.source}</span>
                      )}
                    </div>
                    <div>{source.dye}</div>
                    <div>{source.map === "-" || source.map === null ? "" : source.map}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {item.recipe.materials.length > 0 && (
            <>
              <hr />
              <h4>Recipe:</h4>
              <ul>
                <li className="itemLi">• Fee: {item.recipe.fee}</li>
                <li className="itemLi">• Set: {item.recipe.set}</li>
                <li className="itemLi">• Level: {item.recipe.level}</li>
                <li className="itemLi">• Difficulty: {item.recipe.difficulty}</li>
                <li className="itemLi">
                  <h4>Materials:</h4>
                  <ul>
                    {item.recipe.materials.map((material, materialIndex) => (
                      <li
                        className="itemLi"
                        key={materialIndex}>
                        • {material}
                      </li>
                    ))}
                  </ul>
                </li>
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
