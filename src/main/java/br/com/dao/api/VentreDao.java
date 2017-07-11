package br.com.dao.api;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.com.model.api.Ventre;
import br.com.persist.api.JPAUtil;

public class VentreDao {

	private EntityManager em = JPAUtil.getEntityManager();

	public void gravarVentre(Ventre ventre) {
		this.em.getTransaction().begin();
		this.em.persist(ventre);
		this.em.getTransaction().commit();
		this.em.close();
	}

	public Ventre buscaPorCodigoVentre(Integer cod) {
		this.em.getTransaction().begin();
		Ventre ventre = em.find(Ventre.class, cod);
		this.em.getTransaction().commit();
		this.em.close();
		return ventre;
	}

	@SuppressWarnings("unchecked")
	public List<Ventre> buscarTodosOsVentres() {

		List<Ventre> listaDeVentres;
		em.getTransaction().begin();
		Query query = em.createQuery("select v from Ventre v");
		listaDeVentres = query.getResultList();
		em.close();
		return listaDeVentres;

	}

}
