package br.com.api.service;

import java.util.List;
import javax.persistence.NoResultException;
import com.google.gson.JsonObject;

import br.com.api.dao.UsuarioDao;
import br.com.api.model.Usuario;
import br.com.api.persist.JPAUtil;
import br.com.api.util.Util;

public class UsuarioService {
	
	private UsuarioDao dao;
	
	public UsuarioService(){
		this.dao = new UsuarioDao();
	}
	
	public Usuario save(Usuario usuario){
		
		Usuario usuarioSave = null;
		
		try {
			JPAUtil.beginTransaction();
			usuarioSave = this.dao.gravar(usuario);
			JPAUtil.commitTransaction();
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();			
		}
		finally {
			JPAUtil.closeEntityManager();
		}
		
		return usuarioSave;
	}
	
	
	public Usuario update (Usuario usuario){
		
		Usuario usuarioUpdate = null;
		
		try {
			JPAUtil.beginTransaction();
			usuarioUpdate = this.dao.atualizar(usuario);
			JPAUtil.commitTransaction();
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();
		}
		finally {
			JPAUtil.closeEntityManager();
		}
		
		return usuarioUpdate;
	}
	
	
	public void delete (Usuario usuario){
	
		try {
			JPAUtil.beginTransaction();
			this.dao.deletar(usuario);
			JPAUtil.commitTransaction();
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();			
		}
		finally {
			JPAUtil.closeEntityManager();
		}
	}
	
	
	public Integer quantidadeStatus(String status){
		
		Integer quant = null;
		
		try {
			JPAUtil.beginTransaction();
			quant = this.dao.getQuantByStatus(status);
			JPAUtil.commitTransaction();
			return quant;
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();			
		}
		finally {
			JPAUtil.closeEntityManager();
		}
		
		return quant; 
	}

	
	public List<Usuario> getAllUsers() {
		
		List<Usuario> usuarios = null;
		
		try {
			JPAUtil.beginTransaction();
			usuarios = this.dao.buscarTodosUsuario();
			JPAUtil.commitTransaction();
			return usuarios;
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();
		}
		finally {
			JPAUtil.closeEntityManager();
		}
		
		return usuarios;
	}
	
	
	public Usuario logar(String loginJson){
		
		Usuario usuario = null;
		
		try {
			JPAUtil.beginTransaction();
			usuario = this.dao.logar(this.convertToUsuarioLoginObject(loginJson));
			JPAUtil.commitTransaction();
		}
		catch(NoResultException e) {
			System.out.println("Login ou senha inválidos.");
		}
		catch(Exception e) {
			System.out.println("Erro na infraestrutura.");
			JPAUtil.rollbackTransaction();
		}
		finally {
			JPAUtil.getEntityManager().detach(usuario);
			JPAUtil.closeEntityManager();
		}
		
		return usuario;
	}
	
	
	private Usuario convertToUsuarioLoginObject(String loginJson){

		JsonObject jsonObj = Util.getParser().parse(loginJson).getAsJsonObject();

		String login = jsonObj.get("login").getAsString();
		String password = jsonObj.get("password").getAsString();

		return new Usuario(login, password);
	}
	
}