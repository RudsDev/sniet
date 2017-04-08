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
	
	public void save(Usuario usuario){
		this.usuarioDao.gravar(usuario);
	}
	
	public void update (Usuario usuario){
		this.usuarioDao.atualizar(usuario);
	}
	
}