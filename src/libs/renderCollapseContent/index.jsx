import React from "react";
import { Link } from "react-router-dom";

export default function renderCollapseContent(item, comp) {
  const { currentPage, search, setSearch, type, setType, element, equipmentType, stat, valueOperator, value, equipmentsType } = comp;

  if (item.types === "Xtall") {
    return (
      <table>
        <tbody>
          <tr>
            <th>Sell</th>
            <td>{item.sell}</td>
          </tr>
          <tr>
            <th>Process</th>
            <td>{item.process}</td>
          </tr>
          {item.stats.length > 0 && (
            <>
              <th
                className="center-th"
                colspan="2">
                Status
              </th>
              {item.stats.map((stat, index) => (
                <>
                  {stat.statOnly && (
                    <tr key={`${index}-header`}>
                      <th colspan="2">{stat.statOnly}</th>
                    </tr>
                  )}
                  {stat.stat && stat.value && (
                    <tr key={index}>
                      <th>{stat.stat}</th>
                      {stat.stat === "Upgrade for" ? (
                        <td>
                          <Link
                            onClick={() => {
                              setSearch(stat.value);
                              setType("xtall");
                            }}>
                            {stat.value}
                          </Link>
                        </td>
                      ) : (
                        <td>{stat.value}</td>
                      )}
                    </tr>
                  )}
                </>
              ))}
              {item.obtained_from.length > 0 && (
                <>
                  <th>Source</th>
                  <th>Map</th>
                  {item.obtained_from.map((from, index) => (
                    <>
                      <tr key={index}>
                        {from.source.includes("Lv") ? (
                          <td>
                            <Link
                              onClick={() => {
                                setType("");
                                setSearch(cari.replace(/\(Lv.*?\)/g, "").trim());
                              }}>
                              {from.source}
                            </Link>
                          </td>
                        ) : (
                          <td>{from.source}</td>
                        )}
                        <td>{from.map}</td>
                      </tr>
                    </>
                  ))}
                </>
              )}
              {item.used_for &&
                item.used_for.map((used, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <th
                        className="center-th"
                        colSpan={2}>
                        {used.label}
                      </th>
                    </tr>
                    {used.datas.map((data, idx) => (
                      <tr key={idx}>
                        {used.label === "Upgrade Into" ? (
                          <td colSpan={2}>
                            <Link
                              onClick={() => {
                                setType("xtall");
                                setSearch(data);
                              }}>
                              {data}
                            </Link>
                          </td>
                        ) : (
                          <td colSpan={2}>{data}</td>
                        )}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
            </>
          )}
        </tbody>
      </table>
    );
  } else if (item.types === "Registlet") {
    return (
      <table>
        <tbody>
          <tr>
            <th>Max Level</th>
            <td>{item.maxLevel}</td>
          </tr>
          <tr>
            <th>Effect</th>
            <td>{item.effect}</td>
          </tr>
          <th
            className="center-th"
            colspan="2">
            Obtained From
          </th>
          {item.obtained_from.map((item, index) => (
            <tr key={index}>
              <td colspan="2">{item.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (item.types === "Equipments" || item.types === "Usable Items") {
    return (
      <table>
        <tbody>
          <tr>
            <th colspan="2">Sell</th>
            <td>{item.sell}</td>
          </tr>
          <tr>
            <th colspan="2">Process</th>
            <td>{item.process}</td>
          </tr>
          {item.stats.length > 0 && (
            <>
              <th
                className="center-th"
                colspan="3">
                Status
              </th>
              {item.stats.map((stat, index) => (
                <>
                  {stat.statOnly && (
                    <tr key={`${index}-header`}>
                      <th colspan="3">{stat.statOnly}</th>
                    </tr>
                  )}
                  {stat.stat && stat.value && (
                    <tr key={index}>
                      <th colspan="2">{stat.stat}</th>
                      <td>{stat.value}</td>
                    </tr>
                  )}
                </>
              ))}
            </>
          )}
          {item.obtained_from.length > 0 && (
            <>
              <th>Source</th>
              <th>Dye</th>
              <th>Map</th>
              {item.obtained_from.map((from, index) => (
                <>
                  <tr key={index}>
                    {from.source.includes("Lv") ? (
                      <td>
                        <Link
                          onClick={() => {
                            setSearch(from.source.replace(/\(Lv.*?\)/g, "").trim());
                            setType("");
                          }}>
                          {from.source}
                        </Link>
                      </td>
                    ) : (
                      <td>{from.source}</td>
                    )}
                    <td>{from.dye}</td>
                    <td>{from.map}</td>
                  </tr>
                </>
              ))}
            </>
          )}
          {item.recipe.materials.length > 0 && (
            <>
              <th
                className="center-th"
                colspan="3">
                Recipe
              </th>
              <tr>
                <th colspan="2">Fee</th>
                <td>{item.recipe.fee}</td>
              </tr>
              <tr>
                <th colspan="2">Level</th>
                <td>{item.recipe.level}</td>
              </tr>
              <tr>
                <th colspan="2">Difficulty</th>
                <td>{item.recipe.difficulty}</td>
              </tr>
              <th
                className="center-th"
                colspan="3">
                Materials
              </th>
              {item.recipe.materials.map((material, materialIndex) => (
                <tr
                  className="center-th"
                  key={materialIndex}>
                  <td colspan="3">{material}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    );
  } else if (item.types === "Boss" || item.types === "Mini Boss" || item.types === "Normal") {
    return (
      <table>
        <tbody>
          <tr>
            <th>Level</th>
            <td>{item.level}</td>
          </tr>
          <tr>
            <th>HP</th>
            <td>{isNaN(parseInt(item.hp)) ? 0 : parseInt(item.hp).toLocaleString()}</td>
          </tr>
          <tr>
            <th>EXP</th>
            <td>{isNaN(parseInt(item.exp)) ? 0 : parseInt(item.exp).toLocaleString()}</td>
          </tr>
          <tr>
            <th>Tamable</th>
            <td>{item.tamable}</td>
          </tr>
          {item.spawn_at === "-" ? (
            ""
          ) : (
            <>
              <th
                className="center-th"
                colspan="2">
                Spawn at
              </th>
              <tr>
                <td colspan="2">{item.spawn_at}</td>
              </tr>
            </>
          )}
          {item.drops.length > 0 && (
            <>
              <th
                className="center-th"
                colspan="2">
                Drops
              </th>
              {item.drops.map((drop, index) => (
                <tr
                  className="center-th"
                  key={index}>
                  {equipmentsType.some((word) => drop.includes(word)) ? (
                    <td colspan="2">
                      <Link
                        onClick={() => {
                          setType("");
                          setSearch(drop.replace(/\[.*?]/g, "").trim());
                        }}>
                        {drop}
                      </Link>
                    </td>
                  ) : (
                    <td colspan="2">{drop}</td>
                  )}
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    );
  } else {
    return <p className="noteInfo">Tidak ada data</p>;
  }
}
