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
        String password = "A@rav123"; // Replace with your DB password

        try (Connection conn = DriverManager.getConnection(url, user, password);
                Statement stmt = conn.createStatement()) {

            // Create Students table
            stmt.executeUpdate("""
                        CREATE TABLE IF NOT EXISTS Students (
                            StudentID INT PRIMARY KEY AUTO_INCREMENT,
                            Name VARCHAR(100) NOT NULL,
                            Email VARCHAR(100) UNIQUE NOT NULL,
                            Password VARCHAR(100) NOT NULL
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

            stmt.executeUpdate("""
                        INSERT INTO Students (Name, Email, Password) VALUES
                        ('Sophia Johnson', 'sophia.johnson@school.edu', 'sophia123'),
                        ('Liam Davis', 'liam.davis@school.edu', 'liam123'),
                        ('Olivia Martinez', 'olivia.martinez@school.edu', 'olivia123'),
                        ('Ethan Miller', 'ethan.miller@school.edu', 'ethan123'),
                        ('Isabella Wilson', 'isabella.wilson@school.edu', 'isabella123'),
                        ('James Anderson', 'james.anderson@school.edu', 'james123'),
                        ('Mia Taylor', 'mia.taylor@school.edu', 'mia123'),
                        ('Noah Thomas', 'noah.thomas@school.edu', 'noah123'),
                        ('Ava Moore', 'ava.moore@school.edu', 'ava123'),
                        ('Lucas Lee', 'lucas.lee@school.edu', 'lucas123'),
                        ('Amelia Harris', 'amelia.harris@school.edu', 'amelia123'),
                        ('Benjamin Clark', 'benjamin.clark@school.edu', 'benjamin123'),
                        ('Charlotte Walker', 'charlotte.walker@school.edu', 'charlotte123'),
                        ('Henry Robinson', 'henry.robinson@school.edu', 'henry123'),
                        ('Zoe Lewis', 'zoe.lewis@school.edu', 'zoe123');
                    """);
            stmt.executeUpdate("""
                        INSERT INTO Courses (CourseName, Credits) VALUES
                        ('Introduction to Computer Science', 4),
                        ('Data Structures and Algorithms', 3),
                        ('Database Management Systems', 3),
                        ('Operating Systems', 4),
                        ('Artificial Intelligence', 4),
                        ('Software Engineering', 3),
                        ('Web Development', 3),
                        ('Computer Networks', 3),
                        ('Machine Learning', 4),
                        ('Cybersecurity', 3),
                        ('Mobile App Development', 3),
                        ('Human-Computer Interaction', 3),
                        ('Cloud Computing', 3),
                        ('Calculus I', 4),
                        ('Calculus II', 4);
                    """);

            System.out.println("Student management system tables created successfully.");

        } catch (SQLException e) {
            System.out.println("Error while creating tables: " + e.getMessage());
        }
    }
}
