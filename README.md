# Multi-Country Holiday Calendar

This project is a web application that displays public holidays for selected countries on an interactive calendar. Users can select one or more countries from a dropdown, and the holidays for 2024, 2025, and 2026 will be shown on the calendar. Each selected country is displayed as a badge, and users can remove a country (and its holidays) by clicking the delete button on the badge.

## Features

- **Country Selection:** Only countries with available holiday data are shown in the dropdown.
- **Multi-Year Support:** Holidays for 2024, 2025, and 2026 are displayed.
- **Interactive Calendar:** Uses [FullCalendar](https://fullcalendar.io/) for a modern, interactive calendar UI.
- **Country Badges:** Each selected country appears as a badge with a delete button to remove its holidays from the calendar.
- **Responsive Design:** Built with Bootstrap for mobile-friendly layouts.

## How It Works

1. On page load, the app fetches all countries from the [REST Countries API](https://restcountries.com/).
2. For each country, it checks if public holiday data is available for 2025 using the [Nager.Date API](https://date.nager.at/).
3. Only countries with holiday data are added to the dropdown, sorted alphabetically.
4. When a user selects a country, a badge is created and holidays for 2024, 2025, and 2026 are fetched and displayed on the calendar.
5. Clicking the delete button on a badge removes the badge and all related holidays from the calendar.

## Tech Stack

- HTML, CSS, JavaScript
- [FullCalendar](https://fullcalendar.io/) for the calendar UI
- [Bootstrap 5](https://getbootstrap.com/) for styling
- [REST Countries API](https://restcountries.com/) for country data
- [Nager.Date API](https://date.nager.at/) for public holiday data

## How to Run

1. Clone or download this repository.
2. Open `index.html` in your browser.
3. Select a country from the dropdown to view its holidays on the calendar.

## File Structure

```
calendar-app/
├── index.html
├── css/
│   └── style.css
├── javascript/
│   └── main.js
```

## Customization

- **Colors:** You can customize the badge and event colors by editing the `colors` array in `main.js`.
- **Years:** To change which years are displayed, modify the `years` array in the event handler in `main.js`.

## Credits

- [FullCalendar](https://fullcalendar.io/)
- [Bootstrap](https://getbootstrap.com/)
- [REST Countries API](https://restcountries.com/)
- [Nager.Date API](https://date.nager.at/)

---

Enjoy your multi-country holiday calendar!
