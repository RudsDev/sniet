package br.com.api.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.com.api.model.Reproducao;
import br.com.api.persist.JPAUtil;

public class ReproducaoDao implements DaoInterface {
	
	 private EntityManager em = JPAUtil.getEntityManager();

	  public void gravarReproducao(Reproducao reproducao) {
	        this.em.getTransaction().begin();
	        this.em.persist(reproducao);
	        this.em.getTransaction().commit();
	        this.em.close();
	    }
	
	  public Reproducao buscarPorCodigoReproducao(Integer cod) {
	        this.em.getTransaction().begin();
	        Reproducao reproducao = this.em.find(Reproducao.class, cod);
	        this.em.getTransaction().commit();
	        this.em.close();
	        return reproducao;
	  }
	
	 @SuppressWarnings("unchecked")
	public List<Reproducao> buscarTodasReproducoes(){
			
			List<Reproducao>listaDeReproducao;
	 		em.getTransaction().begin();
	 		Query query = em.createQuery("select r from Reproducao r");
	 		listaDeReproducao =  query.getResultList();
			em.close();
			return listaDeReproducao;
			
		}
	
	
}
