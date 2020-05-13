<p align="center">
    <img alt="Gatsby" src="./src/images/logo.svg" width="50" />
</p>
<h1 align="center">
  Employees timekeeping app
</h1>

This app is used for employee's timekeeping and also, in case of an emergency, who managed to get out of the building and who is not yet at the meeting point.

## Demo

[Live Demo](https://emergency-counter.netlify.app/) 🚀

## User Flows

**Employee Arriving at the Meeting Point Flow**

    1. Employee arrives to the meeting point
    2. Employee will use his card to check-in to a card reader
    3. A counter on the dashboard of the employee’s manager will increase showing how many people are at the office and check-in at the meeting point

**Manager Observing Current Stats Flow**

    1. Manager will access the web app form their mobile phone
    2. After logging in, a dashboard will be displayed showing:
      a. How many people are registered at work in the office today
      b. How many people checked-in at the meeting points
      c. How many people did not checked-in
    3. The manager can click on the number of how many people did not checked-in and see their names
    4. The dashboard should refresh automatically without the need of the manager to refresh the page

## 😕 How to use

When the employee use his card to check-in to a card reader it should open an URL with his employee Id and a cloud function or backend API will update the changes

1. **With cloud functions**


    ```javascript
    `http://localhost:8000/.netlify/functions/emergencyCheckIn?userId=${userID}`
    ```
    ```javascript
    `http://localhost:8000/.netlify/functions/checkIn?userId=${userID}&isAtWork=${boolean}`
    ```

2. **With node API**

    P.S: Node API will not work on netlify


    ```javascript
    `http://localhost:8000/api/emergencyCheckIn/emergencyCheckIn?userId=${userID}`
    ```
    ```javascript
    `http://localhost:8000/api/isAtWork?userId=${userID}&isAtWork=${boolean}`
    ```
