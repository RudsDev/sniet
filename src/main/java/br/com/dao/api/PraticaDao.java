package br.com.dao.api;

import javax.persistence.EntityManager;

import br.com.model.api.Pratica;
import br.com.persist.api.JPAUtil;

public class PraticaDao {

	
	private EntityManager em = new JPAUtil().getEntityManager();
	
	public void gravar(Pratica pratica){
		em.getTransaction().begin();
		em.persist(pratica);
		em.getTransaction().commit();
		em.close();
	}
	
	
}