# Room Booking Portal — Knowledge Centre

A lightweight, single-file room booking system for managing training and conference rooms. Built with plain HTML/CSS/JS, backed by Google Sheets as the database.

---

## Features

- **Live room status** — see which rooms are free, occupied, or ending soon
- **30-day schedule view** — click any room card to see its full availability
- **Public booking requests** — anyone can request a booking without admin access
- **Admin panel** — approve, modify, reject requests and manage all bookings
- **Google Sheets backend** — all data stored in a spreadsheet, no server needed
- **Auto-refresh** — portal polls for fresh data every 30 seconds (configurable)
- **Export to Excel** — download all bookings as `.xlsx`

---

## Project Structure

```
/
├── index.html       # Entire frontend — single file, deploy anywhere
├── Code.gs          # Google Apps Script — paste into your Apps Script project
└── README.md
```

---

## Setup

### 1. Google Sheet

Create a sheet with these exact column headers in row 1:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| BookingID | Room | BookedBy | Purpose | BookingDate | StartTime | EndTime | Attendees | Status |

Sheet tab name must be **`Sheet1`** (or update `SHEET_NAME` in `Code.gs`).

### 2. Google Apps Script

1. Open your sheet → **Extensions → Apps Script**
2. Replace all code in `Code.gs` with the contents of this repo's `Code.gs`
3. Save
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the `/exec` URL

### 3. index.html

Update these two lines near the top of the `<script>` section:

```javascript
const ADMIN_PASSWORD = 'your-password-here';
const API_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

### 4. Deploy

Push `index.html` to GitHub and enable **GitHub Pages** on the repo.

---

## Configuration

All config is at the top of the `<script>` block in `index.html`.

### Rooms

Add or remove rooms from the `ROOMS` array:

```javascript
const ROOMS = [
  { id: 'brihaspati', name: 'Brihaspati', floor: '2nd Floor' },
  { id: 'chanakya',   name: 'Chanakya',   floor: '4th Floor' },
  // add more here
];
```

The `id` must match exactly what is stored in the `Room` column of your sheet.

### Auto-refresh interval

Find `setInterval` inside the `init()` function and change the last value (milliseconds):

```javascript
}, 30000); // 30000 = 30 sec | 60000 = 1 min | 300000 = 5 min
```

---

## How It Works

### Public user flow

1. Open the portal → see all rooms and their current status
2. Click **Request a Booking** on any room tile
3. Fill in name, purpose, date, time, attendees → Submit
4. Request is saved to Google Sheet with status `Pending`
5. User sees a confirmation message

### Admin flow

1. Click **Admin Panel** → enter password
2. **Pending Requests** section shows all unreviewed requests with a count badge
3. For each request, admin can:
   - ✅ **Approve** — status becomes `Confirmed`, appears on room tiles
   - ✏️ **Modify & Approve** — edit date/time before confirming
   - ❌ **Reject** — removed from pending (optionally with a reason)
4. Admin can also directly add bookings via the sidebar form

### Status values in sheet

| Status | Meaning |
|---|---|
| `Confirmed` | Shown on room status tiles and schedule |
| `Pending` | Visible only in Admin → Pending Requests |
| `Rejected` | Hidden from public; visible in Admin → All Bookings |

---

## Redeploying Apps Script

Whenever you update `Code.gs`, you must create a **new version** of the deployment or changes won't take effect:

1. Apps Script → **Deploy → Manage deployments**
2. Click the ✏️ edit icon
3. Change version to **New version**
4. Click **Deploy**

The `/exec` URL stays the same — no change needed in `index.html`.

---

## Tech Stack

- Vanilla HTML, CSS, JavaScript — no framework, no build step
- Google Sheets + Apps Script — free, no database needed
- GitHub Pages — free hosting
- SheetJS (`xlsx`) — client-side Excel export
