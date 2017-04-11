package br.com.test.api;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.com.model.api.Usuario;
import br.com.persist.api.JPAUtil;

public class Test_UserDao {

	private EntityManager em;

	public Test_UserDao(){
		em = new JPAUtil().getEntityManager();
	}
	
	public Usuario gravar(Usuario usuario){
		em.getTransaction().begin();
		Usuario userManaged = em.merge(usuario);
		em.getTransaction().commit();
		em.close();
		return userManaged;
	}
	
	
	public Usuario atualizar(Usuario usuario){
		em.getTransaction().begin();
		Usuario user = em.merge(usuario);
		em.getTransaction().commit();
		em.close();
		
		return user;
	}
	
	
	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByLogin(String login){
		
		Query query = em.createQuery("select u from Usuario u where u.login = :login",
				Usuario.class);
		
		query.setParameter("login", login);
		
		return query.getResultList();
	}
	
}