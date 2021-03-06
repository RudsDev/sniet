package br.com.api.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.com.api.model.Barbatana;
import br.com.api.persist.JPAUtil;

public class BarbatanaDao implements DaoInterface {

	private EntityManager em = JPAUtil.getEntityManager();
	
	
	
	public void gravarBarbatana(Barbatana b){
		
		em.getTransaction().begin();
		em.persist(b);
		em.getTransaction().commit();
		em.close();
		
	}
	
	public Barbatana buscarPorCodigoBarbatana(Integer cod){
		
		em.getTransaction().begin();
		Barbatana barbatana =  em.find(Barbatana.class, cod);
		em.getTransaction().commit();
		em.close();
		return barbatana;
	}
	
	@SuppressWarnings("unchecked")
	public List<Barbatana> buscarTodasAsbarbatanas(){
		
		List<Barbatana>listaDeBarbatanas;
 		em.getTransaction().begin();
 		Query query = em.createQuery("select b from Barbatana b");
 		listaDeBarbatanas =  query.getResultList();
		em.close();
		return listaDeBarbatanas;
		
	}
	
	
	
	
}
