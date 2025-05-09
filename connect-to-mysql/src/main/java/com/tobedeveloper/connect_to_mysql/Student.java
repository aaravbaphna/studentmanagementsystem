package com.tobedeveloper.connect_to_mysql;

import jakarta.persistence.*;

@Entity
@Table
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    public Student() {

    }

    public Student(String username, String email) {
        this.username = username;
        this.email = email;
    }

    // Constructors, getters, and setters

    public Long getID() {
        return id;
    }

    public void setID(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return username;
    }

    public void setFirstName(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
