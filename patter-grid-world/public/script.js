const section = document.createElement("section");
section.classList.add("hover:bg-white/10");
const body = document.body;
body.appendChild(section);

let gridNumber = 18;

section.classList.add("m-4", "flex", "flex-row", "flex-wrap");

for (let i = 0; i < gridNumber; i++) {
  const div = document.createElement("div");
  div.id = i + 1;
  div.setAttribute("data-state", 0);
  div.className = "triangle";
  section.appendChild(div);
}

for (let i = 0; i < document.querySelectorAll("div").length; i++) {
  const divSelector = document.querySelectorAll("div");
  divSelector[i].addEventListener("click", function () {
    triangleState(this);
  });
}

function triangleState(t) {
  var currentState = Number(t.dataset.state);

  var newState = currentState + 1;
  t.setAttribute("data-state", newState);

  if (newState > 4) {
    newState = 0;
    t.setAttribute("data-state", newState);
  }

  switch (newState) {
    case 0:
      t.classList.remove("tbg", "t4");
      break;
    case 1:
      t.classList.add("tbg", "t1");
      break;
    case 2:
      t.classList.remove("t1");
      t.classList.add("t2");
      break;
    case 3:
      t.classList.remove("t2");
      t.classList.add("t3");
      break;
    case 4:
      t.classList.remove("t3");
      t.classList.add("t4");
      break;
  }
}

var finalState = "";

const saveStateExecute = document.getElementById("post-state");

saveStateExecute.addEventListener("click", function () {
  saveState();
});

function saveState() {
  const divSelector = document.querySelectorAll("div");
  const dataAttributesArray = [];

  divSelector.forEach((div) => {
    const dataState = div.dataset.state;
    dataAttributesArray.push(dataState);
  });

  const finalState = dataAttributesArray.join(" ").toString();
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

  console.log(finalState);
  console.log(formattedDate);

  //   $.post(
  //     "/statetb",
  //     { state: finalState, date_created: formattedDate },
  //     {},
  //     "json"
  //   );

  // Data to be sent in the POST request
  const data = {
    state: finalState,
    date_created: formattedDate,
  };

  // Making a POST request using Fetch API
  fetch("/statetb", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response from server:", data);
      // Handle the data received from the server
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      // Handle errors that occurred during the fetch operation
    });
}

$(document).ready(function () {
  $("#g").on("click", function () {
    // Perform GET request using jQuery
    $.get("/statetb", function (data) {
      console.log("GET Response:", data);
      // Handle the response data as needed
    });
  });

  $("#p").on("click", function () {
    // Data to be added
    var newData = { state: finalState }; // Replace with your desired data

    // Perform POST request using jQuery
    $.post("/statetb", newData, function (data) {
      console.log("POST Response:", data);
      // Handle the response data as needed
    });
  });
});
