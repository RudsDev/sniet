package br.com.api.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.com.api.model.Denticao;
import br.com.api.persist.JPAUtil;

public class DenticaoDao  implements DaoInterface{
	private EntityManager em = JPAUtil.getEntityManager();

	public void gravarDenticao(Denticao denticao) {
		this.em.getTransaction().begin();
		this.em.persist(denticao);
		this.em.getTransaction().commit();
		this.em.close();

	}

	public Denticao buscaPorCodigoDenticao(Integer cod) {
		this.em.getTransaction().begin();
		Denticao denticao = em.find(Denticao.class, cod);
		this.em.getTransaction().commit();
		this.em.close();
		return denticao;
	}

	@SuppressWarnings("unchecked")
	public List<Denticao> buscarTodasAsDenticoes() {

		List<Denticao> listaDeDenticoes;
		em.getTransaction().begin();
		Query query = em.createQuery("select d from Denticao d");
		listaDeDenticoes = query.getResultList();
		em.close();
		return listaDeDenticoes;

	}
}