package br.com.dao.api;

import javax.persistence.EntityManager;

import br.com.model.api.Tubarao;
import br.com.persist.api.JPAUtil;

public class TubaraoDao {

	 private EntityManager em = new JPAUtil().getEntityManager();

	  public void gravarTubarao(Tubarao tubarao) {
	        this.em.getTransaction().begin();
	        this.em.persist(tubarao);
	        this.em.getTransaction().commit();
	        this.em.close();
	    }
	
	
	
}
