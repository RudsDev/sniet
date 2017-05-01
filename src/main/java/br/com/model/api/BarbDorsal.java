package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="BarbDorsal")
public class BarbDorsal {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="codBarbDorsal")
	private Integer codBarbDorsal;

	@Column(name="descBarbDorsal")
	private String descBarbDorsal;


	public Integer getCodBarbDorsal() {
		return codBarbDorsal;
	}

	public void setCodBarbDorsal(Integer codBarbDorsal) {
		this.codBarbDorsal = codBarbDorsal;
	}

	public String getDescBarbDorsal() {
		return descBarbDorsal;
	}

	public void setDescBarbDorsal(String descBarbDorsal) {
		this.descBarbDorsal = descBarbDorsal;
	}

}
