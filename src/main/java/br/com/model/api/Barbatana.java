package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Barbatana")
public class Barbatana {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="codBarbatana")
	private Integer codBarbatana;

	@Column(name="descBarbatana")
	private String descBarbatana;


	public Integer getCodBarbatana() {
		return codBarbatana;
	}

	public void setCodBarbatana(Integer codBarbatana) {
		this.codBarbatana = codBarbatana;
	}

	public String getDescBarbatana() {
		return descBarbatana;
	}

	public void setDescBarbatana(String descBarbatana) {
		this.descBarbatana = descBarbatana;
	}

}
