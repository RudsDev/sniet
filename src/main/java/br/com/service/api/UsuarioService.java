package br.com.service.api;

import br.com.dao.api.Test_UserDao;
import br.com.model.api.Usuario;

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
	
}