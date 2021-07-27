/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true, indent: 2 */

function chainDoesNotContain(memorizationTable, currentIndex, currentItem) {

  while (memorizationTable[currentIndex].itemIndex !== currentItem) {

    currentIndex = memorizationTable[currentIndex].previousIndex;

    if (currentIndex === -1) {
      return true;
    }
  }
  return false;
}

function doLoad() {
  var itemTable = [
    { name: "Head",       stat: [ { value: 44, type: "Crit" }, { value: 27, type: "Haste" } ] },
    { name: "Neck",       stat: [ { value: 15, type: "Crit" }, { value: 19, type: "Haste" } ] },
    { name: "Shoulders",  stat: [ { value: 39, type: "Crit" }, { value: 19, type: "Haste" } ] },
    { name: "Back",       stat: [ { value: 24, type: "Crit" }, { value: 20, type: "Haste" } ] },
    { name: "Chest",      stat: [ { value: 48, type: "Crit" }, { value: 27, type: "Haste" } ] },
    { name: "Feet",       stat: [ { value: 41, type: "Crit" }, { value: 18, type: "Haste" } ] },
    { name: "Ring",       stat: [ { value: 24, type: "Crit" }, { value: 20, type: "Expertise" } ] },
    { name: "Trinket",    stat: [ { value: 33, type: "Crit" } ] },
    { name: "Trinket",    stat: [ { value: 33, type: "Crit" } ] },
    { name: "Main Hand",  stat: [ { value: 23, type: "Crit" }, { value: 30, type: "Haste" } ] }
  ],
  memorizationTable = [],
  memorizationTableSize = 0,
  maxStatValue,
  val, newIndex,
  currentItem, currentStat, currentIndex;

  for (currentItem = 0; currentItem < itemTable.length; currentItem += 1) {
    maxStatValue = 0;
    for (currentStat = 0; currentStat < itemTable[currentItem].stat.length; currentStat += 1) {
      val = itemTable[currentItem].stat[currentStat].value;
      if (val > maxStatValue) {
        maxStatValue = val;
      }
    }
    memorizationTableSize += maxStatValue;
  }

  for (currentIndex = 0; currentIndex <= memorizationTableSize; currentIndex += 1) {
    memorizationTable[currentIndex] = { itemIndex: -1, statIndex: -1, itemCount: 0, previousIndex: -1 };
  }

  for (currentItem = 0; currentItem < itemTable.length; currentItem += 1) {
    for (currentStat = 0; currentStat < itemTable[currentItem].stat.length; currentStat += 1) {

      val = itemTable[currentItem].stat[currentStat].value;

      if (memorizationTable[val].itemIndex === -1) {
        memorizationTable[val].itemIndex = currentItem;
        memorizationTable[val].statIndex = currentStat;
        memorizationTable[val].itemCount = 1;
        memorizationTable[val].previousIndex = -1;
      }
    }
  }

  for (currentIndex = 1; currentIndex < memorizationTable.length; currentIndex += 1) {
    if (memorizationTable[currentIndex].itemIndex !== -1) {
      for (currentItem = 0; currentItem < itemTable.length; currentItem += 1) {
        for (currentStat = 0; currentStat < itemTable[currentItem].stat.length; currentStat += 1) {
          if (chainDoesNotContain(memorizationTable, currentIndex, currentItem)) {
            val = itemTable[currentItem].stat[currentStat].value;
            newIndex = currentIndex + val;
            if (newIndex < memorizationTable.length) {
              if (memorizationTable[newIndex].itemIndex === -1 || (memorizationTable[newIndex].itemCount > (memorizationTable[currentIndex].itemCount + 1))) {
                memorizationTable[newIndex].itemIndex = currentItem;
                memorizationTable[newIndex].statIndex = currentStat;
                memorizationTable[newIndex].itemCount = memorizationTable[currentIndex].itemCount + 1;
                memorizationTable[newIndex].previousIndex = currentIndex;
              }
            }
          }
        }
      }
    }
  }

  val = "";
  for (currentIndex = 0; currentIndex < memorizationTable.length; currentIndex += 1) {
    if (memorizationTable[currentIndex].itemIndex !== -1) {
      val += currentIndex + "\t" + 
             memorizationTable[currentIndex].itemIndex + "\t" + 
             memorizationTable[currentIndex].statIndex + "\t" + 
             memorizationTable[currentIndex].itemCount + "\t" + 
             memorizationTable[currentIndex].previousIndex + "<br>";
    } else {
      val += "EMPTY<br>";
    }
  }
  output.innerHTML = val;
}

doLoad();

// function foo(x, err) {
// 	err.number = 123;
// 	err.message = "This is a test";
// }

// var err = new Error(0);
// foo("Test", err)
// alert(err.number);
