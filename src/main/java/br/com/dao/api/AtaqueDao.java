package br.com.dao.api;

import javax.persistence.EntityManager;

import br.com.model.api.Ataque;
import br.com.persist.api.JPAUtil;

public class AtaqueDao {
	
	private EntityManager em = JPAUtil.getEntityManager();

	public void gravar(Ataque ataque){
		em.getTransaction().begin();
		em.persist(ataque);
		em.getTransaction().commit();
		em.close();
	}

}
