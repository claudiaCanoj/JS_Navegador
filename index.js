let entries = new Array();

function addEntry() {
  /**
   * Creo el asiento desde los datos del formulario.
   */
  const entry = {
    concept: document.getElementById("concept").value,
    amount: parseFloat(document.getElementById("amount").value)
  }
  /**
   * Añado el asiento al array de asientos
   */
  entries.push(entry);
  console.log(entries);
  
  updateStorage();
  /**
   * Añado el asiento al historial de asientos.
   */
  addEntryToTable(entry);
  /**
   * Chequear los asientos.
   */
  checkData();
  /**
   * Borro el formulario.
   */
  document.getElementById("concept").value = "";
  document.getElementById("amount").value = "";
}

function deleteEntry(entry) {
  console.log(entry);
  let aux, index;
  entries.forEach((aux, index) => {
    if (entry.concept === aux.concept && entry.amount === aux.amount) {
      entries.splice(index, 1);
    }  
  });
  updateHistory();
  updateStorage();
}

function addEntryToTable(entry) {
  const newEntry = document.createElement("div");
  if (entry.amount > 0) {
    newEntry.className = "detail_history_incoming";
  } else {
    newEntry.className = "detail_history_cost";
  }
  newEntry.innerHTML = "<div style='width: 10%'>"
                       + "<img src='8726424_trash_alt_icon.png' width=24 height=24 onclick='deleteEntry(" + JSON.stringify(entry) + ")'></div>"
                       + "<div style='width: 65%'>"  + entry.concept + "</div>"
                       + "<div style='width: 25%; text-align: right'>" + entry.amount + "</div>";
  document.getElementById("history").appendChild(newEntry);
}

/**
 * Calcula, los ingresos, gastos y balance de mis asientos.
 */
function checkData() {
  let incomings = 0;
  let costs = 0;  
  entries.forEach(entry => {
    if (entry.amount > 0) {
      incomings += entry.amount;
    } else {
      costs += entry.amount;
    }
  });
  document.getElementById("incomings").innerText = Number(incomings).toFixed(2)+"€";
  document.getElementById("costs").innerText = Number(-costs).toFixed(2)+"€";
  document.getElementById("balance").innerText = Number(incomings + costs).toFixed(2) + "€";
}

/**
 * Carga la información y la visualiza en la página.
 */
function loadData() {
  /**
   * Recupero el dato desde el localStorage.
   */
  entries = JSON.parse(localStorage.getItem("entries"));
  updateHistory();
}

/**
 * Actualiza el historial.
 */
function updateHistory() {
  document.getElementById("history").innerHTML = "";
  /**
   * Recorro el array para mostrarlo en el historial.
   */
  entries.forEach(entry => addEntryToTable(entry));
  checkData();
}

/**
 * Guardo los asientos en el localStorage.
 */
function updateStorage() {
   localStorage.setItem("entries", JSON.stringify(entries));
}
