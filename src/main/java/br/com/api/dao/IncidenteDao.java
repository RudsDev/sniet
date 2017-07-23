package br.com.api.dao;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.com.api.model.Incidente;
import br.com.api.persist.JPAUtil;

public class IncidenteDao {

	private EntityManager em = JPAUtil.getEntityManager();
	
	public Incidente gravar(Incidente incidente){
		Incidente incidenteManaged = em.merge(incidente);
		return incidenteManaged;
	}

	public Incidente getIncidenteById(Integer idIncidente){
		Query query = em.createQuery("select e from Incidente e where e.idIncidente = :idIncidente",
				Incidente.class);
		query.setParameter("idIncidente", idIncidente);
		Incidente incidente = (Incidente) query.getSingleResult();
		return incidente;
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
	
	
	@SuppressWarnings("unchecked")
	public List<Incidente> getIncidenteByNomeLocal(String nomeLocal){
		Query query = em.createQuery("select i from Incidente i where i.local.nomeLocal = :nomeLocal",
				Incidente.class);
		query.setParameter("nomeLocal", nomeLocal);
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
		Query query = em.createQuery("select i from Incidente i");
		listaDeIncidentes =  query.getResultList();
		return listaDeIncidentes;
	}
	
	public Incidente atualizar(Incidente incidente){
		Incidente inc = em.merge(incidente);
		em.getTransaction().commit();
		return inc;
	}

}