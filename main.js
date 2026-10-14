
const itemInput = document.getElementById("itemInput");
const priceInput = document.getElementById("priceInput");
const addBtn = document.getElementById("addBtn");
const shoppingList = document.getElementById("shoppingList");
const totalDisplay = document.getElementById("totalDisplay");
const clearBtn = document.getElementById("clearBtn");

let items = [
  { name: "Bread", price: 70, bought: false },
  { name: "Milk", price: 80, bought: false },
  { name: "Eggs", price: 250, bought: false },
  { name: "Cheese", price: 300, bought: false },
  { name: "Butter", price: 180, bought: false }
];

// Display all shopping items
function displayItems() {
  shoppingList.innerHTML = "";

  items.forEach(function(item) {
    const newItem = document.createElement("li");

    const itemText = document.createElement("span");
    itemText.textContent = item.name + " - KSh " + item.price;
    const boughtCheckbox = document.createElement("input");
    boughtCheckbox.type = "checkbox";
    boughtCheckbox.checked = item.bought === true;

    newItem.appendChild(boughtCheckbox);
    newItem.appendChild(itemText);
    if (item.bought) {
  itemText.style.textDecoration = "line-through";
  itemText.style.color = "#888";
}

boughtCheckbox.addEventListener("change", function() {
  item.bought = boughtCheckbox.checked;
  displayItems();
});

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function() {
  const newName = prompt("Enter the new item name:", item.name);

  if (newName === null || newName.trim() === "") {
    return;
  }

  const newPrice = prompt("Enter the new price:", item.price);

  if (newPrice === null || newPrice.trim() === "") {
    return;
  }

  const price = Number(newPrice);

  if (!Number.isFinite(price) || price < 0) {
    alert("Please enter a valid price!");
    return;
  }

  item.name = newName.trim();
  item.price = price;

  displayItems();
});

    removeBtn.addEventListener("click", function() {
      const index = items.indexOf(item);
      items.splice(index, 1);
      displayItems();
    });
    newItem.appendChild(editBtn);
    newItem.appendChild(removeBtn);
    newItem.appendChild(editBtn);
    shoppingList.appendChild(newItem);
  });

  const total = items.reduce(function(sum, item) {
    return sum + item.price;
  }, 0);

  totalDisplay.textContent = "Total: KSh " + total;
}

// Add a new shopping item
addBtn.addEventListener("click", function() {
  const itemName = itemInput.value.trim();
  const itemPrice = Number(priceInput.value);

  if (itemName === "" || priceInput.value === "") {
    alert("Please enter both an item and its price!");
    return;
  }

  if (itemPrice < 0 || !Number.isFinite(itemPrice)) {
    alert("Please enter a valid price!");
    return;
  }

  items.push({
    name: itemName,
    price: itemPrice,
    bought: false
  });

  displayItems();

  itemInput.value = "";
  priceInput.value = "";

  console.log(items);
});

// Show the initial shopping list
displayItems();

clearBtn.addEventListener("click", function() {
  items = [];
  displayItems();
});