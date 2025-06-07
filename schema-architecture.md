This Spring Boot application uses both MVC and REST controllers.
Thymeleaf templates are used for the Admin and Doctor dashboards, while REST APIs serve all other modules.
The application interacts with two databases—MySQL (for patient, doctor, appointment, and admin data) and MongoDB (for prescriptions).
All controllers route requests through a common service layer, which in turn delegates to the appropriate repositories.
MySQL uses JPA entities while MongoDB uses document models


Section 2: Numbered Flow of Data and Control
1-User Interaction
The user interacts with the system either through an HTML-based dashboard (e.g., AdminDashboard, DoctorDashboard) or via a REST API client (e.g., mobile app) to access modules like appointments or patient records.

2-Request Routing to Controller
The incoming request is routed to the appropriate controller based on its type:

Thymeleaf Controllers handle server-side rendered views (HTML).

REST Controllers handle API requests and return JSON responses.

3-Business Logic Execution in Service Layer
The controller delegates the request to the service layer, where business logic is applied—such as validating inputs, checking doctor availability, or managing workflows.

4-Data Access via Repository Layer
The service layer calls the repository layer to perform database operations. Two types of repositories are used:

JPA repositories for accessing MySQL (patients, doctors, appointments, admin users).

MongoDB repositories for accessing prescription data.

5-Fetching from Databases
Each repository interacts directly with its corresponding database:

MySQL stores structured, relational data.

MongoDB stores flexible, document-based data.

6-Model Binding
Retrieved data is bound to Java model classes:

@Entity classes for MySQL data.

@Document classes for MongoDB documents.

7-Response Rendering
The models are used to generate the final response:

Thymeleaf templates render dynamic HTML views for browser users.

REST controllers return the models (or DTOs) as JSON for API consumers.
