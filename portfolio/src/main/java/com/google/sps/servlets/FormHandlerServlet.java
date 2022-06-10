package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/form-handler")
public class FormHandlerServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    // Get the values entered in the form.
    String nameValue = request.getParameter("name-input");
    String emailValue = request.getParameter("email-input");
    String messageValue = request.getParameter("message-input");

    // Print the value so you can see it in the server logs.
    System.out.println("Name: " + nameValue + "\nEmail: " + emailValue + "\nMessage: " + messageValue);

    // Reload the page.
    response.sendRedirect("/");
  }
}