package br.com.api.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.com.api.model.Focinho;
import br.com.api.persist.JPAUtil;

public class FocinhoDao implements DaoInterface {
	
    private EntityManager em = JPAUtil.getEntityManager();

    public void gravarFocinho(Focinho focinho) {
        this.em.getTransaction().begin();
        this.em.persist(focinho);
        this.em.getTransaction().commit();
        this.em.close();
    }
    
    public Focinho buscarPorCodigoFocinho(Integer cod) {
        this.em.getTransaction().begin();
        Focinho focinho = em.find(Focinho.class, cod);
        this.em.getTransaction().commit();
        this.em.close();
        return focinho;
    }
    
	@SuppressWarnings("unchecked")
	public List<Focinho> buscarTodosOsFocinhos(){
			
			List<Focinho>listaDeFocinhos;
	 		em.getTransaction().begin();
	 		Query query = em.createQuery("select f from Focinho f");
	 		listaDeFocinhos =  query.getResultList();
			em.close();
			return listaDeFocinhos;
			
		}
	
	
}