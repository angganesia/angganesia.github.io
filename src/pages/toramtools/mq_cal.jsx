import React, { useState, useEffect } from "react";
import TombolMenu from "@components/TombolMenu";
import datas from "@datas/toramonline/mq_cal.json";

const { quest_data, mq_data } = datas;

export default function MqCal() {
  const [youLevel, setYouLevel] = useState(1);
  const [youProgress, setYouProgress] = useState(0);
  const [targetLevel, setTargetLevel] = useState(300);
  const [opRadio, setOpRadio] = useState("mq");
  const [checked, setChecked] = useState({ checkedlist1: true, checkedlist2: false });
  let skipVenena = checked.checkedlist1;
  let spamAdv = checked.checkedlist2;
  const [questTime, setQuestTime] = useState(1);
  const [questNpcXP, setQuestNpcXP] = useState("15000000");
  const [questNpcName, setQuestNpcName] = useState("Free from Infesters! (2k f/k)");
  const [keys, vals] = splitMqInfo();
  const [mqFrom, setMqFrom] = useState(vals[0]);
  const [mqUntil, setMqUntil] = useState(vals[vals.length - 1]);

  const propsX = { youLevel, youProgress, targetLevel, questName: questNpcXP, questTime, mqFrom, mqUntil, checked, keys, vals, skipVenena, spamAdv };
  const [nLv, nLvP, xpRequired, targetTimes] = evaluateTarget(propsX);
  const diaryResults = evaluateDiaries(propsX);

  const evaluateMQX = evaluateMQ(propsX);
  const mqXP = evaluateMQX.mqXP;
  const mqLevelResult = evaluateMQX.mqLevelResult;
  const stopInfo = evaluateMQX.stopInfo;
  const startInfo = evaluateMQX.startInfo;
  const errorInfo = evaluateMQX.error;

  const handleLevelChange =
    (setter, max = 300, min = 1) =>
    (e) => {
      const value = Math.min(Math.max(parseInt(e.target.value), min), max);
      setter(isNaN(value) ? min : value);
    };

  const handleProgressChange = (e) => {
    const value = Math.min(Math.max(parseInt(e.target.value), 0), 100);
    setYouProgress(isNaN(value) ? 0 : value);
  };

  const handleChecked = (e) => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

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
                if (value >= 300) {
                  setYouLevel(300);
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
                if (value >= 100) {
                  setYouProgress(100);
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
                const value = e.target.value
                if (value >= 300) {
                  setTargetLevel(300)
                } else {
                  setTargetLevel(e.target.value)
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
                value={mqFrom}
                onChange={(e) => setMqFrom(e.target.value)}>
                {fillOptions(vals, keys)}
              </select>
            </label>
            <label>
              Until
              <select
                className="select"
                value={mqUntil}
                onChange={(e) => setMqUntil(e.target.value)}>
                {fillOptions([...vals].reverse(), [...keys].reverse())}
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
          <div className="quest-info">
            <p className="mq-xp">{`XP: ${mqXP.toLocaleString()}`}</p>
            {mqLevelResult && (
              <p className="mq-eval">
                After doing Main Quest's above range you'll reach Lv.{mqLevelResult.level} ({mqLevelResult.progress}%)
              </p>
            )}
            {startInfo && (
              <p className="mq-start-from">
                You may <strong>start</strong> from quest <strong>{startInfo.name}</strong> to reach target level
              </p>
            )}
            {stopInfo && startInfo && <p className="mq-or">OR</p>}
            {stopInfo && (
              <p className="mq-stopAt">
                You may <strong>stop</strong> after quest <strong>{stopInfo.name}</strong> to reach target level
              </p>
            )}
          </div>
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
                setQuestNpcXP(e.target.value);
                const index = Object.values(quest_data).indexOf(Number(e.target.value));
                const questKey = Object.keys(quest_data)[index];
                if (questKey) setQuestNpcName(questKey);
              }}>
              {fillOptions(Object.values(quest_data), Object.keys(quest_data))}
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
                onChange={handleLevelChange(setQuestTime, Infinity, 1)}
              />
            </label>
          </div>

          <h3>Repeat this quest {targetTimes} times to reach target level</h3>
          <h3>
            By doing this quest {questTime} times, you'll reach Level {nLv} ({nLvP}%)
          </h3>
        </div>
      )}
      {checked.checkedlist2 && diaryResults && <DiaryTable rows={diaryResults} />}
      <TombolMenu
        to="/toramtools"
        text="Back Toram Online Tools"
      />
    </>
  );
}

const getXP = (lv) => Math.floor(0.025 * lv ** 4 + 2 * lv);

const getTotalXP = (begin, beginPercentage, end) => {
  let xp = Math.floor((1 - beginPercentage / 100) * getXP(begin));
  for (let i = begin + 1; i < end; i++) xp += getXP(i);
  return xp;
};

const addXP = (begin, beginPercentage, extraXP) => {
  let remainingXP = extraXP;
  const XPRequiredNextLv = (1 - beginPercentage / 100) * getXP(begin);

  if (extraXP < XPRequiredNextLv) {
    const currentXP = (beginPercentage / 100) * getXP(begin) + extraXP;
    return [begin, Math.floor((100 * currentXP) / getXP(begin))];
  }

  remainingXP -= XPRequiredNextLv;
  let lv = begin + 1;
  while (getXP(lv) <= remainingXP) remainingXP -= getXP(lv++);
  return [lv, Math.floor((100 * remainingXP) / getXP(lv))];
};

const splitMqInfo = () => {
  let mqKeys = [],
    mqValues = [],
    currentChapter = 0;
  Object.entries(mq_data).forEach(([key, val], index) => {
    if (key.startsWith("Chapter")) currentChapter++;
    else if (val !== "") {
      mqKeys.push(`CH${currentChapter} - ${key}`);
      mqValues.push(val);
    }
  });
  return [mqKeys, mqValues];
};

const fillOptions = (values, keys) =>
  values.map((value, index) => (
    <option
      key={index}
      value={value}>
      {keys[index]}
    </option>
  ));

function evaluateTarget({ youLevel, youProgress, targetLevel, questName, questTime }) {
  const xpRequired = getTotalXP(youLevel, youProgress, targetLevel);
  const questExp = Number(questName) || 0;
  const targetTimes = questExp > 0 ? Math.ceil(xpRequired / questExp) : 0;
  const [nLv, nLvP] = addXP(youLevel, youProgress, questExp * questTime);
  return [nLv, nLvP, xpRequired, targetTimes];
}

function evaluateDiaries({ youLevel, youProgress, targetLevel, mqFrom, mqUntil, checked }) {
  const keys = Object.entries(mq_data)
    .filter(([_, val]) => val !== "")
    .map(([key, val]) => ({ key, value: Number(val) }));

  const mqIndexBegin = keys.findIndex((obj) => obj.value === Number(mqFrom));
  const mqIndexEnd = keys.findIndex((obj) => obj.value === Number(mqUntil));

  if (!mqFrom || !mqUntil || mqIndexBegin === -1 || mqIndexEnd === -1 || mqIndexBegin > mqIndexEnd) return null;

  let lv = youLevel,
    lvP = youProgress,
    result = [],
    mqXP = 0;
  const targetXP = getTotalXP(lv, lvP, targetLevel);

  for (let i = mqIndexBegin; i <= mqIndexEnd; i++) {
    mqXP += keys[i].value;
    if (keys[i].key === "The Ones Nesting in the Manor" && !checked.checkedlist1) mqXP += 12500000;
  }

  const runs = Math.floor(targetXP / mqXP);
  const exact = runs === Math.ceil(targetXP / mqXP);

  if (runs > 100)
    return (
      <div style={{ padding: "1em" }}>
        <b>Error</b>: Too many runs required ({runs + 1}), select a wider range between quests.
      </div>
    );

  for (let i = 1; i <= runs; i++) {
    [lv, lvP] = addXP(lv, lvP, mqXP);
    result.push({ key: i, index: i, quest: keys[mqIndexEnd].key, level: lv, progress: lvP });
  }

  if (!exact) {
    let curXP = getTotalXP(youLevel, youProgress, lv) + (lvP / 100) * getXP(lv + 1),
      stackedXP = 0;
    for (let i = mqIndexBegin; i <= mqIndexEnd; i++) {
      curXP += keys[i].value;
      stackedXP += keys[i].value;
      if (keys[i].key === "The Ones Nesting in the Manor" && !checked.checkedlist1) {
        curXP += 12500000;
        stackedXP += 12500000;
      }
      if (curXP > targetXP) {
        [lv, lvP] = addXP(lv, lvP, stackedXP);
        result.push({ index: runs + 1, quest: keys[i].key, level: lv, progress: lvP });

        break;
      }
    }
  }

  return result;
}

function evaluateMQ({ mqFrom, mqUntil, skipVenena, spamAdv, youLevel, youProgress, targetLevel }) {
  const entries = Object.entries(mq_data).reduce(
    (acc, [key, val]) => {
      if (key.toLowerCase().startsWith("chapter")) {
        const match = key.match(/\d+/);
        if (match) acc.chapter = parseInt(match[0], 10);
      } else if (val !== "") {
        acc.list.push([`CH${acc.chapter} - ${key}`, val]);
      }
      return acc;
    },
    { chapter: 0, list: [] }
  ).list;

  const keys = entries.map(([key]) => key);
  const values = entries.map(([_, val]) => Number(val));

  const mqIndexBegin = values.findIndex((val) => val === Number(mqFrom));
  const mqIndexEnd = values.findIndex((val) => val === Number(mqUntil));

  if (mqIndexBegin === -1 || mqIndexEnd === -1 || Number(mqFrom) > Number(mqUntil) || mqIndexBegin > mqIndexEnd) {
    return { error: "Invalid Main Quest XP range" };
  }

  let mqXP = 0;
  let mqXPReverse = 0;
  let lv = youLevel;
  let lvP = youProgress;
  let targetXP = getTotalXP(lv, lvP, targetLevel);
  let mqStopIndex = mqIndexBegin;
  let mqStartIndex = mqIndexEnd;
  let mqStopAt = false;
  let mqStartFrom = false;

  for (let i = mqIndexBegin; i <= mqIndexEnd; i++) {
    const normalXP = values[i] || 0;
    const reverseXP = values[mqIndexEnd - (i - mqIndexBegin)] || 0;

    mqXP += normalXP;
    mqXPReverse += reverseXP;

    if (keys[i] === "The Ones Nesting in the Manor" && !skipVenena) mqXP += 12500000;
    if (keys[mqIndexEnd - (i - mqIndexBegin)] === "The Ones Nesting in the Manor" && !skipVenena) mqXPReverse += 12500000;

    if (!mqStopAt && mqXP > targetXP) {
      mqStopAt = true;
      mqStopIndex = i;
    }

    if (!mqStartFrom && mqXPReverse > targetXP) {
      mqStartFrom = true;
      mqStartIndex = mqIndexEnd - (i - mqIndexBegin);
    }
  }

  const [mqLv, mqLvP] = addXP(lv, lvP, mqXP);

  return {
    mqXP,
    mqLevelResult: { level: mqLv, progress: mqLvP },
    stopInfo: mqStopAt && !spamAdv ? { index: mqStopIndex, name: keys[mqStopIndex] } : null,
    startInfo: mqStartFrom && !spamAdv ? { index: mqStartIndex, name: keys[mqStartIndex] } : null,
    error: null
  };
}

const DiaryRow = ({ index, quest, level, progress }) => (
  <div
    className="col-1 grid nogap"
    id="mq-table-row">
    <div>{index}</div>
    <div>{quest}</div>
    <div>
      {level} ({progress}%)
    </div>
  </div>
);

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
