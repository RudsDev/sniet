package br.com.dao.api;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import br.com.model.api.Individuo;
import br.com.persist.api.JPAUtil;

public class IndividuoDao {
	
	private EntityManager em = new JPAUtil().getEntityManager();
	
	public Individuo gravar(Individuo individuo){
		em.getTransaction().begin();
		Individuo individuoManaged = em.merge(individuo);
		em.getTransaction().commit();
		em.close();
		return individuoManaged;
	}
	
	@SuppressWarnings("unchecked")
	public List<Individuo> buscarTodosIndividuos(){

		List<Individuo>listaDeIndividuos;
		em.getTransaction().begin();
		Query query = em.createQuery("select i from Individuo i");
		listaDeIndividuos =  query.getResultList();
		em.close();
		return listaDeIndividuos;
	}	
	
}