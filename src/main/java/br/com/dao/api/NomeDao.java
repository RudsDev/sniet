package br.com.dao.api;

import javax.persistence.EntityManager;

import br.com.model.api.Nome;
import br.com.persist.api.JPAUtil;

public class NomeDao {
    private EntityManager em = JPAUtil.getEntityManager();

    public void gravarNome(Nome nome) {
        this.em.getTransaction().begin();
        this.em.persist(nome);
        this.em.getTransaction().commit();
        this.em.close();
    }
}