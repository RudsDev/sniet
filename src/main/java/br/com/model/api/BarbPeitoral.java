package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="BarbPeitoral")
public class BarbPeitoral {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="codBarbPeitoral")
	private Integer codBarbPeitoral;

	@Column(name="descBarbPeitoral")
	private String descBarbPeitoral;


	public Integer getCodBarbPeitoral() {
		return codBarbPeitoral;
	}

	public void setCodBarbPeitoral(Integer codBarbPeitoral) {
		this.codBarbPeitoral = codBarbPeitoral;
	}

	public String getDescBarbPeitoral() {
		return descBarbPeitoral;
	}

	public void setDescBarbPeitoral(String descBarbPeitoral) {
		this.descBarbPeitoral = descBarbPeitoral;
	}

}