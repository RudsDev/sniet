package br.com.api.dao;

import javax.persistence.EntityManager;

import br.com.api.model.Pratica;
import br.com.api.persist.JPAUtil;

public class PraticaDao {

	
	private EntityManager em = JPAUtil.getEntityManager();
	
	public void gravar(Pratica pratica){
		em.getTransaction().begin();
		em.persist(pratica);
		em.getTransaction().commit();
		em.close();
	}
	
	
}