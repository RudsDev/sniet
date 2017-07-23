package br.com.api.dao;

import javax.persistence.EntityManager;

import br.com.api.model.Atendimento;
import br.com.api.persist.JPAUtil;

public class AtendimentoDao {

	
	private EntityManager em = JPAUtil.getEntityManager();
	
	public void gravar(Atendimento atendimento){
		em.getTransaction().begin();
		em.persist(atendimento);
		em.getTransaction().commit();
		em.close();
	}
	
	
}