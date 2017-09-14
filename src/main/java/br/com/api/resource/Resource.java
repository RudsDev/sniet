package br.com.api.resource;

import javax.el.MethodNotFoundException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import br.com.api.service.Service;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api
@Path("/resource")
public class Resource implements GenericResource{
	
	public Resource(){}
	
	@Override
	@ApiOperation(
			value="Retorna todos os elementos do Type informado presente na base de dados.",
			produces = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="Retornada listagem de elementos.",
			response = Object.class
		)
	)
	@Path("{type}")
	@GET
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllByType(@PathParam(value="type")String type, @Context UriInfo uriInfo) {
		
		Response response  = this.getAll(new Service(type), uriInfo);
		
		return response;
	}
	
	@Override
	@ApiOperation(
			value="Retorna todos os elementos do Type informado presente na base de dados. "
					+ "Com possibilidade de paginação",
			produces = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="Retornada listagem de elementos com possibilidade de paginação.",
			response = Object.class
		)
	)
	@Path("/{type}/{maxResults}/{firstResults}")
	@GET
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllByTypePaginate(@PathParam(value="type")String type, @Context UriInfo uriInfo,
			@PathParam("maxResults") Integer maxResults, @PathParam("firstResults") Integer firstResults) {
		
		Response response  = GenericResource.super.getAllByTypePaginate(type, uriInfo, maxResults, firstResults);
		
		return response;
	}

	@Override
	public Response getAll(UriInfo uriInfo) {
		throw new MethodNotFoundException("Método não implementado!");
	}
	
	
}
