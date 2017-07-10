package br.com.resource.api;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;

import br.com.exceptions.api.UnauthorizedAcessException;
import br.com.model.api.Incidente;
import br.com.model.api.IncidenteWrapper;
import br.com.model.api.Individuo;
import br.com.model.api.Local;
import br.com.service.api.IncidenteService;
import br.com.service.api.IndividuoService;
import br.com.util.api.MyTokenGen;
import br.com.util.api.Util;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ResponseHeader;


@Api
@Path("/incidents")
public class IncidenteResource {
	
	
	private IncidenteService incidenteService;
	private IndividuoService individuoService;

	public IncidenteResource() {
		this.incidenteService = new IncidenteService();
		this.individuoService = new IndividuoService();
	}
	
	@ApiOperation(
			value="Salva um incidente no sistema.",
			consumes = MediaType.APPLICATION_JSON
		)
		@ApiResponses(
			@ApiResponse(
				code=201,
				message="incidente salvo no sistema.",
				response = IncidenteWrapper.class,
				responseHeaders=
					@ResponseHeader(
						name="Location",
						description="uri incidente criado.",
						response=String.class
					)
			)
		)
		@Path("/")
		@POST
		@Consumes(MediaType.APPLICATION_JSON)
		public Response save(
				@ApiParam(
					value="incidentWrapper",
					name="incidentWrapperJson",
					required=true
				)
				String incidenteWrapperJson,
				@Context UriInfo uriInfo){
			
			UriBuilder builder = uriInfo.getAbsolutePathBuilder();	

			
			Incidente incidente = this.incidenteService.convertToIncidenteObject(incidenteWrapperJson);
			Individuo individuo = this.individuoService.convertToIndividuoObject(incidenteWrapperJson);
			
			Individuo individuoSaved = incidenteService.save(incidente,individuo);
			Incidente incidenteSaved = individuoSaved.getIncidente();
			
			incidenteSaved.exibir();
			
			//Coloca o ID do user recém salvo na resposta para o client (Location)
			builder.path(Integer.toString(incidenteSaved.getidIncidente()));
			
		    return Response.status(201).header("Location", builder.build()).build();

		} 
	
	
	@ApiOperation(
			value="Retorna todos incidentes existentes na base de dados.",
			produces = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="Retornada listagem de incidentes.",
			response = Incidente.class
		)
	)
	@Path("/")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response allIncidents(
			@Context UriInfo uriInfo){
		
		List<Incidente> incidentes = this.incidenteService.getAllIncidentes();
		List<String> incidentesJson = new ArrayList<>();
		
		for(int i=0; i<incidentes.size();i++){
			incidentesJson.add(Util.objectToJson(incidentes.get(i)));
		}

		return Response.ok(incidentesJson.toString(), MediaType.APPLICATION_JSON).build();
	}
	
	
	@ApiOperation(
			value="Retorna todos incidentes (com individuos) existentes na base de dados.",
			produces = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="Retornada listagem de incidentes com individuos.",
			response = Individuo.class
		)
	)
	@Path("/all")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response allIncidentsFull(
			@Context UriInfo uriInfo){
		
		List<Individuo> individuos = this.incidenteService.getAllIncidentesFull();
		List<String> incidentesJson = new ArrayList<>();
		
		for(int i=0; i<individuos.size();i++){
			incidentesJson.add(Util.objectToJson(individuos.get(i)));
		}

		return Response.ok(incidentesJson.toString(), MediaType.APPLICATION_JSON).build();
	}
	
	//TODO	Criar resource que retorne apenas os incidentes com links
	//para individuos. Seguindo o HATEOAS.
	
	@ApiOperation(
			value="Busca uma incidente a partir de seu ID.",
			consumes = MediaType.TEXT_PLAIN,
			produces = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="Incidente localizado.",
			response = Incidente.class
		)
	)
	@Path("{id}")
	@GET
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Response searchById(
			@PathParam(value="id")
			int id,
			@Context UriInfo uriInfo){
		
		Incidente especie = this.incidenteService.searchByID(id);
		
		especie.exibir();
		
		String especieJson = Util.objectToJson(especie);

		return Response.ok(especieJson.toString(), MediaType.APPLICATION_JSON).build();
	}
	
	
	@ApiOperation(
			value="Busca uma incidente que ocorreu em determinado periodo."
				 + "O formato das datas deverá seguir o padrão MM/DD/YYYY.",
			consumes = MediaType.TEXT_PLAIN,
			produces = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="Incidente localizado.",
			response = Incidente.class
		)
	)
	
	@Path("/between/{initialDate}/{lastDate}")
	@GET
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Response searchBetweenDates(
			@PathParam(value="initialDate")
			String initialDate,
			@PathParam(value="lastDate")
			String lastDate,
			@Context UriInfo uriInfo){
		
		List<Incidente> incidentes = this.incidenteService.searchByPeriodo(initialDate, lastDate);
		
		List<String> incidentesJson = new ArrayList<>();
		
		for(int i=0; i<incidentes.size();i++){
			incidentesJson.add(Util.objectToJson(incidentes.get(i)));
		}

		return Response.ok(incidentesJson.toString(), MediaType.APPLICATION_JSON).build();
	}
	
	
	@ApiOperation(
			value="Retorna uma lista de locais de incidente "
					+ "de acordo com o nome de local passado"
					+ "como parâmetro.",
			consumes = MediaType.TEXT_PLAIN,
			produces = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="Incidente localizado.",
			response = Local.class
		)
	)
	@Path("/local/{nameLocal}")
	@GET
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Response localIncident(
			@PathParam(value="nameLocal")
			String nameLocal,
			@Context UriInfo uriInfo){
		
		List<Incidente> listaIncidente = this.incidenteService.searchByLocalNameIncidente(nameLocal);
		List<String> listaIncidenteJson = new ArrayList<>();
		
		for(int i=0; i<listaIncidente.size();i++){
			listaIncidenteJson.add(Util.objectToJson(listaIncidente.get(i)));
		}

		return Response.ok(listaIncidenteJson.toString(), MediaType.APPLICATION_JSON).build();
		
	}
	
	@Path("/")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public Response update(
			@ApiParam(
					value="Incidente",
					name="incidentJson",
					required=true
			)
			String incidentJson,
			@Context UriInfo uriInfo, @Context HttpHeaders headers){
		
		Integer acessLevel = 1;
		
		String token = headers.getHeaderString("Authorization");
		
		try {
			MyTokenGen.verifyTokenAcess(token, acessLevel);
			UriBuilder builder = uriInfo.getAbsolutePathBuilder();

			Incidente incidenteSaved = this.incidenteService.update((Incidente)Util.jsonToObject(incidentJson,Incidente.class));
			
			//Coloca o ID do user recém salvo na resposta para o client (Location)
			builder.path(Integer.toString(incidenteSaved.getidIncidente()));
			
			 
		    return Response.created(builder.build()).status(201)
		            .build();
		}
		catch (UnauthorizedAcessException e) {
			e.printStackTrace();
			return Response.status(401).build();
		} 
	}
	
}