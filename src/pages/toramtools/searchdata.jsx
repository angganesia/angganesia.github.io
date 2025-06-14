import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import normalMobs from "@datas/toramonline/normal_monster.json";
import bosMobs from "@datas/toramonline/bos_monster.json";
import miniBosMobs from "@datas/toramonline/miniBos_monster.json";
import equipmentsData from "@datas/toramonline/equipments.json";
import TombolMenu from "@components/TombolMenu";
import Pagination from "@components/Pagination";

export default function searchData() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const [search, setSearch] = useState(name || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("all");
  const [element, setElement] = useState("");
  const [bossType, setBossType] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [stat, setStat] = useState("");
  const [valueOperator, setValueOperator] = useState("");
  const [value, setValue] = useState("");
  const [show, setShow] = useState({});
  const itemsPerPage = 10;

  const handleCollapse = (index) => {
    setShow((prevShow) => ({
      ...prevShow,
      [index]: !prevShow[index]
    }));
  };

  const allMobs = [
    ...normalMobs.map((i) => ({ ...i, types: "Normal" })),
    ...miniBosMobs.map((i) => ({ ...i, types: "Mini Boss" })),
    ...bosMobs.map((i) => ({ ...i, types: "Boss" })),
    ...equipmentsData.map((i) => ({ ...i, types: "Equipments" }))
  ];

  const types = ["all", ...new Set(allMobs.map((item) => item.types))];
  const equipmentsType = [...new Set(equipmentsData.map((item) => item.type))];

  const bossTypes = [...new Set(bosMobs.map((item) => item.type))];

  const elements = [...new Set([...normalMobs, ...miniBosMobs, ...bosMobs].map((item) => item.element))];
  const stats = [...new Set(equipmentsData.flatMap((item) => item.stats.map((stat) => stat.stat)))];

  {
    /*const filteredItems = allMobs.filter((item) => {
    const matchType = type === "all" || item.types.toLowerCase().includes(type.toLowerCase());
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());

    return matchType && matchSearch;
  });*/
  }

  const filteredItems = allMobs.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchType = type === "all" || item.types.toLowerCase().includes(type.toLowerCase());
    const matchElement = element === "" || item.element === element;

    let matchEquipmentType = true;
    if (type === "equipments" && equipmentType !== "") {
      matchEquipmentType = item.type === equipmentType;
    }

    let matchStat = true;
    if (type === "equipments" && stat !== "" && valueOperator !== "" && value !== "") {
      matchStat = item.stats && item.stats.some((s) => s.stat === stat && eval(`${s.value} ${valueOperator} ${value}`));
    }

    if (type === "normal" || type === "boss" || type === "mini boss") {
      return matchSearch && matchType && matchElement;
    } else if (type === "equipments") {
      return matchSearch && matchType && matchEquipmentType && matchStat;
    } else {
      return matchSearch && matchType;
    }
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
    if (type === "normal" || type === "mini boss" || type === "boss") {
      setEquipmentType("");
      setStat("");
      setValueOperator("");
      setValue("");
    } else if (type === "equipments") {
      setElement("");
      setBossType("");
    }
  }, [search, type]);

  return (
    <>
      <div id="up"></div>
      <h2>
        Total Data {type === "normal" ? "normal monster" : type === "all" ? "all monster" : type} {filteredItems.length}
      </h2>
      <input
        className="input"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari monster ..."
      />
      <p className="noteInfo">
        Jika menemukan informasi yang salah atau monster yang tidak tersedia, silahkan chat ke <a href="https://wa.me/6289676091927?text=*%23ITEMS*%0A%0A">sini</a>
      </p>

      <select
        className="select"
        value={type}
        onChange={(e) => setType(e.target.value)}>
        {types.map((option) => (
          <option
            key={option}
            value={option === "all" ? option : option.toLowerCase()}>
            {option === "all" ? "All" : option}
          </option>
        ))}
      </select>

      {type === "normal" || type === "mini boss" || type === "boss" ? (
        <>
          <select
            className="select"
            value={element}
            onChange={(e) => setElement(e.target.value)}>
            <option value="">All Elements</option>
            {elements.map((option) => (
              <option
                key={option}
                value={option}>
                {option}
              </option>
            ))}
          </select>
        </>
      ) : type === "equipments" ? (
        <>
          <select
            className="select"
            value={equipmentType}
            onChange={(e) => setEquipmentType(e.target.value)}>
            <option value="">All Types</option>
            {equipmentsType.map((option) => (
              <option
                key={option}
                value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            className="select"
            value={stat}
            onChange={(e) => setStat(e.target.value)}>
            <option value="">All Stats</option>
            {stats.map((option) => (
              <option
                key={option}
                value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            className="select"
            value={valueOperator}
            onChange={(e) => setValueOperator(e.target.value)}>
            <option value="">Select Operator</option>
            <option value=">">{` > `}</option>
            <option value="<">{` < `}</option>
            <option value=">=">{` >= `}</option>
            <option value="<=">{` <= `}</option>
          </select>
          <input
            className="input"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </>
      ) : null}

      <Pagination
        currentPage={currentPage}
        paginate={paginate}
        filteredItems={filteredItems}
        itemsPerPage={itemsPerPage}
      />

      {currentItem.map((item, index) => (
        <div
          key={index}
          className="collapse-container">
          <button
            className="collapse-button"
            onClick={() => handleCollapse(index)}>
            {item.name}
            {index}
            {equipmentsType.includes(item.type) ? ` [ ${item.type} ]` : bossTypes.includes(item.type) ? ` ${item.type}` : item.type === "-" ? "" : ` ${item.type}`}
          </button>
          {show[index] && (
            <div className="collapse-content">
              <ul>{type === "all" || type === "normal" || type === "mini boss" || type === "boss" ? <p> tes</p> : type === "equipments" ? <p>equipments</p> : null}</ul>
            </div>
          )}
        </div>
      ))}

      <Pagination
        currentPage={currentPage}
        paginate={paginate}
        filteredItems={filteredItems}
        itemsPerPage={itemsPerPage}
      />

      <TombolMenu
        to="toramtools"
        text="Back Toram Online Tools"
      />
    </>
  );
}
