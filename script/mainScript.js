/////........Flag to picked keyword list..........///////
var whichList = "stored";
var startG = true;

///....key matching controller.....////
var foundKeys = 0;
var totalKeys = 0;

/////.........Defined lists for specific keywords........//////
var storedKeys = [
  "kill",
  "prize",
  "lottary",
  "act",
  "now",
  "action",
  "additional",
  "income",
  "affordable",
  "all",
  "natural",
  "new",
  "amazed",
  "apply",
  "avoid",
  "beneficiary",
  "billing",
  "billion",
  "bonus",
  "boss",
  "buy",
  "call",
  "free",
  "cancel",
  "cash",
  "casino",
  "certified",
  "cheap",
  "click",
  "here",
  "clearance",
  "collect",
  "compare",
  "rates",
  "congratulations",
  "credit",
  "card",
  "check",
  "offers",
  "cures",
  "deal",
  "dear",
  "debt",
  "discount",
  "direct",
  "email",
  "income",
  "cash",
  "earn",
  "extra",
  "expire",
  "fantastic",
  "money",
  "gift",
  "get",
  "paid",
  "guarantee",
  "sales",
  "traffic",
  "investment",
  "limited",
  "lowest",
  "luxury",
  "obligation",
  "only",
  "order",
  "promise",
  "purchase",
  "refund",
  "risk",
  "sales",
  "satisfaction",
  "save",
  "score",
  "serious",
  "spam",
  "supplies",
  "take",
  "action",
  "terms",
  "trial",
  "unlimited",
  "urgent",
  "weight",
  "while",
  "last",
  "win",
  "winner"
];
quickCheck = () => {
  var userDefinedKeys = [];
  console.log(userDefinedKeys);
  console.log(userDefinedKeys.length);
};
////Some global variables...................////////////
var detectedKeywords = [];
var inputedString = "Nothing";

////........Retrieving user keys list..............//////
GetUserList = () => {
  userDefinedKeys = JSON.parse(localStorage.getItem("userDefinedKeys"));
  // alert("Called");
  if (userDefinedKeys.length > 1) {
    console.log("yes user list");
    whichList = "user";
    startG = true;
    StartTest();
    // CheckMe();
  } else {
    startG = false;
    document.getElementById("yesStart").innerHTML = "";
    var grapDisplay = document.getElementById("yesStart");
    var paragraph = document.createElement("p");
    paragraph.setAttribute("class", "text-justify");
    var myInst = document.createTextNode(
      "You have defined no criteria, Please redefine it or start directly from criteria stored in database."
    );
    paragraph.appendChild(myInst);
    grapDisplay.appendChild(paragraph);
    var sd_Btn = document.createElement("button");
    sd_Btn.setAttribute("class", "btn btn-primary");
    sd_Btn.setAttribute("type", "button");
    sd_Btn.setAttribute("onclick", "StartDirectly()");
    // sd_Btn.setAttribute("onclick", "StartTest()");
    var btnInst = document.createTextNode("Start directly");
    sd_Btn.appendChild(btnInst);
    grapDisplay.appendChild(sd_Btn);
    var space = document.createElement("span");
    var spaceFactor = document.createTextNode("___");
    space.appendChild(spaceFactor);
    grapDisplay.appendChild(space);
    var rd_Btn = document.createElement("button");
    rd_Btn.setAttribute("class", "btn btn-primary");
    rd_Btn.setAttribute("type", "button");
    rd_Btn.setAttribute("data-dismiss", "modal");
    // rd_Btn.setAttribute("data-toggle", "modal");
    // rd_Btn.setAttribute("data-target", "#textForCriteria");
    var btnInstX = document.createTextNode("Re-define");
    rd_Btn.appendChild(btnInstX);
    grapDisplay.appendChild(rd_Btn);
    document.getElementById("submitBtn").style.visibility = "hidden";
  }
};
StartDirectly = () => {
  startG = true;
  whichList = "stored";
  document.getElementById("submitBtn").style.visibility = "visible";
  StartTest();
};
///////.......Start portal.......///////////
StartTest = () => {
  document.getElementById("submitBtn").style.visibility = "visible";
  console.log("yes called");
  document.getElementById("yesStart").innerHTML = "";
  var grapDisplay = document.getElementById("yesStart");
  if (startG == true) {
    var paragraph = document.createElement("p");
    paragraph.setAttribute("class", "text-justify");
    var myInst = document.createTextNode(
      "Kindly put your text below in the box and submit the form."
    );
    paragraph.appendChild(myInst);
    grapDisplay.appendChild(paragraph);

    var textBox = document.createElement("textarea");
    textBox.setAttribute("row", "3");
    textBox.setAttribute("id", "userString");
    textBox.setAttribute("class", "form-control");
    grapDisplay.appendChild(textBox);
  }
};
/////........Major working functionality.......///////////
function CheckMe() {
  inputedString = document.getElementById("userString").value;
  inputedString = inputedString.toLowerCase();
  if (inputedString.length > 1) {
    var pickedKeyList = [];
    if (whichList == "stored") {
      pickedKeyList = storedKeys;
    } else {
      pickedKeyList = userDefinedKeys;
    }

    // alert(inputedString);
    for (var i = 0; i < pickedKeyList.length; i = i + 1) {
      //   console.log(i);
      var key = pickedKeyList[i];
      console.log("Picked Key  => " + key);
      var extractedString = inputedString.search(key);
      console.log("Searched result => " + extractedString);
      if (extractedString == -1) {
        //passed, no key found
        if (i == pickedKeyList.length - 1) {
          // alert("Clear");
          Result();
          return;
        }
      } else {
        console.log("Before add : " + detectedKeywords);
        detectedKeywords.push(key);
        console.log("After add : " + detectedKeywords);

        var keyLength = key.length;
        console.log(keyLength);
        var spammedStringLength = extractedString + (keyLength - 1);
        // alert("yes it is a spam!");
        // return;
      }
    }
  } else {
    console.log("nothing entered here...");
    alert("You entered nothing..!!");
  }
  Result();
}

/////.....Final result display...../////////
Result = () => {
  readMe(); //to collect paragraph
  document.getElementById("words").innerHTML = totalKeys;
  if (totalKeys > 0) {
    document.getElementById("contentCTG").innerHTML = "Spam";
  } else {
    document.getElementById("contentCTG").innerHTML = "Clear";
  }
  document.getElementById("keysHere").innerHTML = detectedKeywords;
  document.getElementById("paraHere").innerHTML = inputedString;
};
Reset = () => {
  console.log("RESET");
  totalKeys = 0;
  document.getElementById("keysHere").innerHTML = "";
  console.log(totalKeys);
  detectedKeywords = [];
};
/////.........To detected words in paragraph live.....///////
function readMe() {
  for (var i = 0; i < detectedKeywords.length; i++) {
    var pickedKey = detectedKeywords[i];
    console.log("Picked key => " + pickedKey);
    var replacingKey = pickedKey.toUpperCase();
    console.log(replacingKey);
    var flag = pickedKey;
    while (flag == pickedKey) {
      totalKeys = totalKeys + 1;
      inputedString = inputedString.replace(pickedKey, replacingKey);
      console.log("Iteration => " + inputedString);
      var checkForKey = inputedString.search(pickedKey);
      if (checkForKey == -1) {
        flag = replacingKey;
      } else {
        //continue
      }
    }
  }
  console.log("Final => " + inputedString);
}
