const toggle = document.getElementById("chat-toggle");
const box = document.getElementById("chat-box");
const messages = document.getElementById("chat-messages");
const options = document.getElementById("chatbot-options");

const bookingData = {
  service: "",
  parking: "",
  ppf: "",
  polish: "",
  paint: "",
  car: "",
  name: "",
  phone: ""
};

const bareeqNumber = "966583666993";

toggle.onclick = () => {
  box.style.display = box.style.display === "flex" ? "none" : "flex";
  if (box.style.display === "flex") startChat();
};

function addBot(text) {
  messages.innerHTML += `<p><strong>Bareeq:</strong> ${text}</p>`;
  scroll();
}

function addUser(text) {
  messages.innerHTML += `<p><strong>You:</strong> ${text}</p>`;
  scroll();
}

function scroll() {
  messages.scrollTop = messages.scrollHeight;
}

function clearOptions() {
  options.innerHTML = "";
}

function button(text, action) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.onclick = action;
  options.appendChild(btn);
}

function inputField(placeholder, cb) {
  clearOptions();

  const input = document.createElement("input");
  input.placeholder = placeholder;

  const btn = document.createElement("button");
  btn.textContent = "Next";

  btn.onclick = () => {
    const value = input.value.trim();

    if (!value) {
      alert("Please fill this field");
      return;
    }

    addUser(value);
    cb(value);
  };

  options.appendChild(input);
  options.appendChild(btn);
}

function startChat() {
  messages.innerHTML = "";
  clearOptions();

  addBot("Welcome to Bareeq Auto Care 👋, How can i help you today?");

  button("Make a Reservation", () => {
    addUser("Make a Reservation");
    chooseService();
  });

  button("View Starting Prices", () => {
    addUser("View Starting Prices");
    showPrices();
  });

  button("FAQ", () => {
    addUser("FAQ");
    faq();
  });

  button("Contact Bareeq", () => {
    addUser("Contact Bareeq");
    contact();
  });
}

function showPrices() {
  clearOptions();

  addBot(`
Here are our starting prices ✨<br><br>
<strong>PPF:</strong> starts from 12,800 SAR<br>
<strong>One Step Detailing:</strong> starts from 800 SAR<br>
<strong>Paint Correction:</strong> starts from 1,500 SAR<br>
<strong>Interior Detailing:</strong> starts from 350 SAR<br>
<strong>Tint:</strong> starts from 1,600 SAR<br>
<strong>Graphics:</strong> price on demand<br><br>
Prices may vary depending on the car condition and selected package.
  `);

  button("Book a Service", () => {
    addUser("Book a Service");
    chooseService();
  });

  button("Back", startChat);
}

function chooseService() {
  clearOptions();
  addBot("Which service would you like to book? ✨");

  [
    "PPF",
    "One Step Detailing",
    "Graphics",
    "Paint Correction",
    "Interior Detailing",
    "Tint"
  ].forEach(service => {
    button(service, () => {
      bookingData.service = service;
      addUser(service);
      askParking();
    });
  });
}

function askParking() {
  addBot("Do you usually park your car in the shade or under direct sunlight?");
  clearOptions();

  button("Shade", () => {
    addUser("Shade");
    bookingData.parking = "Shade";
    askPPF();
  });

  button("Direct Sunlight", () => {
    addUser("Direct Sunlight");
    bookingData.parking = "Direct Sunlight";
    askPPF();
  });
}

function askPPF() {
  addBot("Has your car ever had PPF applied before?");
  clearOptions();

  button("Yes", () => {
    addUser("Yes");
    bookingData.ppf = "Yes";
    askPolish();
  });

  button("No", () => {
    addUser("No");
    bookingData.ppf = "No";
    askPolish();
  });
}

function askPolish() {
  addBot("Has your car ever undergone polishing?");
  clearOptions();

  button("Yes", () => {
    addUser("Yes");
    bookingData.polish = "Yes";
    askPaint();
  });

  button("No", () => {
    addUser("No");
    bookingData.polish = "No";
    askPaint();
  });
}

function askPaint() {
  addBot("Is your car repainted, or does it still have its original OEM paint?");
  clearOptions();

  button("Repainted", () => {
    addUser("Repainted");
    bookingData.paint = "Repainted";
    askCar();
  });

  button("Original OEM Paint", () => {
    addUser("Original OEM Paint");
    bookingData.paint = "Original OEM Paint";
    askCar();
  });
}

function askCar() {
  addBot("What is your car model?");
  inputField("Example: BMW M4, Toyota Supra", value => {
    bookingData.car = value;
    askName();
  });
}

function askName() {
  addBot("May I have your name?");
  inputField("Enter your name", value => {
    bookingData.name = value;
    askPhone();
  });
}

function askPhone() {
  addBot("What is your phone number?");
  inputField("05XXXXXXXX", value => {
    bookingData.phone = value;
    confirmBooking();
  });
}

function getRecommendation() {
  let recommendations = [];

  if (bookingData.parking === "Direct Sunlight") {
    recommendations.push("Ceramic Coating for extra protection against heat and direct sunlight");
  }

  if (bookingData.ppf === "No") {
    recommendations.push("PPF to protect the paint from rock chips and scratches");
  }

  if (bookingData.polish === "No") {
    recommendations.push("Paint Correction or One Step Detailing to improve gloss");
  }

  if (bookingData.paint === "Repainted") {
    recommendations.push("A paint inspection before applying PPF or paint correction");
  }

  if (recommendations.length === 0) {
    return "Your car seems ready for the selected service. Our team will confirm the best package for you.";
  }

  return recommendations.join("<br>• ");
}

function getRecommendationForWhatsapp() {
  return getRecommendation().replaceAll("<br>• ", "\n- ");
}

function confirmBooking() {
  clearOptions();

  const recommendation = getRecommendation();

  addBot(`
Please confirm your booking request:<br><br>
<strong>Service:</strong> ${bookingData.service}<br>
<strong>Parking:</strong> ${bookingData.parking}<br>
<strong>Previous PPF:</strong> ${bookingData.ppf}<br>
<strong>Previous Polishing:</strong> ${bookingData.polish}<br>
<strong>Paint Condition:</strong> ${bookingData.paint}<br>
<strong>Car:</strong> ${bookingData.car}<br>
<strong>Name:</strong> ${bookingData.name}<br>
<strong>Phone:</strong> ${bookingData.phone}<br><br>
<strong>Recommended:</strong><br>
• ${recommendation}
  `);

  button("Send to WhatsApp", sendToWhatsApp);
  button("Start Again", startChat);
}

function sendToWhatsApp() {
  const msg = `
Hello Bareeq Auto Care,

I would like to make a reservation.

Name: ${bookingData.name}
Phone: ${bookingData.phone}
Car: ${bookingData.car}
Service: ${bookingData.service}

Car Information:
Parking: ${bookingData.parking}
Previous PPF: ${bookingData.ppf}
Previous Polishing: ${bookingData.polish}
Paint Condition: ${bookingData.paint}

Recommendation:
- ${getRecommendationForWhatsapp()}
`;

  window.open(
    `https://wa.me/${bareeqNumber}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}

function faq() {
  clearOptions();

  addBot("Common questions:");

  button("What services do you offer?", () => {
    addUser("What services do you offer?");
    addBot("We offer PPF, one step detailing, paint correction, graphics, interior detailing, tint, and more ✨");
  });

  button("Where are you located?", () => {
    addUser("Where are you located?");
    addBot("Bareeq Auto Care is located in Jeddah, Saudi Arabia — North Obhur 23816.");
  });

  button("How can I book?", () => {
    addUser("How can I book?");
    addBot("Let me know the service you’re looking for, and I’ll handle your booking instantly with joy ✨");
  });

  button("Back", startChat);
}

function contact() {
  clearOptions();

  addBot("You can contact Bareeq directly through WhatsApp.");

  button("Open WhatsApp", () => {
    const msg = "Hello Bareeq Auto Care, I would like to ask about your services.";
    window.open(
      `https://wa.me/${bareeqNumber}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  });

  button("Back", startChat);
}
