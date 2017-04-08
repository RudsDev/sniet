package br.com.resource.api;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
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
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ResponseHeader;

@Api
@Path("/usuarios")
public class UsuarioResource {
	
	UsuarioService userService;
	
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
		
		Usuario user = Usuario.jsonToUser(usuarioJson);
		
		
		
		
		//Testando persistência
		userService.save(user);

		
		 //builder.path(Integer.toString(usuarioMerged.getId()));
		 
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
		
		Usuario usuario = Usuario.jsonToUser(usuarioJson);

	    return Usuario.userToJson(usuario);
	    
	}

	@ApiOperation(
			value="Apaga um usuário do sistema.",
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
		public Response delete(
				@PathParam(value="id")
				long id,
				@Context UriInfo uriInfo){
			UriBuilder builder = uriInfo.getAbsolutePathBuilder();
			
			
			
			//Chamada do método e lógica de deleção
			System.out.println("Usuário deletado com sucesso: " + id); 
			
			//TODO Retorna ID do usuário apagado
			//builder.path(Integer.toString(usuario.getId()));

		    return Response.created(builder.build()).status(200)
		            .build();
		}
	
}
