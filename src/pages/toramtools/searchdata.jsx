import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import bosMobs from "@datas/toramonline/bos_monster.json";
import equipmentsData from "@datas/toramonline/equipments.json";
import miniBosMobs from "@datas/toramonline/miniBos_monster.json";
import normalMobs from "@datas/toramonline/normal_monster.json";
import registletsData from "@datas/toramonline/registlets.json";
import usableItemsData from "@datas/toramonline/usable_items.json";
import xtallsData from "@datas/toramonline/xtalls.json";
import renderCollapseContent from "@libs/renderCollapseContent";
import TombolMenu from "@components/TombolMenu";
import CollapseMenu from "@components/CollapseMenu";
import Pagination from "@components/Pagination";

export default function searchData() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const [search, setSearch] = useState(name || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("all");
  const [element, setElement] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [stat, setStat] = useState("");
  const [valueOperator, setValueOperator] = useState("");
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const itemsPerPage = 10;

  const handleCollapse = (index) => {
    setShow((prevShow) => ({
      ...prevShow,
      [index]: !prevShow[index]
    }));
  };

  const allDataBase = [
    ...bosMobs.map((i) => ({ ...i, types: "Boss" })),
    ...equipmentsData.map((i) => ({ ...i, types: "Equipments" })),
    ...miniBosMobs.map((i) => ({ ...i, types: "Mini Boss" })),
    ...normalMobs.map((i) => ({ ...i, types: "Normal" })),
    ...registletsData.map((i) => ({ ...i, types: "Registlet" })),
    ...usableItemsData.map((i) => ({ ...i, types: "Usable Items" })),
    ...xtallsData.map((i) => ({ ...i, types: "Xtall" }))
  ];

  const types = ["all", ...new Set(allDataBase.map((item) => item.types))];

  const equipmentsType = [...new Set(equipmentsData.map((item) => item.type))];

  const bossTypes = [...new Set(bosMobs.map((item) => item.type))];

  const elements = [...new Set([...normalMobs, ...miniBosMobs, ...bosMobs].map((item) => item.element))];

  const stats = [...new Set(equipmentsData.flatMap((item) => item.stats.map((stat) => stat.stat)))];

  const filteredItems = allDataBase.filter((item) => {
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
  {
    /*
    .sort((a, b) => {
      if (stat === "") {
        const getBase = (item) => {
          const statFilter = item.stats.find((s) => s.stat === `${stat}`);
          return statFilter ? parseInt(statFilter.value) : 0;
        };
        return getBase(b) - getBase(a);
      } else {
        return 0;
      }
    });*/
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const element = document.getElementById("up");
    element.scrollIntoView({ behavior: "smooth" });
  };

  const resetX = {
    currentPage,
    search,
    setSearch,
    type,
    setType,
    element,
    equipmentType,
    stat,
    valueOperator,
    value,
    equipmentsType
  };

  useEffect(() => {
    setShow(false);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setShow(false);
    if (type === "normal" || type === "mini boss" || type === "boss") {
      setEquipmentType("");
      setStat("");
      setValueOperator("");
      setValue("");
    } else if (type === "equipments") {
      setElement("");
    }
    setEquipmentType("");
      setStat("");
      setValueOperator("");
      setValue("");
      setElement("");
  }, [search, type, element, equipmentType, stat, valueOperator, value]);

  return (
    <>
      <div id="up"></div>
      <h2>
        Total Data {type === "normal" ? "normal mobs" : type} {filteredItems.length}
      </h2>
      {/*`TES : ${equipmentsType}`*/}
      <input
        className="input"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari data ..."
      />
      <p className="noteInfo">
        Jika menemukan informasi yang salah atau data yang tidak tersedia, silahkan chat ke <a href="https://wa.me/6289676091927?text=*%23DATA*%0A%0A">sini</a>
      </p>
      {/*
        filter
        */}

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
          {stat && (
            <div className="grid-2">
              <select
                className="select"
                value={valueOperator}
                onChange={(e) => setValueOperator(e.target.value)}>
                <option value="">Select Operator</option>
                <option value=">=">{` > `}</option>
                <option value="<=">{` < `}</option>
              </select>
              <input
                className="input"
                type="number"
                value={value}
                placeholder="Enter value ..."
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          )}
        </>
      ) : null}

      {/*
        data
        */}
      {currentItem >= 0 ? (
        <p className="noteInfo">Tidak ada data</p>
      ) : (
        <>
          <Pagination
            currentPage={currentPage}
            paginate={paginate}
            filteredItems={filteredItems}
            itemsPerPage={itemsPerPage}
          />

          {currentItem.map((item, index) => (
            <CollapseMenu
              title={
                <>
                  {item.name}
                  {equipmentsType.includes(item.type) ? ` [ ${item.type} ]` : bossTypes.includes(item.type) ? ` ${item.type}` : item.type === "-" ? "" : ` [${item.type || item.types}]`}
                  {item.element === "Unknown" ? "" : elements.includes(item.element) ? ` [ ${item.element} ]` : ""}
                  {item.obtained_from && item.obtained_from[0] && item.obtained_from[0].source.includes("[Player]")
                    ? ` [Player]`
                    : item.obtained_from && item.obtained_from[0] && item.obtained_from[0].source.includes("[NPC]")
                    ? ` [NPC]`
                    : ""}
                </>
              }
              isOpen={show[index]}
              onToggle={() => handleCollapse(index)}
              comp={resetX}>
              {renderCollapseContent(item, resetX)}
            </CollapseMenu>
          ))}

          <Pagination
            currentPage={currentPage}
            paginate={paginate}
            filteredItems={filteredItems}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
      {/* tombol back */}
      <TombolMenu
        to="/toramtools"
        text="Back Toram Online Tools"
      />
    </>
  );
}
