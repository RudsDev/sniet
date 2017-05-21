package br.com.dao.api;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.com.model.api.Habitat;
import br.com.persist.api.JPAUtil;

public class HabitatDao {
    private EntityManager em = new JPAUtil().getEntityManager();

    public void gravarHabitat(Habitat habitat) {
        this.em.getTransaction().begin();
        this.em.persist(habitat);
        this.em.getTransaction().commit();
        this.em.close();
    }
    
    public Habitat buscarPorCodigoHabitat(Integer cod) {
        this.em.getTransaction().begin();
        Habitat habitat = em.find(Habitat.class,cod);
        this.em.getTransaction().commit();
        this.em.close();
    return habitat;
    }
    
	@SuppressWarnings("unchecked")
	public List<Habitat> buscarTodosOsHabitat(){
		
		List<Habitat>listaDeHabitat;
 		em.getTransaction().begin();
 		Query query = em.createQuery("select h from Habitat h");
 		listaDeHabitat =  query.getResultList();
		em.close();
		return listaDeHabitat;
		
	}
    
}