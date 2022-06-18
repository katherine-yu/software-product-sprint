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
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.Map;

@WebServlet("/locations")
public class Locations extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        Query<Entity> query = Query.newEntityQueryBuilder().setKind("Location").build();
        QueryResults<Entity> results = datastore.run(query);

        ArrayList<Map<String, Object>> locations = new ArrayList<>();

        while (results.hasNext()) {
            Entity entity = results.next();

            locations.add(Map.of(
                "position", entity.getLatLng("position"),
                "title", entity.getString("title"),
                "description", entity.getString("description")
            ));
        }

        Gson gson = new Gson();
        response.setContentType("application/json;");
        response.getWriter().println(gson.toJson(locations));
    }
}
