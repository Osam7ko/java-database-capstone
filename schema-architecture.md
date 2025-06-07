This Spring Boot application uses both MVC and REST controllers.
Thymeleaf templates are used for the Admin and Doctor dashboards, while REST APIs serve all other modules.
The application interacts with two databases—MySQL (for patient, doctor, appointment, and admin data) and MongoDB (for prescriptions).
All controllers route requests through a common service layer, which in turn delegates to the appropriate repositories.
MySQL uses JPA entities while MongoDB uses document models


Section 2: Numbered Flow of Data and Control
1- User accesses the system through either an HTML dashboard (e.g., AdminDashboard or DoctorDashboard) or a REST API client (e.g., mobile app for appointments or patient records).

2- The action is routed to the appropriate controller based on the request type—Thymeleaf controller for HTML pages or REST controller for JSON-based API calls.

3- The controller delegates the request to the service layer to apply business logic such as validation, scheduling, or processing.

4- The service layer interacts with the repository layer to access the required data.

5- The repository connects to the corresponding database—MySQL for structured data or MongoDB for flexible, document-based data.

6- The retrieved data is mapped into Java model classes, either JPA entities (for MySQL) or MongoDB documents (for MongoDB).

7- The final result is returned to the client:

For Thymeleaf, the data is passed to HTML templates and rendered in the browser.

For REST, the data is serialized into JSON and returned as an HTTP response.
