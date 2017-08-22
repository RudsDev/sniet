package br.com.api.resource;

import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;
import br.com.api.model.Especie;
import br.com.api.service.EspecieService;
import br.com.api.util.Util;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ResponseHeader;

@Api
@Path("/especies")
public class EspecieResource {
	
	private EspecieService especieService;

	public EspecieResource() {
		this.especieService = new EspecieService();
	}
	
	@ApiOperation(
			value="Salva um especie no sistema.",
			consumes = MediaType.APPLICATION_JSON,
			produces = MediaType.APPLICATION_JSON
		)
		@ApiResponses(
			@ApiResponse(
				code=201,
				message="especie salva no sistema.",
				response = Especie.class,
				responseHeaders=
					@ResponseHeader(
						name="Location",
						description="uri especie criada.",
						response=String.class
					)
			)
		)
		@Path("/")
		@POST
		@Consumes(MediaType.APPLICATION_JSON)
		public Response save(
				@ApiParam(
					value="especie",
					name="especieJson",
					required=true
				)
				String especieJson,
				@Context UriInfo uriInfo, @Context HttpHeaders headers){
			
			/*Integer acessLevel = 1;
			
			String token = headers.getHeaderString("Authorization");
			
			try {
				//MyTokenGen.verifyTokenAcess(token, acessLevel);*/
				
				UriBuilder builder = uriInfo.getAbsolutePathBuilder();		

				Especie especieSaved = this.especieService.save((Especie) 
						Util.jsonToObject(especieJson, Especie.class));
				
				//Coloca o ID do user recém salvo na resposta para o client (Location)
				builder.path(Integer.toString(especieSaved.getIdEspecie()));
				
			    return Response.created(builder.build()).status(201)
			            .build();
			/*}
			catch (UnauthorizedAcessException e) {
				e.printStackTrace();
			    return Response.status(401).build();
			}*/
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
		
		List<Especie> especies = this.especieService.getAllEspecies();
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
		
		Especie especie = this.especieService.searchByID(id);
		
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
		
		Especie especie = this.especieService.searchByNomeCientifico(nomeCientifico);
		String especieJson = Util.objectToJson(especie);

		return Response.ok(especieJson.toString(), MediaType.APPLICATION_JSON).build();
	}
	
}