package br.com.api.resource;

import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.lang3.text.WordUtils;

import br.com.api.reflect.GenerateClass;
import br.com.api.service.GenericService;
import br.com.api.util.Util;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api
@Path("/resource")
public class Resource {
	
	private static final GenericService service = new GenericService();
	
	public Resource(){}
	
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
		
		List<?> listObjs = service.getAll(GenerateClass.generateModelClass(type));
		List<String> listJson = new ArrayList<>();
		
		System.out.println(listObjs);
		
		for(int i=0; i<listObjs.size();i++){
			listJson.add(Util.objectToJson(listObjs.get(i)));
		}
		return Response.ok(listJson.toString(), MediaType.APPLICATION_JSON).build();
	}
	
	
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
		
		List<?> listObjs = service.getAllPaginate(GenerateClass.generateModelClass(WordUtils.capitalize(type)), maxResults, firstResults);
		List<String> listJson = new ArrayList<>();
		
		for(int i=0; i<listObjs.size();i++){
			listJson.add(Util.objectToJson(listObjs.get(i)));
		}
		
		return Response.ok(listJson.toString(), MediaType.APPLICATION_JSON).build();
	}
	
	
	@ApiOperation(
			value="Retorna a quantidade de registros existentes do elemento solicitado.",
			produces = MediaType.TEXT_PLAIN
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="Retornada a quantidade de registros existentes do elemento solicitado.",
			response = Object.class
		)
	)
	@Path("/qtd/{type}")
	@GET
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.TEXT_PLAIN)
	public Response qtdElements(@PathParam(value="type")String type, @Context UriInfo uriInfo) {
		Integer qtd = service.count(GenerateClass.generateModelClass(WordUtils.capitalize(type)));
		return Response.ok(qtd.toString(), MediaType.TEXT_PLAIN).build();		
	}

}