#  User Stories – Smart Clinic Appointment Portal

This document defines user stories for the **Smart Clinic Management System**, focusing on the roles of **Admin**, **Doctor**, and **Patient**. Each story follows the standard agile format and includes acceptance criteria using Gherkin syntax.

---

## Admin User Stories

### 1. Manage User Access

**Title:**  
_As an admin, I want to log into the portal with my username and password, so that I can manage the platform securely._

**Acceptance Criteria:**  
1. Given I am on the login page  
   When I enter valid credentials  
   Then I should be redirected to the admin dashboard

2. Given I enter invalid credentials  
   Then I should see an error message

**Priority:** High  
**Story Points:** 2  
**Notes:**  
- Secure login with session management.

---

##  Doctor User Stories

### 2. Manage Availability

**Title:**  
_As a doctor, I want to set my available time slots, so that patients can book appointments during my working hours._

**Acceptance Criteria:**  
1. Given I am logged in as a doctor  
   When I navigate to my availability settings  
   And I create a new time slot  
   Then it should be visible in the appointment booking calendar

2. Given I select an overlapping time slot  
   Then I should be shown a validation error

**Priority:** High  
**Story Points:** 3  
**Notes:**  
- Time slot format should be standardized (e.g., 1 hour blocks).

---

### 3. View Patient Appointments

**Title:**  
_As a doctor, I want to view all upcoming appointments, so that I can prepare for consultations._

**Acceptance Criteria:**  
1. Given I am on my dashboard  
   When I click on “View Appointments”  
   Then I should see a list of all booked appointments with patient details

2. Given I click on a specific appointment  
   Then I should see patient details and appointment notes

**Priority:** Medium  
**Story Points:** 2  
**Notes:**  
- Past appointments should be listed separately.

---

##  Patient User Stories

### 4. Book an Appointment

**Title:**  
_As a patient, I want to book an appointment with a doctor, so that I can receive medical consultation._

**Acceptance Criteria:**  
1. Given I am logged in as a patient  
   When I search for a doctor and choose an available slot  
   Then I should receive a confirmation of my appointment

2. Given I choose a slot that is already booked  
   Then I should not be allowed to proceed

**Priority:** High  
**Story Points:** 3  
**Notes:**  
- Slot conflict resolution required at backend.

---

### 5. Cancel an Appointment

**Title:**  
_As a patient, I want to cancel a booked appointment, so that I can free up the slot if I can’t attend._

**Acceptance Criteria:**  
1. Given I have an upcoming appointment  
   When I choose to cancel it  
   Then it should be removed from my dashboard

2. Then the doctor should be notified of the cancellation

**Priority:** Medium  
**Story Points:** 2  
**Notes:**  
- Add cancellation policy logic in future.

---

##  Notes

- All stories follow the INVEST principles: **Independent, Negotiable, Valuable, Estimable, Small, and Testable**.
- Large modules like **Prescription Management** are considered **Epics** and will be broken down into stories later.
