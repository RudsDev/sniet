package br.com.api.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.com.api.model.Especie;
import br.com.api.persist.JPAUtil;

public class EspecieDao {
	private EntityManager em = JPAUtil.getEntityManager();

	public Especie gravar(Especie especie) {
		Especie especieManaged = em.merge(especie);
		return especieManaged;
	}

	@SuppressWarnings("unchecked")
	public List<Especie> buscarTodasAsEspecies(){

		List<Especie>listaDeEspecies;
		em.getTransaction().begin();
		Query query = em.createQuery("select e from Especie e");
		listaDeEspecies =  query.getResultList();
		em.close();
		return listaDeEspecies;

	}


	public Especie getEspecieById(Integer idEspecie){

		Query query = em.createQuery("select e from Especie e where e.idEspecie = :idEspecie",
				Especie.class);

		query.setParameter("idEspecie", idEspecie);

		return (Especie) query.getSingleResult();
	}


	public Especie getEspecieByNomeCientifico(String nomeCientifico){

		Query query = em.createQuery("select e from Especie e where e.nomeCientifico = :nomeCientifico",
				Especie.class);

		query.setParameter("nomeCientifico", nomeCientifico);

		return (Especie) query.getSingleResult();
	}

}