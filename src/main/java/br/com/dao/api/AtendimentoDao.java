package br.com.dao.api;

import javax.persistence.EntityManager;

import br.com.model.api.Atendimento;
import br.com.persist.api.JPAUtil;

public class AtendimentoDao {

	
	private EntityManager em = JPAUtil.getEntityManager();
	
	public void gravar(Atendimento atendimento){
		em.getTransaction().begin();
		em.persist(atendimento);
		em.getTransaction().commit();
		em.close();
	}
	
	
}