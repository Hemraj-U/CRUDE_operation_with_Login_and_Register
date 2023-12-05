function validateForm() {
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var address = document.getElementById("address").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;

  if (name == "") {
    alert("please Enter name");
    return false;
  }
  if (age == "") {
    alert("please enter age");
    return false;
  } else if (age < 1) {
    alert("Age must be positive number");
    return false;
  }
  if (address == "") {
    alert("please Enter the address");
    return false;
  }
  if (email == "") {
    alert("please enter email");
    return false;
  } else if (!email.includes("@")) {
    alert("invalid email address");
    return false;
  }
  if (phone == "") {
    alert("please enter phone no");
    return false;
  }
  return true;
}

function showData() {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  var html = "";

  peopleList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.age + "</td>";
    html += "<td>" + element.address + "</td>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.phone + "</td>";
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Delete</button> <button onclick="updateData(' +
      index +
      ')" class="btn btn-warning m-2">Edit</button>';
    html += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData();

function AddData() {
  if (validateForm() == true) {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.push({
      name: name,
      age: age,
      address: address,
      email: email,
      phone: phone,
    });

    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
  }
}

function deleteData(index) {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
}

function updateData(index) {
  document.getElementById("submit").style.display = "none";
  document.getElementById("update").style.display = "block";

  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  document.getElementById("name").value = peopleList[index].name;
  document.getElementById("age").value = peopleList[index].age;
  document.getElementById("address").value = peopleList[index].address;
  document.getElementById("email").value = peopleList[index].email;
  document.getElementById("phone").value = peopleList[index].phone;

  document.querySelector("#update").onclick = function () {
    if (validateForm() == true) {
      peopleList[index].name = document.getElementById("name").value;
      peopleList[index].age = document.getElementById("age").value;
      peopleList[index].address = document.getElementById("address").value;
      peopleList[index].email = document.getElementById("email").value;
      peopleList[index].phone = document.getElementById("phone").value;

      localStorage.setItem("peopleList", JSON.stringify(peopleList));

      showData();

      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("address").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";

      document.getElementById("submit").style.display = "block";
      document.getElementById("update").style.display = "none";
    }
  };
}
