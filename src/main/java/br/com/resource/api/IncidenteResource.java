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

import br.com.model.api.Incidente;
import br.com.service.api.IncidenteService;
import br.com.util.api.Util;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

public class IncidenteResource {
	
	private IncidenteService service;

	public IncidenteResource() {
		this.service = new IncidenteService();
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
	@Path("periodo/{dataInicial+dataFinal}")
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
}