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

		Query query = em.createQuery("select l from Local l where l.nomeLocal = :nomeLocal",
				Local.class);

		query.setParameter("nomeLocal", nomeLocal);

		return query.getResultList();
	}

}
