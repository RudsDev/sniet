package br.com.api.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "INDIVIDUO")
public class Individuo {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_individuo")
	@SequenceGenerator(name = "seq_individuo", sequenceName = "seq_individuo", initialValue = 1, allocationSize = 1)
	@Column(name="IDIndividuo")
	private Integer id;

	@Column(name="Idade")
	private Integer idade;
	
	@Column(name="Nome", length=60)
	private String nome;
	
	@Column(name="Profissao", length=60)
	private String profissao;
	
	@Column(name="Sexo", length=1)
	private char sex;
	
	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="IDIncidente")
	private Incidente incidente;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="IDPratica")
	private Pratica pratica;
	
	public Individuo() {
	
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getIdade() {
		return idade;
	}

	public void setIdade(Integer idade) {
		this.idade = idade;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getProfissao() {
		return profissao;
	}

	public void setProfissao(String profissao) {
		this.profissao = profissao;
	}

	public char getSex() {
		return sex;
	}

	public void setSex(char sex) {
		this.sex = sex;
	}

	public Incidente getIncidente() {
		return incidente;
	}

	public void setIncidente(Incidente incidente) {
		this.incidente = incidente;
	}

	public Pratica getPratica() {
		return pratica;
	}

	public void setPratica(Pratica pratica) {
		this.pratica = pratica;
	}
	
	public void exibir(){
		System.out.println("ID: " +  this.getId());
		System.out.println("Nome: " +  this.getNome());
		System.out.println("Idade: " +  this.getIdade());
		System.out.println("Profissao: " +  this.getProfissao());
		System.out.println("Incidente: " +  this.getIncidente());
	}
	
}