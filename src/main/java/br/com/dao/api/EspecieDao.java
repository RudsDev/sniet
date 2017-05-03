package br.com.dao.api;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.com.model.api.Especie;
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
}