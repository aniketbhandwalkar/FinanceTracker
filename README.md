# Personal Finance Tracker

A simple and efficient personal finance tracking web application built with Spring Boot, MySQL, and a clean HTML/CSS/JavaScript frontend.

## 🚀 Features

- **Expense Management**: Add, view, and delete personal expenses
- **Real-time Totals**: Live calculation of total expenses as you add/remove items
- **Responsive UI**: Clean, user-friendly interface built with HTML/CSS/JavaScript
- **RESTful API**: Backend API endpoints for expense CRUD operations
- **MySQL Integration**: Persistent data storage with MySQL database
- **Database Auto-setup**: Automatic table creation using Hibernate DDL

## 🛠️ Tech Stack

- **Backend**: Java 21, Spring Boot 3.4.1, Spring Data JPA, Hibernate
- **Database**: MySQL 8.0
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Build Tool**: Maven
- **Server**: Apache Tomcat (Embedded)

## 📁 Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/example/personalfinancetracker/
│   │       ├── PersonalFinanceTrackerApplication.java  # Main application class
│   │       ├── controller/
│   │       │   └── ExpenseController.java              # REST API endpoints
│   │       ├── service/
│   │       │   └── ExpenseService.java                 # Business logic layer
│   │       ├── repository/
│   │       │   └── ExpenseRepository.java              # Data access layer
│   │       └── model/
│   │           ├── Expense.java                        # JPA Entity
│   │           ├── Category.java                       # Category entity
│   │           └── User.java                           # User entity
│   └── resources/
│       ├── application.properties                      # Database configuration
│       └── static/                                     # Web frontend
│           ├── index.html                              # Main page
│           ├── expenses.html                           # Expenses listing page
│           ├── css/styles.css                          # Styling
│           └── js/app.js                              # Frontend JavaScript
```

## 🔧 Setup & Installation

### Prerequisites
- Java 21 or higher
- MySQL 8.0 or higher
- Maven 3.6+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/aniketbhandwalkar/FinanceTracker.git
cd FinanceTracker
```

### 2. Database Setup
```sql
CREATE DATABASE financedb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Configure Database Connection
Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/financedb?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password_here
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

### 4. Build and Run
```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run

# Or run the JAR file
java -jar target/personal-finance-tracker-1.0.0.jar
```

### 5. Access the Application
- **Web Interface**: http://localhost:8080
- **API Base URL**: http://localhost:8080/api/expenses

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Create new expense |
| GET | `/api/expenses/{id}` | Get expense by ID |
| PUT | `/api/expenses/{id}` | Update expense |
| DELETE | `/api/expenses/{id}` | Delete expense |
| GET | `/api/expenses/user/{userId}` | Get expenses by user |

### Sample Request Body (POST/PUT)
```json
{
  "description": "Grocery Shopping",
  "amount": 85.50,
  "date": "2024-10-02"
}
```

## 🏗️ Architecture

The application follows a layered architecture pattern:

1. **Controller Layer**: Handles HTTP requests and responses
2. **Service Layer**: Contains business logic and transaction management
3. **Repository Layer**: Data access using Spring Data JPA
4. **Entity Layer**: JPA entities mapping to database tables

## 💾 Database Schema

### Expense Table
```sql
CREATE TABLE expense (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255),
    amount DOUBLE NOT NULL,
    date DATE,
    category_id BIGINT,
    user_id BIGINT,
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);
```

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Category management with custom categories
- [ ] Budget planning and alerts
- [ ] Expense analytics and reporting
- [ ] Data export functionality
- [ ] Mobile responsive improvements
- [ ] Chart visualizations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Aniket Bhandwalkar**
- GitHub: [@aniketbhandwalkar](https://github.com/aniketbhandwalkar)

## 🙏 Acknowledgments

- Spring Boot community for excellent documentation
- MySQL for reliable database management
- Open source contributors who make projects like this possible


