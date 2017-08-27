package br.com.api.resource;

import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import br.com.api.service.GenericService;
import br.com.api.util.Util;

public interface GenericResource {
	
	public default Response getAll(GenericService service, @Context UriInfo uriInfo){
		
		List<?> listObjs = service.getAll();
		List<String> listJson = new ArrayList<>();
		
		System.out.println(listObjs);
		
		for(int i=0; i<listObjs.size();i++){
			listJson.add(Util.objectToJson(listObjs.get(i)));
		}

		return Response.ok(listJson.toString(), MediaType.APPLICATION_JSON).build();
	}
	
	public Response getAll(@Context UriInfo uriInfo);
	public Response getAllByType(@PathParam(value="type")String type, @Context UriInfo uriInfo);
		
}