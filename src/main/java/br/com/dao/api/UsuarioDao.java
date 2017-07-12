/**
 	ESCRITO POR ALEXANDRE FRANCILINO

 	Minha intenção inicial é criar um CRUD básico e simples, escrevendo realmente todos os selects por atributos, sem automatização ou
 	inteligência computacional, porém após provado o funcionamento será implementada as inteligências, onde o campo que for escolhido para 
 	busca será a variável para completar a sql e fazer a busca, utilizando assim apenas uma linha de código, visto que cada campo
 	possui uma name.
 */

package br.com.dao.api;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;

import br.com.model.api.Usuario;
import br.com.persist.api.JPAUtil;

public class UsuarioDao {

	private EntityManager em = JPAUtil.getEntityManager();

	public Usuario gravar(Usuario usuario){
		em.getTransaction().begin();
		Usuario userManaged = em.merge(usuario);
		em.getTransaction().commit();
		em.close();
		return userManaged;
	}

	
	public Usuario getUsuarioById(String idUsuario){
		em.getTransaction().begin();
		Usuario user = em.find(Usuario.class, idUsuario);
		em.close();
		return user;
	}


	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByNome(String nome){
		em.getTransaction().begin();
		Query query = em.createQuery("select u from Usuario u where u.nome = :nome",
				Usuario.class);

		query.setParameter("nome", nome);
		em.close();
		return query.getResultList();
	}


	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioBySobrenome(String sobrenome){
		em.getTransaction().begin();
		Query query = em.createQuery("select u from Usuario u where u.sobrenome = :sobrenome",
				Usuario.class);

		query.setParameter("sobrenome", sobrenome);
		em.close();
		return query.getResultList();
	}

	
	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByNivelAcesso(String nivelAcesso){
		em.getTransaction().begin();
		Query query = em.createQuery("select u from Usuario u where u.nivelAcesso = :nivelAcesso",
				Usuario.class);

		query.setParameter("nivelAcesso", nivelAcesso);
		em.close();
		return query.getResultList();
	}

	
	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByEmail(String email){
		em.getTransaction().begin();
		Query query = em.createQuery("select u from Usuario u where u.email = :email",
				Usuario.class);

		query.setParameter("email", email);
		em.close();
		return query.getResultList();
	}
	
	
	public Usuario getUsuarioByLogin(String login){
		em.getTransaction().begin();
		Query query = em.createQuery("select u from Usuario u where u.login = :login",
				Usuario.class);
		query.setParameter("login", login);
		
		Usuario user = (Usuario) query.getSingleResult();
		
		em.close();
		return user;
	}


	
	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByStatus(String status){
		em.getTransaction().begin();
		Query query = em.createQuery("select u from Usuario u where u.status = :status",
				Usuario.class);

		query.setParameter("status", status);
		em.close();
		return query.getResultList();
	}


	public Integer getQuantByStatus(String status){
		em.getTransaction().begin();
		Query query  = em.createQuery("select COUNT(u.status) from Usuario u where u.status = :status");

		query.setParameter("status", status);
		em.close();
		return (Integer) query.getSingleResult();
	}


	public Usuario atualizar(Usuario usuario){
		em.getTransaction().begin();
		Usuario user = em.merge(usuario);
		em.getTransaction().commit();
		em.close();
		
		return user;
	}

	
	public Usuario deletar(Usuario usuario){
		em.getTransaction().begin();
		Usuario user = em.merge(usuario);
		em.getTransaction().commit();
		em.close();	
		return user;
	}
	

	@SuppressWarnings("unchecked")
	public List<Usuario> buscarTodosUsuario(){
		List<Usuario>listaDeUsuarios;
		em.getTransaction().begin();
		Query query = em.createQuery("select u from Usuario u");
		listaDeUsuarios =  query.getResultList();
		em.close();
		return listaDeUsuarios;
	}
	
	
	
	public Usuario logar(Usuario usuario) throws NoResultException{
		Usuario usuarioLogado;
		em.getTransaction().begin();
		
		Query query = em.createQuery("select u from Usuario u where u.login = :login "
										+ "and u.password = :password", Usuario.class);
		query.setParameter("login", usuario.getLogin());
		query.setParameter("password", usuario.getPassword());
		usuarioLogado =(Usuario) query.getSingleResult();
		em.close();
		
		return usuarioLogado;
	}

}