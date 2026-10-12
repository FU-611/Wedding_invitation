// Wedding date: 6 November 2026. The time is intentionally not specified.
const weddingDate = new Date(2026, 10, 6, 0, 0, 0);
const countdown = document.getElementById("countdown");
function updateCountdown() {
  const remaining = weddingDate.getTime() - Date.now();
  if (remaining <= 0) {
    countdown.textContent = "Today is the day! ♥";
    return;
  }
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  countdown.textContent = `${days} days ${hours} hours ${minutes} min ${seconds} sec`;
}
updateCountdown();
setInterval(updateCountdown, 1000);

// November 2026 begins on Sunday. Render Monday-first calendar with the 6th highlighted.
const grid = document.getElementById("calendarGrid");
const firstDay = new Date(2026, 10, 1).getDay();
const mondayOffset = (firstDay + 6) % 7;
for (let i = 0; i < mondayOffset; i++) {
  const blank = document.createElement("span");
  blank.className = "day empty";
  blank.setAttribute("aria-hidden", "true");
  grid.appendChild(blank);
}
for (let day = 1; day <= 30; day++) {
  const cell = document.createElement("span");
  cell.className = day === 6 ? "day wedding" : "day";
  cell.textContent = day;
  if (day === 6) {
    cell.setAttribute("aria-label", "November 6, wedding day");
    cell.title = "Wedding day ♥";
  }
  grid.appendChild(cell);
}

document.getElementById("addCalendar").addEventListener("click", () => {
  const event = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Amira and Mahmoud//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:amira-mahmoud-wedding-20261106@invitation",
    "DTSTAMP:20261012T000000Z",
    "DTSTART;VALUE=DATE:20261106",
    "DTEND;VALUE=DATE:20261107",
    "SUMMARY:Amira & Mahmoud - Wedding Reception",
    "LOCATION:Romancia Venue\\, Moqattam",
    "DESCRIPTION:Wedding celebration of Amira and Mahmoud.",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n") + "\r\n";

  const blob = new Blob([event], {
    type: "text/calendar;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "Amira-and-Mahmoud-Wedding.ics";
  link.style.display = "none";

  document.body.appendChild(link);

  try {
    link.click();

    document.getElementById("calendarStatus").textContent =
      "If the file didn't download, open the calendar file below.";

    // Fallback link for mobile browsers
    link.textContent = "Open Calendar File";
    link.removeAttribute("download");
    link.style.display = "inline-block";
    link.style.marginTop = "10px";

    document.getElementById("calendarStatus").appendChild(
      document.createElement("br")
    );
    document.getElementById("calendarStatus").appendChild(link);

    // Give the browser time to process the download.
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (error) {
    document.getElementById("calendarStatus").textContent =
      "Couldn't download the calendar file. Try opening the link again.";
  }
});

const openButton = document.getElementById("openInvitation");
const introPage = document.getElementById("introPage");
const music = document.getElementById("weddingMusic");

openButton.addEventListener("click", async () => {
  introPage.classList.add("closing");

  setTimeout(() => {
    introPage.remove();
  }, 800);

  try {
    await music.play();
  } catch (error) {
    console.log("تعذر تشغيل الأغنية:", error);
  }
});