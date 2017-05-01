package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="BarbCaudal")
public class BarbCaudal {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="codBarbCaudal")
	private Integer codBarbCaudal;

	@Column(name="descBarbCaudal")
	private String descBarbCaudal;


	public Integer getCodBarbCaudal() {
		return codBarbCaudal;
	}

	public void setCodBarbCaudal(Integer codBarbCaudal) {
		this.codBarbCaudal = codBarbCaudal;
	}

	public String getDescBarbCaudal() {
		return descBarbCaudal;
	}

	public void setDescBarbCaudal(String descBarbCaudal) {
		this.descBarbCaudal = descBarbCaudal;
	}

}