package br.com.resource.api;

import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;
import br.com.model.api.Usuario;
import br.com.service.api.UsuarioService;
import br.com.util.api.Util;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ResponseHeader;

@Api
@Path("/usuarios")
public class UsuarioResource {
	
	private UsuarioService userService;
	
	public UsuarioResource() {
		this.userService = new UsuarioService();
	}
	
	
	
	@ApiOperation(
		value="Salva um usuario no sistema.",
		consumes = MediaType.APPLICATION_JSON,
		produces = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=201,
			message="usuario salvo no sistema.",
			response = Usuario.class,
			responseHeaders=
				@ResponseHeader(
					name="Location",
					description="uri usuario criado.",
					response=String.class
				)
		)
	)
	@Path("/")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response save(
			@ApiParam(
				value="Usuario",
				name="usuarioJson",
				required=true
			)
			String usuarioJson,
			@Context UriInfo uriInfo){
		
		UriBuilder builder = uriInfo.getAbsolutePathBuilder();		
	
		Usuario userSaved = userService.save((Usuario) Util.jsonToObject(usuarioJson, Usuario.class));
		
		//Coloca o ID do user recém salvo na resposta para o client (Location)
		builder.path(Integer.toString(userSaved.getIdUsuario()));
		
	    return Response.created(builder.build()).status(201)
	            .build();
	}

	
	
	@ApiOperation(
			value="Retorna o mesmo usuario que foi submetido."
					+ " Converte de JSON para um objeto Usuario"
					+ " e de pois para JSON novamente.",
			consumes = MediaType.APPLICATION_JSON,
			produces = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="usuario retornado.",
			response = Usuario.class
		)
	)
	@Path("/retornaMesmoUsuario")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String retornaMesmoUsuario(	
			@ApiParam(
				value="Usuario",
				name="usuarioJson",
				required=true
			)
			String usuarioJson){
		
		Usuario usuario = (Usuario) Util.jsonToObject(usuarioJson, Usuario.class);

	    return Util.objectToJson(usuario);
	    
	}

	
	
	@ApiOperation(
			value="Apaga um usuário do sistema a partir de seu id.",
			consumes = MediaType.TEXT_PLAIN
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="Usuário apagado do sistema.",
			response = Usuario.class
		)
	)
	@Path("{id}")
	@DELETE
	@Consumes(MediaType.TEXT_PLAIN)
	public Response deleteById(
			@PathParam(value="id")
			int id,
			@Context UriInfo uriInfo){

		this.userService.deleteById(id);
		
	    return Response.ok().build();
	}
	
	
	@ApiOperation(
			value="Apaga um usuário do sistema.",
			consumes = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="Usuário apagado do sistema.",
			response = Usuario.class
		)
	)
	@Path("/")
	@DELETE
	@Consumes(MediaType.APPLICATION_JSON)
	public Response delete(
			@ApiParam(
					value="Usuario",
					name="usuarioJson",
					required=true
			)String usuarioJson,
			@Context UriInfo uriInfo){
		userService.deleteByObj((Usuario) Util.jsonToObject(usuarioJson, Usuario.class));	
		
	    return Response.ok().build();
	}
	
	
	
	@ApiOperation(
			value="Atualiza dados de um usuario no sistema.",
			consumes = MediaType.APPLICATION_JSON,
			produces = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=201,
			message="Dados do usuário atualizados.",
			response = Usuario.class,
			responseHeaders=
				@ResponseHeader(
					name="Location",
					description="uri usuario criado.",
					response=String.class
				)
		)
	)
	@Path("/")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public Response update(
			@ApiParam(
					value="Usuario",
					name="usuarioJson",
					required=true
			)
			String usuarioJson,
			@Context UriInfo uriInfo){
		
		UriBuilder builder = uriInfo.getAbsolutePathBuilder();

		Usuario userSaved = userService.update((Usuario)Util.jsonToObject(usuarioJson,Usuario.class));
		
		//Coloca o ID do user recém salvo na resposta para o client (Location)
		builder.path(Integer.toString(userSaved.getIdUsuario()));
		
		 
	    return Response.created(builder.build()).status(201)
	            .build();
	}
	
	
	@ApiOperation(
			value="Busca um usuario pelo seu login.",
			consumes = MediaType.TEXT_PLAIN,
			produces = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="Usuario localizado.",
			response = Usuario.class
		)
	)
	@Path("{login}")
	@GET
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscaPorLogin(
			@PathParam(value="login")
			String login,
			@Context UriInfo uriInfo){
		
		List<Usuario> users = this.userService.searchByLogin(login);
		List<String> usersJson = new ArrayList<>();
		
		for(int i=0; i<users.size();i++){
			usersJson.add(Util.objectToJson(users.get(i)));
		}

		return Response.ok(usersJson.toString(), MediaType.APPLICATION_JSON).build();
	}
}