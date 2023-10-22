let socket = io();

socket.on("connect", () => {
  console.log("connected to server");
});

socket.on("newLocationMessage", (message) => {
  console.log("new location message", message);
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.setAttribute("target", "_blank");
  a.setAttribute("href", message.url);
  a.innerText = "My Current Location";
  li.appendChild(a);

  document.querySelector("body").appendChild(li);
});

socket.on("newMessage", (message) => {
  console.log("new message", message);
  let li = document.createElement("li");
  li.innerText = `${message.from}: ${message.text}`;

  document.querySelector("body").appendChild(li);
});

socket.on("disconnect", () => {
  console.log("disconnected from server");
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#submit-btn").addEventListener("click", function (e) {
    e.preventDefault();
    socket.emit(
      "createMessage",
      {
        from: "User",
        text: document.querySelector("input[name='message']").value,
      },
      () => {
        console.log("sent");
      }
    );
  });

  document.querySelector("#send-location").addEventListener("click", (e) => {
    if (!navigator.geolocation) {
      return alert("geo location is not supported by your browser");
    }

    navigator.geolocation.getCurrentPosition(
      function (position) {
        socket.emit("createLocationMessage", {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      function () {
        alert("Unable to fetch location");
      }
    );
  });
});
