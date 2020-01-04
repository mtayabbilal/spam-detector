var userDefinedKeys = ["myDefault"];

/////.........Getting list of keys from user.........//////
function AddKey() {
  console.log("called");
  var enteredKey = document.getElementById("textForCriteria").value;
  var newStr = enteredKey.length;
  console.log("new str length _ " + newStr);
  if (newStr == 0) {
    document.getElementById("errorDisplay").innerHTML =
      "Please write something in the text box.";
    document.getElementById("keySuccess").innerHTML = "";
    console.log("You entered nothing!");
  } else {
    enteredKey = enteredKey.toLowerCase();
    console.log("entered something " + enteredKey);
    var listLength = userDefinedKeys.length;
    console.log(listLength);
    var flagToProceed = true;
    if (listLength > 0) {
      for (var j = 0; j < listLength; j = j + 1) {
        console.log("loop = " + j);
        if (userDefinedKeys[j] == enteredKey) {
          flagToProceed = false;
        } else {
          //continiue
          //continue
        }
      }
      if (flagToProceed == false) {
        document.getElementById("errorDisplay").innerHTML =
          "Please don't repeat the same words like >> " + enteredKey;
        document.getElementById("keySuccess").innerHTML = "";
        console.log("Don't repeat the keys please! ==> " + enteredKey);
        document.getElementById("textForCriteria").value = "";
        // whichList = "user";
        // return;
      } else {
        userDefinedKeys.push(enteredKey);
        document.getElementById("errorDisplay").innerHTML = "";
        document.getElementById("textForCriteria").value = "";
        console.log("User defined key => " + userDefinedKeys);
        document.getElementById("keySuccess").innerHTML = "Added!";
        // whichList = "user";
        // return;
      }
    } else {
      userDefinedKeys.push(enteredKey);
      document.getElementById("errorDisplay").innerHTML = "";
      document.getElementById("textForCriteria").value = "";
      console.log("User defined key => " + userDefinedKeys);
      document.getElementById("keySuccess").innerHTML = "Added!";
      // return;
    }
  }
  console.log(userDefinedKeys);
}
RemoveKey = () => {
  var enteredKey = document.getElementById("textForCriteria").value;
  var newStr = enteredKey.length;
  console.log("new str length _ " + newStr);
  if (newStr == 0) {
    document.getElementById("errorDisplay").innerHTML =
      "Please write something in the text box.";
    document.getElementById("keySuccess").innerHTML = "";
    console.log("You entered nothing!");
  } else {
    document.getElementById("errorDisplay").innerHTML = "";
    enteredKey = enteredKey.toLowerCase();
    userDefinedKeys = userDefinedKeys.filter(function(item) {
      return item != enteredKey;
    });
    console.log("Remove called");
    console.log(userDefinedKeys);
    document.getElementById("keySuccess").innerHTML = "Removed!";
    document.getElementById("errorDisplay").innerHTML = "";
    document.getElementById("textForCriteria").value = "";
  }
};
SaveKeys = () => {
  localStorage.setItem("userDefinedKeys", JSON.stringify(userDefinedKeys));
  console.log("Saved Keys");
};
