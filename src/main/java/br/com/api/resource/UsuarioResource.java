package br.com.api.resource;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
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

import br.com.api.exceptions.UnauthorizedAcessException;
import br.com.api.model.Incidente;
import br.com.api.model.Usuario;
import br.com.api.secure.MyTokenGen;
import br.com.api.service.UsuarioService;
import br.com.api.util.Util;
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
			@Context UriInfo uriInfo, @Context HttpHeaders headers){
		
		Integer acessLevel = 1;
		
		String token = headers.getHeaderString("Authorization");
		
		try {
			MyTokenGen.verifyTokenAcess(token, acessLevel);
			
			UriBuilder builder = uriInfo.getAbsolutePathBuilder();		
			
			Usuario userSaved = userService.save((Usuario) 
					Util.jsonToObject(usuarioJson, Usuario.class));
			
			//Coloca o ID do user recém salvo na resposta para o client (Location)
			builder.path(Integer.toString(userSaved.getIdUsuario()));
			
		    return Response.created(builder.build()).status(201)
		            .build();
		}
		catch (UnauthorizedAcessException e) {
			e.printStackTrace();
		    return Response.status(401).build();
		}
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
			@Context UriInfo uriInfo, @Context HttpHeaders headers){
		
		Integer acessLevel = 1;
		
		String token = headers.getHeaderString("Authorization");
		
		try {
			MyTokenGen.verifyTokenAcess(token, acessLevel);
			userService.delete((Usuario) Util.jsonToObject(usuarioJson, Usuario.class));	
		    return Response.ok().build();
		}
		catch (UnauthorizedAcessException e) {
			e.printStackTrace();
			return Response.status(401).build();
		} 
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
			@Context UriInfo uriInfo, @Context HttpHeaders headers){
		
		Integer acessLevel = 1;
		
		String token = headers.getHeaderString("Authorization");
		
		try {
			MyTokenGen.verifyTokenAcess(token, acessLevel);
			UriBuilder builder = uriInfo.getAbsolutePathBuilder();

			Usuario userSaved = userService.update((Usuario)Util.jsonToObject(usuarioJson,Usuario.class));
			
			//Coloca o ID do user recém salvo na resposta para o client (Location)
			builder.path(Integer.toString(userSaved.getIdUsuario()));
			
			 
		    return Response.created(builder.build()).status(201)
		            .build();
		}
		catch (UnauthorizedAcessException e) {
			e.printStackTrace();
			return Response.status(401).build();
		}
		

	    
	    
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
			@Context UriInfo uriInfo, @Context  HttpHeaders headers){
		
		Integer acessLevel = 1;
		
		String token = headers.getHeaderString("Authorization");
		
		try {
			MyTokenGen.verifyTokenAcess(token, acessLevel);
			List<Usuario> usuarios = this.userService.getAllUsers();
			List<String> usuariosJson = new ArrayList<>();
			
			for(Usuario user : usuarios)
				usuariosJson.add(Util.objectToJson(user));
			
			return Response.ok(usuariosJson.toString(), MediaType.APPLICATION_JSON).build();
		} 
		catch (UnauthorizedAcessException e) {
			e.printStackTrace();
		    return Response.status(401)
		            .build();
		}
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
			@Context UriInfo uriInfo, @Context HttpHeaders headers){
		
		Integer acessLevel = 1;
		
		String token = headers.getHeaderString("Authorization");
		
		try {
			MyTokenGen.verifyTokenAcess(token, acessLevel);
			Integer quantidade = this.userService.quantidadeStatus(status);
			
			System.out.println("Quantidade: " + quantidade);

			return Response.ok(quantidade.toString(), MediaType.APPLICATION_JSON).build();
		} catch (UnauthorizedAcessException e) {
			e.printStackTrace();
			return Response.status(401).build();
		}
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
					message="Acesso inválido!.",
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
				@Context UriInfo uriInfo,
				@Context HttpServletResponse servletResponse){

			Usuario userLogado = userService.logar(loginJson);

			if(userLogado!=null){
				
				String token  = MyTokenGen.createToken(userLogado);
				
				System.out.println(Util.objectToJson(userLogado));
						
				return Response.ok(Util.objectToJson(userLogado).toString(), MediaType.APPLICATION_JSON)
							   .header("Authorization", token).status(200).build();
			}
			
		    return Response.status(401)
		            .build();
		}
}