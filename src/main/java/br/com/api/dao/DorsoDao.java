package br.com.api.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.com.api.model.Dorso;
import br.com.api.persist.JPAUtil;

public class DorsoDao {
    private EntityManager em = JPAUtil.getEntityManager();

    public void gravarDorso(Dorso dorso) {
        this.em.getTransaction().begin();
        this.em.persist(dorso);
        this.em.getTransaction().commit();
        this.em.close();
    }
    
    public Dorso buscarPorCodigoDorso(Integer cod) {
        this.em.getTransaction().begin();
        Dorso dorso = em.find(Dorso.class, cod);
        this.em.getTransaction().commit();
        this.em.close();
        return dorso;
    }
@SuppressWarnings("unchecked")
public List<Dorso> buscarTodosOsDorsos(){
		
		List<Dorso>listaDeDorso;
 		em.getTransaction().begin();
 		Query query = em.createQuery("select d from Dorso d");
 		listaDeDorso =  query.getResultList();
		em.close();
		return listaDeDorso;
		
	}
    
    
    
}
