package br.com.dao.api;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import br.com.model.api.Especie;
import br.com.model.api.Usuario;
import br.com.persist.api.JPAUtil;

public class EspecieDao {
	private EntityManager em = new JPAUtil().getEntityManager();

	public void gravarEspecie(Especie especie) {
		this.em.getTransaction().begin();
		this.em.merge(especie);
		this.em.getTransaction().commit();
		this.em.close();
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


	public Especie getEspecieById(String idEspecie){

		Query query = em.createQuery("select e from Especie e where e.idespecie = :idEspecie",
				Usuario.class);

		query.setParameter("idEspecie", idEspecie);

		return (Especie) query.getSingleResult();
	}


	public Especie getEspecieByNomeCientifico(String nomeCientifico){

		Query query = em.createQuery("select e from Especie e where e.nomecientifico = :nomeCientifico",
				Usuario.class);

		query.setParameter("nomeCientifico", nomeCientifico);

		return (Especie) query.getSingleResult();
	}

}

