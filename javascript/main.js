document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: [],
    eventDisplay: 'block'
  });
  calendar.render();

  const select = document.getElementById("country-select");

  fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => {
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      data.forEach((country) => {
        if (country.cca2 && country.name.common) {
          fetch(`https://date.nager.at/api/v3/PublicHolidays/2025/${country.cca2}`)
            .then(response => {
                          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
          })
          .then(text => {
            if (text) {
              const option = document.createElement("option");
              option.value = country.cca2;
              option.textContent = country.name.common;
              select.appendChild(option);
            }
          });
      };
    });

    select.addEventListener("change", (e) => {
      console.log(Array.from(select.selectedOptions));
      const countries = Array.from(select.selectedOptions).map(option => option.value);
      countries.forEach(country => {
        fetch(`https://date.nager.at/api/v3/PublicHolidays/2025/${country}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
          })
          .then(text => {
            if (!text) {
              document.getElementById("alert").innerHTML = `<div class="alert alert-danger" role="alert">No data found for ${country}</div>`;
              return;
            }
            document.getElementById("alert").innerHTML = '';
            const data = JSON.parse(text);
            const events = data.map(holiday => ({
              title: `${holiday.localName} (${country})`,
              start: holiday.date,
              allDay: true,
              color: colors.sample || '#ffffff' // Default to white if no color is defined
            }));
            events.forEach(event => calendar.addEvent(event));
          })
          .catch(error => console.error(`Error fetching holidays for ${country}:`, error));
      });
  });

  const colors = {
    sample: '#34A853'
  };
});
