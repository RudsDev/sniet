package br.com.dao.api;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import br.com.model.api.Incidente;
import br.com.persist.api.JPAUtil;

public class IncidenteDao {
	
	private EntityManager em = new JPAUtil().getEntityManager();
	
	public void gravar(Incidente incidente){
		em.getTransaction().begin();
		em.persist(incidente);
		em.getTransaction().commit();
		em.close();
	}
	
	
	@SuppressWarnings("unchecked")
	public List<Incidente> getByPeriodo (Date dataInicial, Date dataFinal){
		
		Query query = this.em.createQuery("select incidente from Incidente incidente where "
				+ "incidente.dataIncidente between :dataInicial and :dataFinal",
				Incidente.class);
		
		query.setParameter("dataInicial", dataInicial);
		query.setParameter("dataFinal", dataFinal);
		
		return query.getResultList();
	}
	
	
	@SuppressWarnings("unchecked")
	public List<Incidente> getIncidenteByStatus(String status){
		
		Query query = em.createQuery("select i from Incidente i where i.status = :status",
				Incidente.class);
		
		query.setParameter("status", status);
		
		return query.getResultList();
	}
	
	
	public Integer qtdIncidenteStatus(String status){
		
		Query query  = em.createQuery("select COUNT(i.status) from Incidente i where i.status = :status");
		
		query.setParameter("status", status);
		
		return (Integer) query.getSingleResult();
	}
	
	@SuppressWarnings("unchecked")
	public List<Incidente> buscarTodosInicidentes(){

		List<Incidente>listaDeIncidentes;
		em.getTransaction().begin();
		Query query = em.createQuery("select i from Incidente i");
		listaDeIncidentes =  query.getResultList();
		em.close();
		return listaDeIncidentes;
	}

}