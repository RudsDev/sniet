package br.com.resource.api;

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
import br.com.model.api.Especie;
import br.com.service.api.EspecieService;
import br.com.util.api.Util;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api
@Path("/especies")
public class EspecieResource {
	
	private EspecieService service;

	public EspecieResource() {
		this.service = new EspecieService();
	}
	
	
	@ApiOperation(
			value="Retorna todas as espécies existentes na base de dados.",
			produces = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="Retornada listagem de espécies.",
			response = Especie.class
		)
	)
	@Path("/")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscaTodasEspecies(
			@Context UriInfo uriInfo){
		
		List<Especie> especies = this.service.getAllEspecies();
		List<String> especiesJson = new ArrayList<>();
		
		for(int i=0; i<especies.size();i++){
			especiesJson.add(Util.objectToJson(especies.get(i)));
		}

		return Response.ok(especiesJson.toString(), MediaType.APPLICATION_JSON).build();
	}
	
	
	@ApiOperation(
			value="Busca uma espécie a partir de seu ID.",
			consumes = MediaType.TEXT_PLAIN,
			produces = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="Especie localizada.",
			response = Especie.class
		)
	)
	@Path("{id}")
	@GET
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscaPorId(
			@PathParam(value="id")
			int id,
			@Context UriInfo uriInfo){
		
		Especie especie = this.service.searchByID(id);
		
		especie.exibir();
		
		String especieJson = Util.objectToJson(especie);

		return Response.ok(especieJson.toString(), MediaType.APPLICATION_JSON).build();
	}
	
	
	@ApiOperation(
			value="Busca uma espécie a partir de seu nome cientifico.",
			consumes = MediaType.TEXT_PLAIN,
			produces = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="Especie localizada.",
			response = Especie.class
		)
	)
	@Path("cientifico/{nomeCientifico}")
	@GET
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscaPorNomeCientifico(
			@PathParam(value="nomeCientifico")
			String nomeCientifico,
			@Context UriInfo uriInfo){
		
		Especie especie = this.service.searchByNomeCientifico(nomeCientifico);
		String especieJson = Util.objectToJson(especie);

		return Response.ok(especieJson.toString(), MediaType.APPLICATION_JSON).build();
	}
	
}