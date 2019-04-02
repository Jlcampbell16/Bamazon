function runManager() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Products for Sale":
          viewProcucts();
          break;

        case "View Low Inventory":
          lowInventory();
          break;

        case "`Add to Inventory`":
          addInventory();
          break;

        case "Add New Product":
          newProduct();
          break;
      }
    });
}

function viewProducts() {

}

function lowInventory() {

}

function addInventory() {

}

function newProduct() {

}