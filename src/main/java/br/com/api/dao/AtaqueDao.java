package br.com.api.dao;

import javax.persistence.EntityManager;

import br.com.api.model.Ataque;
import br.com.api.persist.JPAUtil;

public class AtaqueDao {
	
	private EntityManager em = JPAUtil.getEntityManager();

	public void gravar(Ataque ataque){
		em.getTransaction().begin();
		em.persist(ataque);
		em.getTransaction().commit();
		em.close();
	}

}
