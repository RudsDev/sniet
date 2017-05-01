package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Especie")
public class Especie {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="idEspecie")
	private Integer idEspecie;

	@Column(name="nomeCientifico")
	private String nomeCientifico;

	@Column(name="descricao")
	private String descricao;

	@Column(name="fotoPadrao")
	private String fotoPadrao;

	@Column(name="tamMenor")
	private Double tamMenor;

	@Column(name="tamMaior")
	private Double tamMaior;

	@Column(name="tamMedio")
	private Double tamMedio;

	@Column(name="tamMedioFilhote")
	private Double tamMedioFilhote;

	@Column(name="statusExtincao")
	private String statusExtincao;


	public Integer getIdEspecie() {
		return idEspecie;
	}

	public void setIdEspecie(Integer idEspecie) {
		this.idEspecie = idEspecie;
	}

	public String getNomeCientifico() {
		return nomeCientifico;
	}

	public void setNomeCientifico(String nomeCientifico) {
		this.nomeCientifico = nomeCientifico;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getFotoPadrao() {
		return fotoPadrao;
	}

	public void setFotoPadrao(String fotoPadrao) {
		this.fotoPadrao = fotoPadrao;
	}

	public Double getTamMenor() {
		return tamMenor;
	}

	public void setTamMenor(Double tamMenor) {
		this.tamMenor = tamMenor;
	}

	public Double getTamMaior() {
		return tamMaior;
	}

	public void setTamMaior(Double tamMaior) {
		this.tamMaior = tamMaior;
	}

	public Double getTamMedio() {
		return tamMedio;
	}

	public void setTamMedio(Double tamMedio) {
		this.tamMedio = tamMedio;
	}

	public Double getTamMedioFilhote() {
		return tamMedioFilhote;
	}

	public void setTamMedioFilhote(Double tamMedioFilhote) {
		this.tamMedioFilhote = tamMedioFilhote;
	}

	public String getStatusExtincao() {
		return statusExtincao;
	}

	public void setStatusExtincao(String statusExtincao) {
		this.statusExtincao = statusExtincao;
	}

}
