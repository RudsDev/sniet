package br.com.api.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.com.api.model.Familia;
import br.com.api.persist.JPAUtil;

public class FamiliaDao {
    private EntityManager em = JPAUtil.getEntityManager();

    public void gravarFamilia(Familia familia) {
        this.em.getTransaction().begin();
        this.em.persist(familia);
        this.em.getTransaction().commit();
        this.em.close();
    }
    
    public Familia buscarPorCodigoFamilia(Integer cod) {
        this.em.getTransaction().begin();
        Familia familia = em.find(Familia.class, cod);
        this.em.getTransaction().commit();
        this.em.close();
        return familia;
    }
@SuppressWarnings("unchecked")
public List<Familia> buscarTodasAsFamilias(){
		
		List<Familia>listaDeFamilias;
 		em.getTransaction().begin();
 		Query query = em.createQuery("select f from Familia f");
 		listaDeFamilias =  query.getResultList();
		em.close();
		return listaDeFamilias;
		
	}
    
    
}