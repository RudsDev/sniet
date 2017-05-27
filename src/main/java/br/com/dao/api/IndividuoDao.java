package br.com.dao.api;

import javax.persistence.EntityManager;
import br.com.model.api.Individuo;
import br.com.persist.api.JPAUtil;

public class IndividuoDao {
	
	private EntityManager em = new JPAUtil().getEntityManager();
	
	public Individuo gravar(Individuo individuo){
		em.getTransaction().begin();
		Individuo individuoManaged = em.merge(individuo);
		em.getTransaction().commit();
		em.close();
		return individuoManaged;
	}
}