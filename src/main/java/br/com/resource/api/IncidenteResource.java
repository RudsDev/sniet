package br.com.resource.api;

import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;
import br.com.model.api.Incidente;
import br.com.model.api.Individuo;
import br.com.service.api.IncidenteService;
import br.com.test.api.IncidenteWrapper;
import br.com.util.api.Util;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ResponseHeader;


@Api
@Path("/incidentes")
public class IncidenteResource {
	
	private IncidenteService service;

	public IncidenteResource() {
		this.service = new IncidenteService();
	}
	
	
	@ApiOperation(
			value="Salva um incidente no sistema.",
			consumes = MediaType.APPLICATION_JSON
		)
		@ApiResponses(
			@ApiResponse(
				code=201,
				message="incidente salvo no sistema.",
				response = String.class,
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
					value="incidenteWrapper",
					name="incidenteWrapperJson",
					required=true
				)
				String incidenteWrapperJson,
				@Context UriInfo uriInfo){
			
			UriBuilder builder = uriInfo.getAbsolutePathBuilder();		

			IncidenteWrapper incidenteWrapper = (IncidenteWrapper) 
					Util.jsonToObject(incidenteWrapperJson, IncidenteWrapper.class);
			
			Incidente incidente = incidenteWrapper.getIncidente();
			Individuo individuo = incidenteWrapper.getIndividuo();
			
			Individuo individuoSaved = service.save(incidente,individuo);
			Incidente incidenteSaved = individuoSaved.getIncidente();
			
			System.out.println(incidenteSaved.getidIncidente());
			
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
	public Response buscaTodasIncidentes(
			@Context UriInfo uriInfo){
		
		List<Incidente> incidentes = this.service.getAllIncidentes();
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
			response = Incidente.class
		)
	)
	@Path("/full")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscaTodasIncidentesComIndividuos(
			@Context UriInfo uriInfo){
		
		List<Individuo> individuos = this.service.getAllIncidentesFull();
		List<String> incidentesJson = new ArrayList<>();
		
		for(int i=0; i<individuos.size();i++){
			incidentesJson.add(Util.objectToJson(individuos.get(i)));
		}

		return Response.ok(incidentesJson.toString(), MediaType.APPLICATION_JSON).build();
	}
	
	
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
	public Response buscaPorId(
			@PathParam(value="id")
			int id,
			@Context UriInfo uriInfo){
		
		Incidente especie = this.service.searchByID(id);
		
		especie.exibir();
		
		String especieJson = Util.objectToJson(especie);

		return Response.ok(especieJson.toString(), MediaType.APPLICATION_JSON).build();
	}
	
	
	@ApiOperation(
			value="Busca uma incidente acontecedido em determinado periodo."
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
	//TODO Melhorar esse path...
	@Path("datainicial/{dataInicial}/datainicial/{dataFinal}")
	@GET
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscaPorPerido(
			@PathParam(value="dataInicial")
			String dataInicial,
			@PathParam(value="dataFinal")
			String dataFinal,
			@Context UriInfo uriInfo){
		
		List<Incidente> incidentes = this.service.searchByPeriodo(dataInicial, dataFinal);
		
		List<String> incidentesJson = new ArrayList<>();
		
		for(int i=0; i<incidentes.size();i++){
			incidentesJson.add(Util.objectToJson(incidentes.get(i)));
		}

		return Response.ok(incidentesJson.toString(), MediaType.APPLICATION_JSON).build();
	}
	
	//TODO Terminar essa endpoind para receber local
	@ApiOperation(
			value="Busca um local de incidente (teste).",
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
	@Path("local/{nomeLocal}")
	@GET
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public void local(
			@PathParam(value="nomeLocal")
			String nomeLocal,
			@Context UriInfo uriInfo){
		
		//Incidente incidente = this.service.searchByID(0);
		
		//incidente.exibir();
		
		System.out.println("----------------------------------");
		
		System.out.println(nomeLocal);
		
		//String incidenteJson = Util.objectToJson(incidente);

		//return Response.ok(incidenteJson.toString(), MediaType.APPLICATION_JSON).build();
	}
	
}