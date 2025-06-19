import React, { useState, useEffect } from "react";

const quest_data = {
  "Custom Experience Value": "",
  "Nightmare Crystal (Stack)": 297000,
  "Lapin's Soul (Piece)": 344000,
  "Parasited Crystal (Stack)": 380000,
  "Free from Infesters! (2k f/k)": 15000000,
  "Defeat Metal Stinger (x100)": 3240000,
  "Minotaur Skin (Stack)": 999900,
  "Cracked Platinum Armguard (Stack)": 677000
};

const mq_data = {
  "Chapter 1": "",
  "First Time Visit": 30,
  "Straye Brother and Sister": 80,
  "A Golem on a Rampage": 730,
  "The Goddess of Wisdom": 2050,
  "The Dragon's Den": 4700,
  "The Ruined Temple": 9330,
  "The First Magic Stone": 16700,
  "Purification Incense": 27900,
  "The Dragon and Black Crystal": 43000,
  "Chapter 2": "",
  "The Merchant Girl": 64000,
  "Where Are the Gems?": 92000,
  "Who is the Black Knight?!": 118200,
  "Trials in the Palace": 149000,
  "The Moon Wizard": 172000,
  "The Follower and Hater": 227000,
  "The Wizard's Cave": 240000,
  "The Star Wizard": 255000,
  "Chapter 3": "",
  "The Invincible... Enemy??": 270000,
  "The Ancient Empress": 284000,
  "The Culprit": 319000,
  "Fate of the Fortress": 335000,
  "Memory in the Lost Town": 398000,
  "The Stolen Sorcery Gem": 417000,
  "Living with a Dragon": 462300,
  "Monsters from Outerworld": 540000,
  "Chapter 4": "",
  "The Mage Diels": 562000,
  "Journey for Reconstruction": 585000,
  "The Sacred Gem in Akaku": 710000,
  "The King of Darkan": 740000,
  "The Lurking Evil": 803000,
  "Find the False Black Knight!": 913000,
  "Technista's Movement": 1000000,
  "The Falling Feather of Death": 1100000,
  "Chapter 5": "",
  "In The Unknown Darkness": 1150000,
  "The Charm": 1310000,
  "Parching Dark Mirror": 1370000,
  "Fierce Battle in the Garden": 1550000,
  "A Light in the Darkness": 1750000,
  "The Ones Nesting in the Manor": 1970000,
  "The Dark Castle": 2210000,
  "To The Living World": 2220000,
  "Chapter 6": "",
  "Demi Machina": 2600000,
  "The Town of Pax Faction": 2700000,
  "Mechanical Heart": 2800000,
  "Black Knights of Lyark": 2820000,
  "The Mysterious Artifact": 3030000,
  "Truth of the Artifact": 3099000,
  "The Price of Treachery": 3320000,
  "The Blasphemous Factory": 3640000,
  "Mystery of the Black Knights": 4020000,
  "Chapter 7": "",
  "Monster's Forest": 4730000,
  "The Underground Town": 4820000,
  "The Elves in Lyark": 5070000,
  "The Mad Laboratory": 5500000,
  "Tragedy in the Jail": 6000000,
  "Calamity in Droma Square": 6400000,
  "Head for Ultimea Palace": 6900000,
  "The Chaotic Truth": 7400000,
  "Chapter 8": "",
  "The Mine Where Monsters Lurk": 8400000,
  "The Mysterious Shadow": 8500000,
  "The New Diel Country": 8600000,
  "The Ruins of the Gods": 8800000,
  "The Former God of Justice": 9100000,
  "The Remaining Thrones in the Shrine": 9700000,
  "Gods' Whereabouts": 10400000,
  "The Wait at Specia's Shrine": 11100000,
  "The Warden of Ice & Snow": 11800000,
  "At Mountains' End": 12500000,
  "Chapter 9": "",
  "Deadly Road to Eldenbaum": 15800000,
  "Unforeseen Traps": 17100000,
  "Traces of Technological Progress": 18200000,
  "An Unexpected Acquaintance": 19200000,
  "Front Line Base Operation": 20300000,
  "Strategy to Redeem the Treetop Harbor": 21500000,
  "The Teleporter Left Behind": 22700000,
  "The Man Who Seeks Death": 23900000,
  "The Battle to Recapture Eldenbaum": 25000000,
  "A New Beginning": 13000000,
  "Chapter 10": "",
  "Off to the Fateful Land": 26000000,
  "The Inhabitants Under the Cliff": 27400000,
  "The Nightmare Returns": 28800000,
  "The Whereabouts of the Missing Monks": 30200000,
  "The Goddess of Justice and the Squatters": 31600000,
  "Navigator of the Ark": 33100000,
  "Witch in the Woods": 34600000,
  "The Duel in Nov Diela": 36200000,
  "Chapter 11": "",
  "Flying the Ark": 37800000,
  "Land of the Unknown": 49000000,
  "The Strolling Forest": 51000000,
  "Eumanos the Forest Dwellers": 53400000,
  "A Sproutling is Born": 55700000,
  "The Blessing-Bearer": 58100000,
  "Intense Battle in Coenubia's Stronghold": 60500000,
  "The Shadow of a Smoky Mountain": 63000000,
  "The Weredragons & the Underground World": 65500000,
  "Chapter 12": "",
  "The Sky with a Ceiling": 73400000,
  "Rivalry Between Dragons and Weredragons": 76300000,
  "Weredragon Couple and a Baby": 79300000,
  "Weredragons' Vital Point": 82300000,
  "Intense Battle in Propulsion System": 85300000,
  "Discovering a New Technology": 44200000,
  "Ark Repair": 92700000,
  "Weredragon Dispute": 96000000,
  "Cocoon in the Ice Wall": 99300000,
  "Chapter 13": "",
  "Underwater Inhabitants": 112600000,
  "Water Dome": 116500000,
  "Underwater City": 60200000,
  "The Thing in the Abandoned District": 125800000,
  "Shadow from the Abyss": 129900000,
  "The Ruthless Council": 67000000,
  "Mysterious Entity in the Little Shrine": 139900000,
  "The Great Battle Underwater": 144200000,
  "Chapter 14": "",
  "Crisis in the Sky": 159100000,
  "The Surviving Siblings": 164000000,
  "Chaotic Situation": 168900000,
  "The Bitter Truth": 173800000,
  "The Uncouth Rana Prince": 178800000,
  "Mutant Coenubia Village": 183900000,
  "Fierce Battle with Mutant Lixis": 189000000,
  "Chapter 15": "",
  "Ark Crisis": 210500000,
  "Coastal Clash": 216300000
};

export default function MqCal() {
  const [youLevel, setYouLevel] = useState(1);
  const [youProgress, setYouProgress] = useState(0);
  const [targetLevel, setTargetLevel] = useState(300);
  const [opRadio, setOpRadio] = useState("mq");
  const [checked, setChecked] = useState({
    checkedlist1: true,
    checkedlist2: false
  });
  const [npcQuest, setNpcQuest] = useState("Free from Infesters! (2k f/k)");
  const [npcQuestExp, setNpcQuestExp] = useState(quest_data["Free from Infesters! (2k f/k)"]);
  const [questTime, setQuestTime] = useState(1);
  const firstQuest = Object.keys(mq_data).find((key) => mq_data[key] !== "");
  const lastQuest = Object.keys(mq_data)
    .reverse()
    .find((key) => mq_data[key] !== "");

  const [mqBegin, setMqBegin] = useState(mq_data[firstQuest]);
  const [mqEnd, setMqEnd] = useState(mq_data[lastQuest]);

  const [mqResult, setMqResult] = useState(null);
  const [mqResultX, setMqResultX] = useState(null);
  const [mqExp, setMqExp] = useState(0);
  const [mqEXPLv, setMqEXPLv] = useState(0);
  const [mqEXPLvP, setMqEXPLvP] = useState(0);

  const handleNpcQuestExp = (e) => {
    const selectedQuestValue = e.target.value;
    setNpcQuestExp(selectedQuestValue);
    const selectedQuestName = Object.keys(quest_data).find((key) => quest_data[key] == selectedQuestValue);
    setNpcQuest(selectedQuestName);
  };

  const handleOpRadio = (e) => {
    setOpRadio(e.target.value);
  };

  const handleChecked = (e) => {
    setChecked({
      ...checked,
      [e.target.name]: e.target.checked
    });
  };

  let xpRequired = getTotalXP(youLevel, youProgress, targetLevel);

  let targetTimes = Math.ceil(xpRequired / npcQuestExp);

  let [nLv, nLvP] = addXP(youLevel, youProgress, npcQuestExp * questTime);

  const restructuredMqData = {};
  let currentChapter = null;

  Object.keys(mq_data).forEach((key) => {
    if (mq_data[key] === "") {
      currentChapter = key;
      restructuredMqData[currentChapter] = [];
    } else {
      if (currentChapter) {
        restructuredMqData[currentChapter].push({ name: key, value: mq_data[key] });
      }
    }
  });

  const evaluateDiaries = () => {
    const keys = Object.keys(mq_data).reduce((acc, key) => {
      if (mq_data[key] !== "") {
        acc.push({ key, value: mq_data[key] });
      }
      return acc;
    }, []);

    const mqIndexBegin = keys.findIndex((obj) => obj.value === mqBegin);
    const mqIndexEnd = keys.findIndex((obj) => obj.value === mqEnd);

    if (mqIndexBegin <= mqIndexEnd) {
      let lv = youLevel;
      let initialLv = lv;
      let lvP = youProgress;
      let initialLvP = lvP;
      let targetLv = targetLevel;
      let targetXP = getTotalXP(lv, lvP, targetLv);
      let mqXP = 0;

      for (let i = mqIndexBegin; i <= mqIndexEnd; i++) {
        mqXP += Number(keys[i].value);
        if (keys[i].key === "The Ones Nesting in the Manor" && !checked.checkedlist1) {
          mqXP += 12500000;
        }
      }

      const runs = Math.floor(targetXP / mqXP);
      const exact_runs = runs === Math.ceil(targetXP / mqXP);

      if (runs <= 100) {
        let result = [];
        for (let i = 1; i <= runs; i++) {
          [lv, lvP] = addXP(lv, lvP, mqXP);
          result.push(
            <div
              key={i}
              className="col-1 grid nogap"
              id="mq-table-row">
              <div>{i}</div>
              <div>{`CH ${keys[mqIndexEnd].key.replace("Chapter ", "")} - ${keys[mqIndexEnd].key.replace(`Chapter ${keys[mqIndexEnd].key.replace("Chapter ", "")}`, "")}`}</div>
              <div>
                {lv} ({lvP}%)
              </div>
            </div>
          );
        }

        if (!exact_runs) {
          let mqStopIndex = mqIndexBegin;
          let curXP = getTotalXP(initialLv, initialLvP, lv) + (lvP / 100) * getXP(lv + 1);
          let stackedXP = 0;
          for (let i = mqIndexBegin; i <= mqIndexEnd; i++) {
            curXP += Number(keys[i].value);
            stackedXP += Number(keys[i].value);
            if (keys[i].key === "The Ones Nesting in the Manor" && !checked.checkedlist1) {
              curXP += 12500000;
              stackedXP += 12500000;
            }
            if (curXP > targetXP) {
              mqStopIndex = i;
              [lv, lvP] = addXP(lv, lvP, stackedXP);
              break;
            }
          }
          result.push(
            <div
              key={runs + 1}
              className="col-1 grid nogap"
              id="mq-table-row">
              <div>{runs + 1}</div>
              <div>{`CH ${keys[mqStopIndex].key.replace("Chapter ", "")} - ${keys[mqStopIndex].key.replace(`Chapter ${keys[mqStopIndex].key.replace("Chapter ", "")}`, "")}`}</div>
              <div>
                {lv} ({lvP}%)
              </div>
            </div>
          );
        }

        return result;
      } else {
        return (
          <div style={{ padding: "1em" }}>
            <span style={{ textAlign: "justify" }}>
              <span style={{ fontWeight: "bold" }}>Error</span>: Too many runs required ({runs + 1}), select a wider range between quests.
            </span>
          </div>
        );
      }
    }
  };

  const evaluateDiariesX = () => {
    const keys = Object.keys(mq_data).reduce((acc, key) => {
      if (mq_data[key] !== "") {
        acc.push({ key, value: mq_data[key] });
      }
      return acc;
    }, []);

    const mqIndexBegin = keys.findIndex((obj) => obj.value === mqBegin);
    const mqIndexEnd = keys.findIndex((obj) => obj.value === mqEnd);

    if (mqIndexBegin !== -1 && mqIndexEnd !== -1 && mqIndexBegin <= mqIndexEnd) {
      let lv = youLevel;
      let lvP = youProgress;
      let targetLv = targetLevel;
      let targetXP = getTotalXP(lv, lvP, targetLv);
      let mqXP = 0;
      let stopQuestIndex = mqIndexEnd;

      for (let i = mqIndexBegin; i <= mqIndexEnd; i++) {
        mqXP += Number(keys[i].value);
        if (keys[i].key === "The Ones Nesting in the Manor" && !checked.checkedlist1) {
          mqXP += 12500000;
        }
        if (mqXP >= targetXP) {
          stopQuestIndex = i;
          break;
        }
      }

      let [mqLv, mqLvP] = addXP(lv, lvP, mqXP);

      setMqExp(mqXP);
      setMqEXPLv(mqLv);
      setMqEXPLvP(mqLvP);

      const result = (
        <div>
          <h3>XP: {mqXP.toLocaleString()}</h3>
          <h3>
            After doing Main Quest's above range you'll reach Lv.{mqLv} ({mqLvP}%)
          </h3>
          {stopQuestIndex !== mqIndexEnd && (
            <>
              <h3>OR</h3>
              <p>
                You may <strong>stop</strong> after quest <strong>{keys[stopQuestIndex].key}</strong> to reach target level
              </p>
            </>
          )}
        </div>
      );

      return result;
    } else {
      return (
        <div>
          <em>Seems we have a time travel here</em>
        </div>
      );
    }
  };

  useEffect(() => {
    const result = evaluateDiaries();
    const resultX = evaluateDiariesX();
    // Lakukan sesuatu dengan result, misalnya simpan ke state
    setMqResult(result);
    setMqResultX(resultX);
  }, [mqBegin, mqEnd, youLevel, youProgress, targetLevel, checked]);

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
              placeholder="1"
              value={youLevel}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value <= 0) {
                  setYouLevel(1);
                } else if (value > 300) {
                  setYouLevel(300);
                } else {
                  setYouLevel(value);
                }
              }}
            />
          </label>

          <label>
            Progress %
            <input
              className="input"
              type="number"
              placeholder="100"
              value={youProgress}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value < 0) {
                  setYouProgress(0);
                } else if (value > 100) {
                  setYouProgress(100);
                } else {
                  setYouProgress(value);
                }
              }}
            />
          </label>

          <label>
            Target Level
            <input
              className="input"
              type="number"
              placeholder="300"
              value={targetLevel}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value <= 0) {
                  setTargetLevel(1);
                } else if (value > 300) {
                  setTargetLevel(300);
                } else {
                  setTargetLevel(value);
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
        <label for="main quest">
          <input
            type="radio"
            value="mq"
            checked={opRadio === "mq"}
            onChange={handleOpRadio}
          />
          Main Quest
        </label>
        <label for="npc quest">
          <input
            type="radio"
            value="npcq"
            checked={opRadio === "npcq"}
            onChange={handleOpRadio}
          />
          NPC Quest
        </label>
      </div>

      <div
        style={{ display: opRadio === "mq" ? "" : "none" }}
        className="boxMqCalCont">
        <div className="boxMqCalSelect">
          <label>
            From
            <select
              className="select"
              value={mqBegin}
              onChange={(e) => setMqBegin(parseInt(e.target.value))}>
              {Object.keys(restructuredMqData).map((chapter, chapterIndex) => {
                return restructuredMqData[chapter].map((quest, questIndex) => (
                  <option
                    key={`${chapterIndex}-${questIndex}`}
                    value={quest.value}>
                    {`${chapter.replace("Chapter ", "CH")} - ${quest.name}`}
                  </option>
                ));
              })}
            </select>
          </label>

          <label>
            Until
            <select
              className="select"
              value={mqEnd}
              onChange={(e) => setMqEnd(parseInt(e.target.value))}>
              {Object.keys(restructuredMqData).map((chapter, chapterIndex) => {
                return restructuredMqData[chapter].map((quest, questIndex) => (
                  <option
                    key={`${chapterIndex}-${questIndex}`}
                    value={quest.value}>
                    {`${chapter.replace("Chapter ", "CH")} - ${quest.name}`}
                  </option>
                ));
              })}
            </select>
          </label>
        </div>
        <div className="boxMqCalChecked">
          <label for="skip venena">
            <input
              type="checkbox"
              name="checkedlist1"
              checked={checked.checkedlist1}
              onChange={handleChecked}
            />
            Skip Pre-Venena Metacoenubia Fight
          </label>
          <label for="spam adventure">
            <input
              type="checkbox"
              name="checkedlist2"
              checked={checked.checkedlist2}
              onChange={handleChecked}
            />
            Spam Adventurer's Diaries
          </label>
        </div>
        {mqResultX}
      </div>

      <div
        style={{ display: opRadio === "npcq" ? "" : "none" }}
        className="boxMqCalCont">
        <label for="quest">
          Quest
          <select
            value={npcQuestExp}
            onChange={handleNpcQuestExp}
            className="select">
            {Object.keys(quest_data).map((quest, index) => (
              <option
                key={index}
                value={quest_data[quest]}>
                {quest}
              </option>
            ))}
          </select>
        </label>

        <div className="grid-2 mt-1">
          <label for="quest">
            Exp
            <input
              className={`input ${npcQuest !== "Custom Experience Value" ? "input-disabled" : ""}`}
              type="number"
              placeholder="0"
              value={npcQuestExp}
              onChange={(e) => setNpcQuestExp(e.target.value)}
            />
          </label>
          <label for="end of time">
            End of time
            <input
              className="input"
              type="number"
              placeholder="1"
              value={questTime}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value === "" || value <= 0) {
                  setQuestTime(1);
                } else {
                  setQuestTime(value);
                }
              }}
            />
          </label>
        </div>
        <h3>Repeat this quest {targetTimes} times to reach target level</h3>
        <h3>
          By doing this quest for {questTime ? questTime : 0} times, you'll reach Level {nLv} ({nLvP}%)
        </h3>
      </div>

      {checked.checkedlist2 && mqResult}

      <p className="noteInfo">Maintance</p>
    </>
  );
}

const getXP = (lv) => Math.floor(0.025 * lv ** 4 + 2 * lv);

const getTotalXP = function (begin, beginPercentage, end) {
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
