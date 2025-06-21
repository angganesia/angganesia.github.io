import React, { useState, useEffect } from "react";
import datas from "@datas/toramonline/mq_cal.json";
import TombolMenu from "@components/TombolMenu";

const { quest_data, mq_data } = datas;

const getXP = (lv) => Math.floor(0.025 * lv ** 4 + 2 * lv);

const getTotalXP = (begin, beginPercentage, end) => {
  let xp = Math.floor((1 - beginPercentage / 100) * getXP(begin));
  for (let i = begin + 1; i < end; i++) {
    xp += getXP(i);
  }
  return xp;
};

const addXP = (begin, beginPercentage, extraXP) => {
  let remainingXP = extraXP;
  let lv, lvPercentage;

  let XPRequiredNextLv = (1 - beginPercentage / 100) * getXP(begin);

  if (extraXP < XPRequiredNextLv) {
    let currentXP = (beginPercentage / 100) * getXP(begin) + extraXP;
    return [begin, Math.floor((100 * currentXP) / getXP(begin))];
  } else {
    remainingXP -= XPRequiredNextLv;
    lv = begin + 1;
    while (getXP(lv) <= remainingXP) {
      remainingXP -= getXP(lv);
      lv += 1;
    }
    lvPercentage = Math.floor((100 * remainingXP) / getXP(lv));
    return [lv, lvPercentage];
  }
};

const splitMqInfo = function () {
  let mqKeys = [];
  let mqValues = [];
  let mqXP = [];
  let currentChapter = 0;
  const keys = Object.keys(mq_data);
  const value = Object.values(mq_data);
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].startsWith("Chapter")) {
      currentChapter++;
    } else {
      mqKeys.push(`CH${currentChapter} - ${keys[i]}`);
      mqValues.push(i);
      mqXP.push(value[i]);
    }
  }
  return [mqKeys, mqValues, mqXP];
};

const fillOptions = (values, keys, ops = true) => {
  return values.map((value, index) => (
    <option
      key={index}
      value={ops ? index : value}>
      {keys[index]}
    </option>
  ));
};

const DiaryTable = ({ rows }) => (
  <table className="mq-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Quest</th>
        <th>Level (Progress%)</th>
      </tr>
    </thead>
    <tbody>
      {rows.map(({ index, quest, level, progress }) => (
        <tr key={index}>
          <td>{index}</td>
          <td>{quest}</td>
          <td>
            {level} ({progress}%)
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default function mqCal() {
  const maxLevel = 300;
  const maxProgress = 100;
  //data mq quest
  const [mqData_keys, mqData_values, mqData_XP] = splitMqInfo();

  //data npc quest
  const [questNpcXP, setQuestNpcXP] = useState(15000000);
  const [questNpcName, setQuestNpcName] = useState("Free from Infesters! (2k f/k)");
  const [questTime, setQuestTime] = useState(1);
  const [npcQuest, setNpcQuest] = useState(null);

  //youLevel youProgress targetLevel radio xpRequired
  const [youLevel, setYouLevel] = useState(1);
  const [youProgress, setYouProgress] = useState(0);
  const [targetLevel, setTargetLevel] = useState(300);
  const [opRadio, setOpRadio] = useState("mq");
  const xpRequired = getTotalXP(youLevel, youProgress, targetLevel);

  //mq quest

  const [mqBegin, setMqBegin] = useState(0);
  const [mqEnd, setMqEnd] = useState(120);
  const [checked, setChecked] = useState({ checkedlist1: true, checkedlist2: false });
  //index 76 CH9 - The Battle to Recapture Eldenbaum
  const skipVenena = checked.checkedlist1;
  const spamAdv = checked.checkedlist2;

  const handleChecked = (e) => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  const [resultMq, setResultMq] = useState(null);

  const [diaryResults, setDiaryResults] = useState(null);

  const evaluateMq = () => {
    let mqXP = 0;
    let mqXPReverse = 0;
    let lv = Number(youLevel);
    let lvP = Number(youProgress);
    let targetLv = Number(targetLevel);
    let targetXP = getTotalXP(lv, lvP, targetLv);
    let mqStopIndex = mqBegin;
    let mqStartIndex = mqEnd;
    let mqStopAt = false;
    let mqStartFrom = false;

    if (mqBegin <= mqEnd) {
      for (let i = mqBegin; i <= mqEnd; i++) {
        mqXP += Number(mqData_XP[i]);
        mqXPReverse += Number(mqData_XP[mqEnd - (i - mqBegin)]);

        if (i === 76 && !skipVenena) {
          mqXP += 12500000;
        }
        if (mqEnd - (i - mqBegin) === 76) {
          mqXPReverse += 12500000;
        }

        if (!mqStopAt && mqXP >= targetXP) {
          mqStopAt = true;
          mqStopIndex = i;
        }

        if (!mqStartFrom && mqXPReverse >= targetXP) {
          mqStartFrom = true;
          mqStartIndex = mqEnd - (i - mqBegin);
        }
      }

      let [mqLv, mqLvP] = addXP(lv, lvP, mqXP);

      return (
        <>
          <p>XP: {mqXP.toLocaleString()}</p>
          <p>
            After doing Main Quest's above range you'll reach{" "}
            <strong>
              Lv.{mqLv} ({mqLvP}%)
            </strong>
          </p>
          {mqStopAt && !spamAdv && (
            <>
              <p>
                You may <strong>stop</strong> after quest <strong>{mqData_keys[mqStopIndex]}</strong> to reach target level
              </p>
              <strong>OR</strong>
            </>
          )}
          {mqStartFrom && !spamAdv && (
            <>
              <p>
                You may <strong>start</strong> from quest <strong>{mqData_keys[mqStartIndex]}</strong> to reach target level
              </p>
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          <p>Seems we have a time travel here</p>
        </>
      );
    }
  };

  const evaluateDiaries = () => {
    let result = [];
    let mqXP = 0;
    let lv = Number(youLevel);
    let initialLv = lv;
    let lvP = Number(youProgress);
    let initialLvP = lvP;
    let targetLv = Number(targetLevel);
    let targetXP = getTotalXP(lv, lvP, targetLv);

    if (mqBegin <= mqEnd) {
      for (let i = mqBegin; i <= mqEnd; i++) {
        if (i === 76 && !skipVenena) {
          mqXP += 12500000;
        } else {
          mqXP += mqData_XP[i];
        }
      }

      if (mqXP <= 0) return result;

      const runs = Math.floor(targetXP / mqXP);
      const exact = runs === Math.ceil(targetXP / mqXP);

      if (runs > 100) {
        result.push({
          index: 1,
          quest: "Error: Too many runs required. Please expand the quest range.",
          level: "-",
          progress: "-"
        });
        return result;
      }

      for (let i = 1; i <= runs; i++) {
        [lv, lvP] = addXP(lv, lvP, mqXP);
        result.push({ key: i, index: i, quest: mqData_keys[mqEnd], level: lv, progress: lvP });
      }

      if (!exact) {
        let mqStopIndex = mqBegin;
        let curXP = getTotalXP(initialLv, initialLvP, lv) + (lvP / 100) * getXP(lv + 1);
        let stackedXP = 0;

        for (let i = mqBegin; i <= mqEnd; i++) {
          stackedXP += mqData_XP[i];
          if (i === 76 && !skipVenena) {
            stackedXP += 12500000;
          }

          curXP += mqData_XP[i];

          if (curXP > targetXP) {
            mqStopIndex = i;
            [lv, lvP] = addXP(lv, lvP, stackedXP);
            result.push({ index: runs + 1, quest: mqData_keys[mqStopIndex], level: lv, progress: lvP });
            break;
          }
        }
      }
    }

    return result;
  };

  const npcQuestX = () => {
    let lv = Number(youLevel);
    let lvP = Number(youProgress);
    let target = Number(targetLevel);
    let questXP = Number(questNpcXP);
    let xpRequired = getTotalXP(lv, lvP, target);
    let targetTimes = Math.ceil(xpRequired / questXP);
    let [nLv, nLvP] = addXP(lv, lvP, questXP * Number(questTime));
    return [targetTimes, nLv, nLvP];
  };

  let [targetTimes, nLv, nLvP] = npcQuestX();

  useEffect(() => {
    const resultMq = evaluateMq();
    const resultDiaries = evaluateDiaries();
    const resultNpc = npcQuestX();

    setResultMq(resultMq);
    setDiaryResults(resultDiaries);
    setNpcQuest(resultNpc);
  }, [youLevel, youProgress, targetLevel, mqBegin, mqEnd, spamAdv, skipVenena]);

  return (
    <>
      <h2>Main Quest Exp Calculator</h2>
      <div className="boxMqCalCont">
        <div className="boxMqCal">
          <label>
            Your Level
            <input
              className="input"
              type="number"
              value={youLevel}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= maxLevel) {
                  setYouLevel(maxLevel);
                } else {
                  setYouLevel(e.target.value);
                }
              }}
            />
          </label>

          <label>
            Progress %
            <input
              className="input"
              type="number"
              value={youProgress}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= maxProgress) {
                  setYouProgress(maxProgress);
                } else {
                  setYouProgress(e.target.value);
                }
              }}
            />
          </label>

          <label>
            Target Level
            <input
              className="input"
              type="number"
              value={targetLevel}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= maxLevel) {
                  setTargetLevel(maxLevel);
                } else {
                  setTargetLevel(e.target.value);
                }
              }}
            />
          </label>
        </div>

        <div>
          <h3>Total XP required: {xpRequired.toLocaleString()}</h3>
        </div>
      </div>

      <div className="boxMqCalRadio">
        <label>
          <input
            type="radio"
            value="mq"
            checked={opRadio === "mq"}
            onChange={(e) => setOpRadio(e.target.value)}
          />
          Main Quest
        </label>
        <label>
          <input
            type="radio"
            value="npcq"
            checked={opRadio === "npcq"}
            onChange={(e) => setOpRadio(e.target.value)}
          />
          NPC Quest
        </label>
      </div>

      {opRadio === "mq" && (
        <div className="boxMqCalCont">
          <div className="boxMqCalSelect">
            <label>
              From
              <select
                className="select"
                value={mqBegin}
                onChange={(e) => {
                  setMqBegin(Number(e.target.value));
                }}>
                {fillOptions(mqData_values, mqData_keys)}
              </select>
            </label>
            <label>
              Until
              <select
                className="select"
                value={mqEnd}
                onChange={(e) => setMqEnd(Number(e.target.value))}>
                {fillOptions(mqData_values, mqData_keys).reverse()}
              </select>
            </label>
          </div>
          <div className="boxMqCalChecked">
            <label>
              <input
                type="checkbox"
                name="checkedlist1"
                checked={checked.checkedlist1}
                onChange={handleChecked}
              />
              Skip Pre-Venena Metacoenubia Fight
            </label>
            <label>
              <input
                type="checkbox"
                name="checkedlist2"
                checked={checked.checkedlist2}
                onChange={handleChecked}
              />
              Spam Adventurer's Diaries
            </label>
          </div>
          <div className="quest-info">{resultMq}</div>
        </div>
      )}

      {opRadio === "npcq" && (
        <div className="boxMqCalCont">
          <label>
            Quest
            <select
              className="select"
              value={questNpcXP}
              onChange={(e) => {
                const value = e.target.value;
                setQuestNpcXP(value);
              }}>
              {fillOptions(Object.values(quest_data), Object.keys(quest_data), false)}
            </select>
          </label>

          <div className="grid-2 mt-1">
            <label>
              Exp
              <input
                className="input"
                type="number"
                value={questNpcXP}
                onChange={(e) => setQuestNpcXP(e.target.value)}
              />
            </label>
            <label>
              End of time
              <input
                className="input"
                type="number"
                value={questTime}
                onChange={(e) => {
                  const value = e.target.value;
                  setQuestTime(e.target.value);
                }}
              />
            </label>
          </div>

          <h3>Repeat this quest {targetTimes} times to reach target level</h3>
          <h3>
            By doing this quest {questTime} times, you'll reach Level {nLv} ({nLvP}%)
          </h3>
        </div>
      )}

      {opRadio === "mq" && spamAdv && diaryResults && <DiaryTable rows={diaryResults} />}

      <TombolMenu
        to="/toramtools"
        text="Back Toram Online Tools"
      />
    </>
  );
}
