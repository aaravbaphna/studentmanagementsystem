package com.tobedeveloper.connect_to_mysql;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class homeController {

    @GetMapping("/")
    public String home() {
        return "titlePage.html"; // Returns index.html from /static/
    }
}
