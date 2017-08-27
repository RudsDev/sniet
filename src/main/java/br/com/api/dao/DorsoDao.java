package br.com.api.dao;

import javax.persistence.EntityManager;
import br.com.api.model.Dorso;
import br.com.api.persist.JPAUtil;

public class DorsoDao implements DaoInterface {
	
    private EntityManager em = JPAUtil.getEntityManager();
    
    public Dorso buscarPorCodigoDorso(Integer cod) {
        Dorso dorso = em.find(Dorso.class, cod);
        this.em.getTransaction().commit();
        return dorso;
    }
}
