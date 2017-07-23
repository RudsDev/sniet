package br.com.api.dao;

import javax.persistence.EntityManager;

import br.com.api.model.Fonte;
import br.com.api.persist.JPAUtil;

public class FonteDao {
	
	private EntityManager em = JPAUtil.getEntityManager();

	public void gravar(Fonte fonte){
		em.getTransaction().begin();
		em.persist(fonte);
		em.getTransaction().commit();
		em.close();
	}
	
}
