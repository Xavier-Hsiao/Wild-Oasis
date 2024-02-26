## About the project

This is an internal app for a fictional small boutique hotel called **_The Wild Oasis_**, which features 8 luxurious wooden cabins 🛖

The Wild Oasis staff will use this custom-built app to manage hotel operations, such as **bookings**, **cabins** and **guests**. More precisely, the app will be used to **check in guests when they arrive**.

## Features & Requirements

### Authentication
1. Users need to be signed up before being logged in.

2. Users need to be logged in to perform tasks.

3. Users can upload an avatar and changer their name and password

### Cabins
4. Users can see a table with all cabin information, such as cabin photo, name, capacity, price and current discount.

5. Users can create, update or delete a cabin.

### Bookings
6. Users can see a table with all bookings, included arrival and departure dates, status and paid amount, as well as cabin and guest data.
    - Other booking data includes:
        - Number of guests
        - Number of nights
        - Guest observations
        - Booked breakfast or not
        - Breakfast price

    - Other guest data includes:
        - Full name
        - Email
        - National ID
        - Nationality
        - Country flag

7. Users can filter bookings table by **status**, which can be **unconfirmed**, **checked in** and **checked out**.

### Check-in/out
8. Users can delete, check in and check out a booking as guest arrives.

9. Users need to accept payment and then confirm the payment has been received.

### Dashboard
10. Users can see a dashboard as initial screen, which displays important information for the last 7, 30 or 90 days.

    - A list of guest checking in and out on the current day
    - Statistics on recent bookings, scales, check-ins and occupancy rate
    - A chart showing all daily hotel sales, showing both **total sales** and **extra sales**  
    - A chart showing daily statistics on daily durations

### Settings
11. Users can define application settings, included breakfast price, min and max nights/booking, max guests/booking

12. Users can switch between light and dark mode

## Pages
- Dashboard 👉 `/dashboard`

- Cabins 👉 `/cabins`

- Bookings 👉 `/bookings`

- Booking check in 👉 `/checkin/:bookingId`

- App settings 👉 `/settings`

- User sign up 👉 `/user`

- Login 👉 `/login`

- Account settings 👉 `/account`
