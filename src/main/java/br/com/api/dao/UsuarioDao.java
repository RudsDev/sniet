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
		System.out.println("Entrando no UsuarioDao");
		Usuario userManaged = em.merge(usuario);
		System.out.println("Saindo do UsuarioDao");
		return userManaged;
	}

	
	public Usuario getUsuarioById(String idUsuario){
		System.out.println("Entrando no UsuarioDao");
		Usuario user = em.find(Usuario.class, idUsuario);
		System.out.println("Saindo do UsuarioDao");
		return user;
	}


	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByNome(String nome){
		System.out.println("Entrando no UsuarioDao");
		Query query = em.createQuery("select u from Usuario u where u.nome = :nome",
				Usuario.class);

		query.setParameter("nome", nome);
		System.out.println("Saindo do UsuarioDao");
		return query.getResultList();
	}


	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioBySobrenome(String sobrenome){
		System.out.println("Entrando no UsuarioDao");
		Query query = em.createQuery("select u from Usuario u where u.sobrenome = :sobrenome",
				Usuario.class);

		query.setParameter("sobrenome", sobrenome);
		System.out.println("Saindo do UsuarioDao");
		return query.getResultList();
	}

	
	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByNivelAcesso(String nivelAcesso){
		System.out.println("Entrando no UsuarioDao");
		Query query = em.createQuery("select u from Usuario u where u.nivelAcesso = :nivelAcesso",
				Usuario.class);

		query.setParameter("nivelAcesso", nivelAcesso);
		System.out.println("Saindo do UsuarioDao");
		return query.getResultList();
	}

	
	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByEmail(String email){
		System.out.println("Entrando no UsuarioDao");
		Query query = em.createQuery("select u from Usuario u where u.email = :email",
				Usuario.class);

		query.setParameter("email", email);
		System.out.println("Saindo do UsuarioDao");
		return query.getResultList();
	}
	
	
	public Usuario getUsuarioByLogin(String login){
		System.out.println("Entrando no UsuarioDao");
		Query query = em.createQuery("select u from Usuario u where u.login = :login",
				Usuario.class);
		query.setParameter("login", login);
		
		Usuario user = (Usuario) query.getSingleResult();
		
		System.out.println("Saindo do UsuarioDao");
		return user;
	}


	
	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByStatus(String status){
		System.out.println("Entrando no UsuarioDao");
		Query query = em.createQuery("select u from Usuario u where u.status = :status",
				Usuario.class);

		query.setParameter("status", status);
		System.out.println("Saindo do UsuarioDao");
		return query.getResultList();
	}


	public Integer getQuantByStatus(String status){
		System.out.println("Entrando no UsuarioDao");
		Query query  = em.createQuery("select COUNT(u.status) from Usuario u where u.status = :status");

		query.setParameter("status", status);
		System.out.println("Saindo do UsuarioDao");
		return (Integer) query.getSingleResult();
	}


	public Usuario atualizar(Usuario usuario){
		System.out.println("Entrando no UsuarioDao");
		Usuario user = em.merge(usuario);
		System.out.println("Saindo do UsuarioDao");
		return user;
	}

	
	public Usuario deletar(Usuario usuario){
		System.out.println("Entrando no UsuarioDao");
		Usuario user = em.merge(usuario);
		System.out.println("Saindo do UsuarioDao");
		return user;
	}
	

	@SuppressWarnings("unchecked")
	public List<Usuario> buscarTodosUsuario(){
		List<Usuario>listaDeUsuarios;
		System.out.println("Entrando no UsuarioDao");
		Query query = em.createQuery("select u from Usuario u");
		listaDeUsuarios =  query.getResultList();
		System.out.println("Saindo do UsuarioDao");
		return listaDeUsuarios;
	}
	
	
	
	public Usuario logar(Usuario usuario) throws NoResultException{
		System.out.println("Entrando no UsuarioDao - logar()");
		
		Usuario usuarioLogado;
		
		Query query = em.createQuery("select new br.com.api.model.Usuario"
				+ " (idUsuario, name, secondName, sex, acessLevel, email, phone, login, status)"
				+ " from Usuario u where u.login = :login "
				+ " and u.password = :password", Usuario.class);
		query.setParameter("login", usuario.getLogin());
		query.setParameter("password", usuario.getPassword());
		usuarioLogado =(Usuario) query.getSingleResult();

		System.out.println("Saindo do UsuarioDao - logar()");
		return usuarioLogado;
	}

}