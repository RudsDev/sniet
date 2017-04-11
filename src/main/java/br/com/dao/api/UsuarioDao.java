package br.com.dao.api;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import br.com.model.api.Usuario;
import br.com.persist.api.JPAUtil;

public class UsuarioDao {

	
	private EntityManager em = new JPAUtil().getEntityManager();
	
	public void gravar(Usuario usuario){
		em.getTransaction().begin();
		em.persist(usuario);
		em.getTransaction().commit();
		em.close();
	}
	
	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByStatus(String status){
		
		Query query = em.createQuery("select u from Usuario u where u.status = :status",
				Usuario.class);
		
		query.setParameter("status", status);
		
		return query.getResultList();
	}
	
	
	public Integer qtdUsuariosStatus(String status){
		
		Query query  = em.createQuery("select COUNT(u.status) from Usuario u where u.status = :status");
		
		query.setParameter("status", status);
		
		return (Integer) query.getSingleResult();
	}
	
	public void atualizar(Usuario usuario){
		em.getTransaction().begin();
		em.merge(usuario);
		em.getTransaction().commit();
		em.close();
	}
	
}
