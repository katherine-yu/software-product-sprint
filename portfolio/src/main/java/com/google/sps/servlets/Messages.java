package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StructuredQuery.OrderBy;

@WebServlet("/messages")
public class Messages extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        Query<Entity> query = Query.newEntityQueryBuilder().setKind("ContactMessage").setOrderBy(OrderBy.desc("timestamp")).build();
        QueryResults<Entity> results = datastore.run(query);

        response.setContentType("text/html;");
        response.getWriter().println("<html>");
        response.getWriter().println("<head><title>Messages</title></head>");
        response.getWriter().println("<body>");

        while (results.hasNext()) {
            Entity entity = results.next();
            String name = entity.getString("name");
            String message = entity.getString("message");

            response.getWriter().println("<h2>From: " + name + "</h2>");
            response.getWriter().println("<h3>Message:</h3>");
            response.getWriter().println("<p>"+ message + "</p>");
        }

        response.getWriter().println("</body>");
        response.getWriter().println("</html>");
    }
}
