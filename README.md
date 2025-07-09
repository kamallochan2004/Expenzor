# Expenzor

## About Expenzor

Expenzor is a fully functional expense management application designed to help users efficiently track and manage their regular expenses. It provides a robust solution for personal finance tracking, offering both a powerful backend and an intuitive frontend.

## Features

  * **Expense Tracking:** Easily record and categorize your daily expenses.

  * **Categorization:** Organize expenses into custom categories for better insights.

  * **API Driven:** A well-defined API for seamless interaction between frontend and backend.

## Technologies Used

Expenzor is built using a modern tech stack, ensuring performance, reliability, and maintainability.

### Backend (`Expenzor_Backend`)

  * **Java:** Core backend logic.

  * **Spring Boot:** Framework for building robust and scalable applications.

  * **Maven:** Dependency management and build automation.

  * **Database** PostgreSQL.

  * **RESTful APIs:** For communication with the frontend.

### Frontend (`Expenzor_Frontend`)

  * **TypeScript:** For type-safe and maintainable JavaScript code.

  * **React:** For building interactive user interfaces.

  * **NPM/Yarn:** Package management.

  * **HTML/CSS:** For structuring and styling the web application.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

  * **Java Development Kit (JDK) 21 or higher**

  * **Node.js (LTS version recommended)**

  * **npm (Node Package Manager) or Yarn**

  * **Maven**

  * **Docker and Docker Compose (Optional, for containerized deployment)**

  * **A database server (e.g., PostgreSQL, MySQL) and a client for database management.** (Specify if a particular one is required)

### Installation

1.  **Clone the repository:**

    ```
    git clone https://github.com/kamallochan2004/Expenzor.git
    cd Expenzor
    ```

2.  **Backend Setup:**

    ```
    cd Expenzor_Backend
    # Configure your database connection in src/main/resources/application.properties (or application.yml)
    # Example:
    # spring.datasource.url=jdbc:postgresql://localhost:5432/expenzordb
    # spring.datasource.username=your_username
    # spring.datasource.password=your_password
    # spring.jpa.hibernate.ddl-auto=update # or create, depending on your needs
    mvn clean install
    ```

3.  **Frontend Setup:**

    ```
    cd ../Expenzor_Frontend
    npm install # or yarn install
    ```

### Running the Application

You can run the application using two methods: manually or using Docker Compose.

#### Manual Run

1.  **Start the Backend:**

    ```
    cd Expenzor_Backend
    mvn spring-boot:run
    ```

    The backend will typically run on `http://localhost:8080`.

2.  **Start the Frontend:**

    ```
    cd ../Expenzor_Frontend
    npm start # or yarn start
    ```

    The frontend will typically open in your browser at `http://localhost:3000`.

#### Using Docker Compose (Recommended for Development)

1.  **Ensure Docker and Docker Compose are installed and running.**

2.  **From the root directory of the cloned repository:**

    ```
    docker-compose up --build
    ```

    This command will build the Docker images for both backend and frontend, and then start the containers. The application will be accessible at `http://localhost:3000` (frontend) and the backend at `http://localhost:8080` (within the Docker network, or exposed as configured).

## API Documentation

Detailed API documentation can be found in the `api_documentation` directory. This documentation provides endpoints, request/response formats, and authentication details for interacting with the Expenzor backend.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star\! Thanks again\!

1.  Fork the Project

2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)

3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)

4.  Push to the Branch (`git push origin feature/AmazingFeature`)

5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

Project Link: [https://github.com/kamallochan2004/Expenzor](https://github.com/kamallochan2004/Expenzor)
