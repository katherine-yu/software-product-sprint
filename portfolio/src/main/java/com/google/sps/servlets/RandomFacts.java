package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;

/** Handles requests sent to the /hello URL. Try running a server and navigating to /hello! */
@WebServlet("/random-facts")
public class RandomFacts extends HttpServlet {

  private String[] facts = {
      "I'm left-handed.",
      "My right eye has 20/20 vision, while my left eye has 20/100 vision.",
      "My favorite flavor of ice cream is mint chocolate chip.",
      "I like to listen to the Beatles.",
      "My favorite color is purple.",
      "I want to visit Antarctica someday.",
      "I like to watch let's play videos of horror games."};

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Gson gson = new Gson();
    String json = gson.toJson(facts);
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }
}
