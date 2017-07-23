package br.com.api.dao;

import javax.persistence.EntityManager;

import br.com.api.model.Tubarao;
import br.com.api.persist.JPAUtil;

public class TubaraoDao {

	 private EntityManager em = JPAUtil.getEntityManager();

	  public void gravarTubarao(Tubarao tubarao) {
	        this.em.getTransaction().begin();
	        this.em.persist(tubarao);
	        this.em.getTransaction().commit();
	        this.em.close();
	    }
	
	
	
}
