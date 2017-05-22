package br.com.persist.api;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class JPAUtil {

	public EntityManagerFactory emf = Persistence.createEntityManagerFactory("teste");
	public EntityManager em;
	
	public EntityManager getEntityManager() {
		return em= emf.createEntityManager();
	}
	
	
	
}
