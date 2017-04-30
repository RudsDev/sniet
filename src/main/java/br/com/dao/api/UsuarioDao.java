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
import javax.persistence.Query;
import br.com.model.api.Usuario;
import br.com.persist.api.JPAUtil;

public class UsuarioDao {


	private EntityManager em = new JPAUtil().getEntityManager();

	//CREATE

	public Usuario gravar(Usuario usuario){
		em.getTransaction().begin();
		Usuario userManaged = em.merge(usuario);
		em.getTransaction().commit();
		em.close();
		return userManaged;
	}

	//==========================================================================================

	//RETRIEVE idUsuario

	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByIdUsuario(String idUsuario){

		Query query = em.createQuery("select u from Usuario u where u.idUsuario = :idUsuario",
				Usuario.class);

		query.setParameter("idUsuario", idUsuario);

		return query.getResultList();
	}


	public Integer qtdUsuariosIdUsuario(String idUsuario){

		Query query  = em.createQuery("select COUNT(u.idUsuario) from Usuario u where u.idUsuario = :idUsuario");

		query.setParameter("idUsuario", idUsuario);

		return (Integer) query.getSingleResult();
	}

	//------------------------------------------------------------------------------------------

	//RETRIEVE NOME

	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByNome(String nome){

		Query query = em.createQuery("select u from Usuario u where u.nome = :nome",
				Usuario.class);

		query.setParameter("nome", nome);

		return query.getResultList();
	}


	public Integer qtdUsuariosNome(String nome){

		Query query  = em.createQuery("select COUNT(u.nome) from Usuario u where u.nome = :nome");

		query.setParameter("nome", nome);

		return (Integer) query.getSingleResult();
	}

	//------------------------------------------------------------------------------------------
	
	//RETRIEVE SOBRENOME

	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioBySobrenome(String sobrenome){

		Query query = em.createQuery("select u from Usuario u where u.sobrenome = :sobrenome",
				Usuario.class);

		query.setParameter("sobrenome", sobrenome);

		return query.getResultList();
	}


	public Integer qtdUsuariosSobrenome(String sobrenome){

		Query query  = em.createQuery("select COUNT(u.sobrenome) from Usuario u where u.sobrenome = :sobrenome");

		query.setParameter("sobrenome", sobrenome);

		return (Integer) query.getSingleResult();
	}

	//------------------------------------------------------------------------------------------

	//RETRIEVE SEXO

	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioBySexo(String sexo){

		Query query = em.createQuery("select u from Usuario u where u.sexo = :sexo",
				Usuario.class);

		query.setParameter("sexo", sexo);

		return query.getResultList();
	}


	public Integer qtdUsuariosSexo(String sexo){

		Query query  = em.createQuery("select COUNT(u.sexo) from Usuario u where u.sexo = :sexo");

		query.setParameter("sexo", sexo);

		return (Integer) query.getSingleResult();
	}

	//------------------------------------------------------------------------------------------

	//RETRIEVE NIVELACESSO

	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByNivelAcesso(String nivelAcesso){

		Query query = em.createQuery("select u from Usuario u where u.nivelAcesso = :nivelAcesso",
				Usuario.class);

		query.setParameter("nivelAcesso", nivelAcesso);

		return query.getResultList();
	}


	public Integer qtdUsuariosNivelAcesso(String nivelAcesso){

		Query query  = em.createQuery("select COUNT(u.nivelAcesso) from Usuario u where u.nivelAcesso = :nivelAcesso");

		query.setParameter("nivelAcesso", nivelAcesso);

		return (Integer) query.getSingleResult();
	}

	//------------------------------------------------------------------------------------------
	
	//RETRIEVE EMAIL
	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByEmail(String email){

		Query query = em.createQuery("select u from Usuario u where u.email = :email",
				Usuario.class);

		query.setParameter("email", email);

		return query.getResultList();
	}


	public Integer qtdUsuariosEmail(String email){

		Query query  = em.createQuery("select COUNT(u.email) from Usuario u where u.email = :email");

		query.setParameter("email", email);

		return (Integer) query.getSingleResult();
	}

	//------------------------------------------------------------------------------------------

	//RETRIEVE TELEFONE
	
	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByTelefone(String telefone){

		Query query = em.createQuery("select u from Usuario u where u.telefone = :telefone",
				Usuario.class);

		query.setParameter("telefone", telefone);

		return query.getResultList();
	}


	public Integer qtdUsuariosTelefone(String telefone){

		Query query  = em.createQuery("select COUNT(u.telefone) from Usuario u where u.telefone = :telefone");

		query.setParameter("telefone", telefone);

		return (Integer) query.getSingleResult();
	}

	//------------------------------------------------------------------------------------------
	
	//RETRIEVE LOGIN
	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByLogin(String login){

		Query query = em.createQuery("select u from Usuario u where u.login = :login",
				Usuario.class);

		query.setParameter("login", login);

		return query.getResultList();
	}


	public Integer qtdUsuariosLogin(String login){

		Query query  = em.createQuery("select COUNT(u.login) from Usuario u where u.login = :login");

		query.setParameter("login", login);

		return (Integer) query.getSingleResult();
	}

	//------------------------------------------------------------------------------------------

	//RETRIEVE SENHA
	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioBySenha(String senha){

		Query query = em.createQuery("select u from Usuario u where u.senha = :senha",
				Usuario.class);

		query.setParameter("senha", senha);

		return query.getResultList();
	}


	public Integer qtdUsuariosSenha(String senha){

		Query query  = em.createQuery("select COUNT(u.senha) from Usuario u where u.senha = :senha");

		query.setParameter("senha", senha);

		return (Integer) query.getSingleResult();
	}

	//------------------------------------------------------------------------------------------

	//RETRIEVE STATUS
	@SuppressWarnings("unchecked")
	public List<Usuario> getUsuarioByStatus(String status){

		Query query = em.createQuery("select u from Usuario u where u.status = :status",
				Usuario.class);

		query.setParameter("status", status);

		return query.getResultList();
	}


	public Integer qtdUsuariosStatus(String status){

		Query query  = em.createQuery("select COUNT(u.status) from Usuario u where u.status = :status");

		query.setParameter("status", status);

		return (Integer) query.getSingleResult();
	}

	//==========================================================================================

	//UPDATE
	
	public Usuario atualizar(Usuario usuario){
		em.getTransaction().begin();
		Usuario user = em.merge(usuario);
		em.getTransaction().commit();
		em.close();
		
		return user;
	}
		
	//==========================================================================================

	//DELETE
	public Usuario deletar(Usuario usuario){
		em.getTransaction().begin();
		Usuario user = em.merge(usuario);
		em.getTransaction().commit();
		em.close();
		
		return user;
	}

	
	public Usuario apagarUsuarioPorId(Integer id){
		Usuario user = null;
		return user;
	}
	
	public Usuario apagarUsuarioPorObjeto(Usuario usuario){
		Usuario user = null;
		return user;
	}
	
	
	
	
}
