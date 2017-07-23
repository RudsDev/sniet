package br.com.api.dao;

import javax.persistence.EntityManager;

import br.com.api.model.Nome;
import br.com.api.persist.JPAUtil;

public class NomeDao {
    private EntityManager em = JPAUtil.getEntityManager();

    public void gravarNome(Nome nome) {
        this.em.getTransaction().begin();
        this.em.persist(nome);
        this.em.getTransaction().commit();
        this.em.close();
    }
}