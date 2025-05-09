package com.tobedeveloper.connect_to_mysql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class StudentManagementSystemInitializer {

    @PostConstruct
    public void init() {
        String url = "jdbc:mysql://localhost:3306/student_management_system"; // Adjust DB name and port
        String user = "root"; // Replace with your DB username
        String password = "Tarun2000?"; // Replace with your DB password

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {

            // Create Students table
            stmt.executeUpdate("""
                CREATE TABLE IF NOT EXISTS Students (
                    StudentID INT PRIMARY KEY AUTO_INCREMENT,
                    Name VARCHAR(100) NOT NULL,
                    Email VARCHAR(100) UNIQUE NOT NULL
                );
            """);

            // Create Courses table
            stmt.executeUpdate("""
                CREATE TABLE IF NOT EXISTS Courses (
                    CourseID INT PRIMARY KEY AUTO_INCREMENT,
                    CourseName VARCHAR(100) NOT NULL,
                    Credits INT NOT NULL
                );
            """);

            // Create Enrollments table
            stmt.executeUpdate("""
                CREATE TABLE IF NOT EXISTS Enrollments (
                    EnrollmentID INT PRIMARY KEY AUTO_INCREMENT,
                    StudentID INT NOT NULL,
                    CourseID INT NOT NULL,
                    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
                    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
                );
            """);

            // Create Grades table
            stmt.executeUpdate("""
                CREATE TABLE IF NOT EXISTS Grades (
                    EnrollmentID INT PRIMARY KEY,
                    Grade VARCHAR(2) NOT NULL,
                    FOREIGN KEY (EnrollmentID) REFERENCES Enrollments(EnrollmentID) ON DELETE CASCADE
                );
            """);

            System.out.println("Student management system tables created successfully.");

        } catch (SQLException e) {
            System.out.println("Error while creating tables: " + e.getMessage());
        }
    }
}
