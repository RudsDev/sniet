package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Tubarao")
public class Tubarao {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="idTubarao")
	private Integer idTubarao;
	
	@Column(name="comprimento")
	private Double comprimento;
	
	@Column(name="sexo")
	private String sexo;
	
	
	public Integer getIdTubarao() {
		return idTubarao;
	}

	public void setIdTubarao(Integer idTubarao) {
		this.idTubarao = idTubarao;
	}

	public Double getComprimento() {
		return comprimento;
	}

	public void setComprimento(Double comprimento) {
		this.comprimento = comprimento;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

}