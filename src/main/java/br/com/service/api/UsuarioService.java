package br.com.service.api;

import java.util.List;
import javax.persistence.NoResultException;
import com.google.gson.JsonObject;
import br.com.dao.api.UsuarioDao;
import br.com.model.api.Usuario;
import br.com.util.api.Util;

public class UsuarioService {
	
	
	private UsuarioDao dao;
	
	
	public UsuarioService(){
		this.dao = new UsuarioDao();
	}
	
	public Usuario save(Usuario usuario){
		//Tratar exceptions
		return this.dao.gravar(usuario);
	}
	
	public Usuario update (Usuario usuario){
		return this.dao.atualizar(usuario);
	}
	
	public void deleteById (Integer id){
		this.dao.apagarUsuarioPorId(id);
	}
	
	public void deleteByObj (Usuario usuario){
		this.dao.apagarUsuarioPorObjeto(usuario);
	}
	
	public  List<Usuario> searchByLogin(String login){
		return this.dao.getUsuarioByLogin(login);
	}
	
	public Integer quantidadeStatus(String status){
		return (Integer) this.dao.getQuantByStatus(status);
	}

	public List<Usuario> getAllUsers() {
		return this.dao.buscarTodosUsuario();
	}
	
	
	@SuppressWarnings("finally")
	public Usuario logar(String loginJson){
		
		Usuario usuario = null;
		
		try {
			usuario = this.dao.logar(this.convertToUsuarioLoginObject(loginJson));
		} catch (NoResultException e) {
			System.out.println("Login ou senha inválidos.");
		}
		finally {
			return usuario;
		}
	}
	
	
	private Usuario convertToUsuarioLoginObject(String loginJson){

		JsonObject jsonObj = Util.getParser().parse(loginJson).getAsJsonObject();

		String login = jsonObj.get("login").getAsString();
		String password = jsonObj.get("password").getAsString();

		return new Usuario(login, password);
	}
	
}