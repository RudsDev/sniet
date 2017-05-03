package br.com.dao.api;

import javax.persistence.EntityManager;

import br.com.model.api.Individuo;
import br.com.persist.api.JPAUtil;

public class IndividuoDao {

	
	private EntityManager em = new JPAUtil().getEntityManager();
	
	public void gravar(Individuo individuo){
		em.getTransaction().begin();
		em.persist(individuo);
		em.getTransaction().commit();
		em.close();
	}
	
	
}