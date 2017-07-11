package br.com.dao.api;

import javax.persistence.EntityManager;

import br.com.model.api.Fonte;
import br.com.persist.api.JPAUtil;

public class FonteDao {
	
	private EntityManager em = JPAUtil.getEntityManager();

	public void gravar(Fonte fonte){
		em.getTransaction().begin();
		em.persist(fonte);
		em.getTransaction().commit();
		em.close();
	}
	
}
