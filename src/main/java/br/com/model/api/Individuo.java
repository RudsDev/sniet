package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Individuo")
public class Individuo {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="idIndividuo")
	private Integer idIndividuo;
	
	@Column(name="idade")
	private Integer idade;
	
	@Column(name="nomeIndiv")
	private String nomeIndiv;
	
	@Column(name="residencia")
	private String residencia;
	
	@Column(name="profissao")
	private String profissao;
	
	@Column(name="sexoIndiv")
	private String sexoIndiv;
	
		
	public Integer getIdIndividuo() {
		return idIndividuo;
	}

	public void setIdIndividuo(Integer idIndividuo) {
		this.idIndividuo = idIndividuo;
	}

	public Integer getIdade() {
		return idade;
	}

	public void setIdade(Integer idade) {
		this.idade = idade;
	}

	public String getNomeIndiv() {
		return nomeIndiv;
	}

	public void setNomeIndiv(String nomeIndiv) {
		this.nomeIndiv = nomeIndiv;
	}

	public String getResidencia() {
		return residencia;
	}

	public void setResidencia(String residencia) {
		this.residencia = residencia;
	}

	public String getProfissao() {
		return profissao;
	}

	public void setProfissao(String profissao) {
		this.profissao = profissao;
	}

	public String getSexoIndiv() {
		return sexoIndiv;
	}

	public void setSexoIndiv(String sexoIndiv) {
		this.sexoIndiv = sexoIndiv;
	}

}
