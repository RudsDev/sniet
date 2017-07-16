package br.com.dao.api;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import br.com.model.api.Individuo;
import br.com.persist.api.JPAUtil;

public class IndividuoDao {
	
	private EntityManager em = JPAUtil.getEntityManager();
	
	public Individuo gravar(Individuo individuo){
		Individuo individuoManaged = em.merge(individuo);
		return individuoManaged;
	}
	
	@SuppressWarnings("unchecked")
	public List<Individuo> buscarTodosIndividuos(){
		List<Individuo>listaDeIndividuos;
		Query query = em.createQuery("select i from Individuo i");
		listaDeIndividuos =  query.getResultList();
		return listaDeIndividuos;
	}	
}