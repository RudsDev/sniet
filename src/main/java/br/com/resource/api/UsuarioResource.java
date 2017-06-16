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

import br.com.model.api.Incidente;
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
		
		System.out.println(usuarioJson);
		
		UriBuilder builder = uriInfo.getAbsolutePathBuilder();		
	
		Usuario userSaved = userService.save((Usuario) 
				Util.jsonToObject(usuarioJson, Usuario.class));
		
		//Coloca o ID do user rec�m salvo na resposta para o client (Location)
		builder.path(Integer.toString(userSaved.getIdUsuario()));
		
	    return Response.created(builder.build()).status(201)
	            .build();
	}

	
	
	@ApiOperation(
			value="Apaga um usu�rio do sistema a partir de seu id.",
			consumes = MediaType.TEXT_PLAIN
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="Usu�rio apagado do sistema.",
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
			value="Apaga um usu�rio do sistema.",
			consumes = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="Usu�rio apagado do sistema.",
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
			message="Dados do usu�rio atualizados.",
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
		
		//Coloca o ID do user rec�m salvo na resposta para o client (Location)
		builder.path(Integer.toString(userSaved.getIdUsuario()));
		
		 
	    return Response.created(builder.build()).status(201)
	            .build();
	}
	

	@ApiOperation(
			value="Retorna todos usuarios cadastrados.",
			produces = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="Retornada listagem de usuarios cadastrados.",
			response = Incidente.class
		)
	)
	@Path("/")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscaTodosUsuarios(
			@Context UriInfo uriInfo){
		
		List<Usuario> usuarios = this.userService.getAllUsers();
		List<String> usuariosJson = new ArrayList<>();
		
		for(int i=0; i<usuarios.size();i++){
			usuariosJson.add(Util.objectToJson(usuarios.get(i)));
		}
		return Response.ok(usuariosJson.toString(), MediaType.APPLICATION_JSON).build();
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
	
	
	
	@ApiOperation(
			value="Retorna a quantidade de usuarios com o status informado.",
			consumes = MediaType.TEXT_PLAIN,
			produces = MediaType.APPLICATION_JSON
	)
	@ApiResponses(
		@ApiResponse(
			code=200,
			message="status localizado.",
			response = Usuario.class
		)
	)
	@Path("/status/{status}")
	@GET
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Response qtdStatus(
			@PathParam(value="status")
			String status,
			@Context UriInfo uriInfo){
		
		Integer quantidade = this.userService.quantidadeStatus(status);
		
		System.out.println("Quantidade: " + quantidade);

		return Response.ok(quantidade.toString(), MediaType.APPLICATION_JSON).build();
	}
	

	@ApiOperation(
			value="Logar no sistema.",
			consumes = MediaType.APPLICATION_JSON,
			produces = MediaType.APPLICATION_JSON
		)
		@ApiResponses({
			@ApiResponse(
				code=200,
				message="Logado com sucesso!.",
				response = Usuario.class,
				responseHeaders=
					@ResponseHeader(
						name="Location",
						description="uri usuario logado.",
						response=Usuario.class
					)
			),
			@ApiResponse(
					code=401,
					message="Acesso inv�lido!.",
					response = String.class
				)
			
		})
		@Path("/login")
		@POST
		@Consumes(MediaType.APPLICATION_JSON)
		public Response login(
				@ApiParam(
					value="JSON contendo login e senha.",
					name="login",
					required=true
				)
				String loginJson,
				@Context UriInfo uriInfo){

			UriBuilder builder = uriInfo.getAbsolutePathBuilder();		
		
			Usuario userLogado = userService.logar(loginJson);
			
			System.out.println(userLogado);
			
			if(userLogado!=null){
				//Coloca o ID do user rec�m salvo na resposta para o client (Location)
				builder.path(Integer.toString(userLogado.getIdUsuario()));
				return Response.created(builder.build()).status(200)
			            .build();	
			}
			
			
		    return Response.status(401)
		            .build();
		}
}