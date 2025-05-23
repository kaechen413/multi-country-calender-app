document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: [],
    eventDisplay: 'block'
  });
  calendar.render();

  const select = document.getElementById("country-select");
  const badgeContainer = document.getElementById("badge-container");

  fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => {
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      data.forEach((country) => {
        if (country.cca2 && country.name.common) {
          fetch(`https://date.nager.at/api/v3/PublicHolidays/2025/${country.cca2}`)
            .then(response => {
              if (response.ok) {
                return response.text();
              }
            })
          .then(text => {
            if (text) {
              try {
                const data = JSON.parse(text);
                if (data.length > 0) {
                  const option = document.createElement("option");
                  option.value = country.cca2;
                  option.textContent = country.name.common;
                  select.appendChild(option);
                }
              } catch (error) {
                console.error(`Error parsing holidays for ${country.name.common}:`, error);
              }
            }
          });
      }
    });
  });

    select.addEventListener("change", (e) => {
      const countryName = e.currentTarget.selectedOptions[0].textContent;
      const countryCode = e.currentTarget.selectedOptions[0].value;
      // Prevent duplicates
      if ([...badgeContainer.children].some(badge => badge.dataset.value === countryName)) return;

      const badge = document.createElement("span");
      badge.className = "badge-bg-success rounded-pill me-2 text-center text-white";
      badge.style.fontSize = "1em";
      badge.textContent = countryName;
      badge.dataset.value = countryName;
      badge.style.backgroundColor = "#129990";
      badgeContainer.appendChild(badge);

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "btn-close btn-close-white ms-2";
      deleteBtn.style.fontSize = "0.7em";
      badge.appendChild(deleteBtn);
      deleteBtn.addEventListener("click", (e) => {
        badge.remove();
        calendar.getEvents().forEach(event => {
          if (event.title.includes(countryCode)) {
            event.remove();
          }
        });
      });
      const years = [2024, 2025, 2026];
      const rand_Color = colors[Math.floor(Math.random() * colors.length)];
      years.forEach(year => {
        fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)
          .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.text();
            })
            .then(text => {
              const data = JSON.parse(text);
              const events = data.map(holiday => ({
                title: `${holiday.localName} (${countryCode})`,
                start: holiday.date,
                allDay: true,
                color: rand_Color || '#ffffff' // Default to white if no color is defined
              }));
              events.forEach(event => calendar.addEvent(event));
            })
            .catch(error => console.error(`Error fetching holidays for ${countryCode}:`, error));
      });
    });

  const colors = ['#90D1CA', '#129990', '#096B68'];
});
