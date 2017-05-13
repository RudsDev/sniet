package br.com.service.api;
import java.util.List;
import br.com.dao.api.UsuarioDao;
import br.com.model.api.Usuario;
import br.com.test.api.Test_UserDao;

public class UsuarioService {
	
	
	//private UsuarioDao dao;
	private Test_UserDao dao;
	
	
	public UsuarioService(){
		//this.dao = new UsuarioDao();
		this.dao = new Test_UserDao();
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
	
}