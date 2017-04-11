package br.com.service.api;

import java.util.List;

import br.com.model.api.Usuario;
import br.com.test.api.Test_UserDao;

public class UsuarioService {
	
	//TODO Aplicar singleton aos daos
	//TODO Substituir pelos DAOS do Alexandre
	private Test_UserDao usuarioDao;
	
	
	public UsuarioService(){
		this.usuarioDao = new Test_UserDao();
	}
	
	public Usuario save(Usuario usuario){
		//Tratar exceptions
		return this.usuarioDao.gravar(usuario);
	}
	
	public Usuario update (Usuario usuario){
		return this.usuarioDao.atualizar(usuario);
	}
	
	public  List<Usuario> searchByLogin(String login){
		return this.usuarioDao.getUsuarioByLogin(login);
	}
	
}