package br.com.api.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;

public interface DaoInterface {
	
	public default Object save(EntityManager em, Object object){
		Object objectSaved = em.merge(object);
		return objectSaved;
	}
	
	public default List<?> searchAll(EntityManager em, Class<?> classType){
		
		Query query = em.createQuery("from "+classType.getName());
		
		return query.getResultList();
	};
	
	public default List<?> searchAllPaginate(EntityManager em, Class<?> classType,
			int maxResults, int firsResults){
		
		Query query = em.createQuery("from "+classType.getName());
		
		query.setFirstResult(0);
		query.setMaxResults(maxResults);
		
		return query.getResultList();
	};
	
	public default Integer count(EntityManager em, Class<?> classType){
		Query query = em.createQuery("select count(*) from "+classType.getName());
		return Integer.parseInt(query.getSingleResult().toString());
	};
	
	
	
}
