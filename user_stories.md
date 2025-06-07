#  User Stories – Smart Clinic Appointment Portal

This document defines user stories for the **Smart Clinic Management System**, focusing on the roles of **Admin**, **Doctor**, and **Patient**. Each story follows the standard agile format and includes acceptance criteria using Gherkin syntax.

---

## Admin User Stories

### 1. Manage User Access

**Story:**  
As an **admin**, I need to **add and remove doctors or patients** so that **I can control who has access to the system**.

**Assumptions:**  
- Only admins have permission to manage users.
- Doctors and patients have separate roles.

**Acceptance Criteria:**  

Given I am logged in as an admin
When I go to the user management page
And I choose to add a doctor
Then the doctor should receive login credentials
And appear in the doctor list

---

##  Doctor User Stories

### 2. Manage Availability

**Story:**  
As a **doctor**, I need to **set my available time slots** so that **patients can book appointments during my working hours**.

**Assumptions:**  
- Time slots cannot overlap.
- Changes take effect immediately.

**Acceptance Criteria:**  

Given I am logged in as a doctor
When I navigate to my availability settings
And I create a new time slot
Then it should be visible in the appointment booking calendar

### 3. View Patient Appointments

**Story:**  
As a **doctor**, I need to **view all upcoming appointments** so that **I can prepare for consultations**.

**Acceptance Criteria:**  

Given I am on my dashboard
When I click on “View Appointments”
Then I should see a list of all booked appointments with patient details

---

##  Patient User Stories

### 4. Book an Appointment

**Story:**  
As a **patient**, I need to **book an appointment with a doctor** so that **I can receive medical consultation**.

**Assumptions:**  
- Only available time slots are shown.
- Patients can cancel if needed.

**Acceptance Criteria:**  

Given I am logged in as a patient
When I search for a doctor and choose an available slot
Then I should receive a confirmation of my appointment

### 5. Cancel an Appointment

**Story:**  
As a **patient**, I need to **cancel a booked appointment** so that **I can free up the slot if I can’t attend**.

**Acceptance Criteria:**  

Given I have an upcoming appointment
When I choose to cancel it
Then it should be removed from my dashboard
And the doctor should be notified

---

##  Notes

- All stories are aligned with INVEST principles: Independent, Negotiable, Valuable, Estimable, Small, and Testable.
- Larger modules like **appointment system management** or **prescription handling** are considered **Epics** and will be broken down further during sprint planning.

