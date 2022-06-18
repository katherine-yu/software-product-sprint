package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;
import com.google.cloud.datastore.IncompleteKey;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;

@WebServlet("/form-handler")
public class FormHandlerServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    // Get the values entered in the form.
    String nameValue = Jsoup.clean(request.getParameter("name-input"), Safelist.basic());
    String emailValue = Jsoup.clean(request.getParameter("email-input"), Safelist.basic());
    String messageValue = Jsoup.clean(request.getParameter("message-input"), Safelist.basic());
    long timestamp = System.currentTimeMillis();

    // Put message into datastore.
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    KeyFactory keyFactory = datastore.newKeyFactory().setKind("ContactMessage");
    FullEntity<IncompleteKey> contactMessageEntity =
        Entity.newBuilder(keyFactory.newKey())
            .set("name", nameValue)
            .set("email", emailValue)
            .set("message", messageValue)
            .set("timestamp", timestamp)
            .build();
    datastore.put(contactMessageEntity);

    // Reload the page.
    response.sendRedirect("/#contact");
  }
}
