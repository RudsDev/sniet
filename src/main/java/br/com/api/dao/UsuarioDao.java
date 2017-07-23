/**
 	ESCRITO POR ALEXANDRE FRANCILINO

 	Minha intenção inicial é criar um CRUD básico e simples, escrevendo realmente todos os selects por atributos, sem automatização ou
 	inteligência computacional, porém após provado o funcionamento será implementada as inteligências, onde o campo que for escolhido para 
 	busca será a variável para completar a sql e fazer a busca, utilizando assim apenas uma linha de código, visto que cada campo
 	possui uma name.
 */

package br.com.api.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;

import br.com.api.model.Usuario;
import br.com.api.persist.JPAUtil;

public class UsuarioDao {

	private EntityManager em = JPAUtil.getEntityManager();

	public Usuario gravar(Usuario usuario){
		Usuario userManaged = em.merge(usuario);
		return userManaged;
	}

	
	public Usuario getUsuarioById(String idUsuario){
		Usuario user = em.find(Usuario.class, idUsuario);
		return user;
	}


	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByNome(String nome){
		Query query = em.createQuery("select u from Usuario u where u.nome = :nome",
				Usuario.class);
		query.setParameter("nome", nome);
		return query.getResultList();
	}


	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioBySobrenome(String sobrenome){
		Query query = em.createQuery("select u from Usuario u where u.sobrenome = :sobrenome",
				Usuario.class);
		query.setParameter("sobrenome", sobrenome);
		return query.getResultList();
	}

	
	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByNivelAcesso(String nivelAcesso){
		Query query = em.createQuery("select u from Usuario u where u.nivelAcesso = :nivelAcesso",
				Usuario.class);
		query.setParameter("nivelAcesso", nivelAcesso);
		return query.getResultList();
	}

	
	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByEmail(String email){
		Query query = em.createQuery("select u from Usuario u where u.email = :email",
				Usuario.class);
		query.setParameter("email", email);
		System.out.println("Saindo do UsuarioDao");
		return query.getResultList();
	}
	
	
	public Usuario getUsuarioByLogin(String login){
		Query query = em.createQuery("select u from Usuario u where u.login = :login",
				Usuario.class);
		query.setParameter("login", login);
		Usuario user = (Usuario) query.getSingleResult();
		return user;
	}

	
	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByStatus(String status){
		Query query = em.createQuery("select u from Usuario u where u.status = :status",
				Usuario.class);
		query.setParameter("status", status);
		return query.getResultList();
	}


	public Integer getQuantByStatus(String status){
		Query query  = em.createQuery("select COUNT(u.status) from Usuario u where u.status = :status");
		query.setParameter("status", status);
		return (Integer) query.getSingleResult();
	}

	
	public Usuario deletar(Usuario usuario){
		Usuario user = em.merge(usuario);
		System.out.println("Saindo do UsuarioDao");
		return user;
	}
	

	@SuppressWarnings("unchecked")
	public List<Usuario> buscarTodosUsuario(){
		List<Usuario>listaDeUsuarios;
		Query query = em.createQuery("select u from Usuario u");
		listaDeUsuarios =  query.getResultList();
		return listaDeUsuarios;
	}
	
	
	public Usuario logar(Usuario usuario) throws NoResultException{
		Usuario usuarioLogado;
		Query query = em.createQuery("select new br.com.api.model.Usuario"
				+ " (idUsuario, name, secondName, sex, acessLevel, email, phone, login, status)"
				+ " from Usuario u where u.login = :login "
				+ " and u.password = :password", Usuario.class);
		query.setParameter("login", usuario.getLogin());
		query.setParameter("password", usuario.getPassword());
		usuarioLogado =(Usuario) query.getSingleResult();
		return usuarioLogado;
	}
}