package br.com.dao.api;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import br.com.model.api.Local;
import br.com.persist.api.JPAUtil;

public class LocalDao {
	
	private EntityManager em = new JPAUtil().getEntityManager();
	
	@SuppressWarnings("unchecked")
	public List<Local> getLocalByName(String nomeLocal){
		em.getTransaction().begin();
		Query query = em.createQuery("select l from Local l where l.nomeLocal = :nomeLocal",
				Local.class);

		query.setParameter("nomeLocal", nomeLocal);
		em.close();
		return query.getResultList();
	}

	public Local teste(){
		em.getTransaction().begin();
		Local i = em.find(Local.class, 1);
		em.close();
		return i;
	}
	
	
	@SuppressWarnings("unchecked")
	public List<Local> teste1(){
		//Realizando teste
		Query query = this.em.createQuery("select local from Local local");
		//query.setParameter("nomeCientifico", nomeCientifico);
		  
		return query.getResultList();
	}	

	
}
