document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: [],
    eventDisplay: 'block'
  });
  calendar.render();

  const countries = ['JP', 'CN']; // Japan and China
  const colors = {
    JP: '#fdd835',  // Yellow for Japan
    CN: '#4fc3f7'   // Blue for China
  };

  countries.forEach((country) => {
    fetch(`https://date.nager.at/api/v3/PublicHolidays/2025/${country}`)
      .then(response => response.json())
      .then(data => {
        const events = data.map(holiday => ({
          title: `${holiday.localName} (${country})`,
          start: holiday.date,
          allDay: true,
          color: colors[country]
        }));
        events.forEach(event => calendar.addEvent(event));
      })
      .catch(error => console.error(`Error fetching holidays for ${country}:`, error));
  });
});
