package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.Gson;


@Entity
@Table(name="Usuario")
public class Usuario {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="idUsuario")
	private Integer id;
	
	@Column(name="nome")
	private String name;
	
	@Column(name="sobrenome")
	private String secondName;
	
	@Column(name="sexo")
	private char sex;
	
	@Column(name="nivelAcesso")
	private Integer acessLevel;
	
	@Column(name="email")
	private String email;
	
	@Column(name="telefone")
	private String telefone;
	
	@Column(name="login")
	private String login;
	
	@Column(name="senha")
	private String password;
	
	@Column(name="status")
	private String status;
	
	public Usuario(){
	
	}
	
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSecondName() {
		return secondName;
	}

	public void setSecondName(String secondName) {
		this.secondName = secondName;
	}

	public char getSex() {
		return sex;
	}

	public void setSex(char sex) {
		this.sex = sex;
	}

	public Integer getAcessLevel() {
		return acessLevel;
	}

	public void setAcessLevel(Integer acessLevel) {
		this.acessLevel = acessLevel;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}


	public void exibir(){
		System.out.println("ID: " +  this.getId());
		System.out.println("Nome: " +  this.getName());
		System.out.println("Sobrenome: " +  this.getSecondName());
		System.out.println("Sexo: " +  this.getSex());
		System.out.println("E-mail: " +  this.getEmail());
		System.out.println("Telefone: " +  this.getTelefone());
		System.out.println("Login: " + this.getLogin());
		System.out.println("Senha: " + this.getPassword());
		System.out.println("Nivel de Acesso: " + 
							this.getAcessLevel());
		System.out.println("Status: " +  this.getStatus());
	}
	
	public static Usuario jsonToUser(String json){
		return new Gson().fromJson(json, Usuario.class);
	}
	
	public static String userToJson(Usuario user){
		return new Gson().toJson(user);
	}
	
}