package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "BarbCaudal")
public class BarbCaudal {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_barbcaudal")
	@SequenceGenerator(name = "seq_barbcaudal", sequenceName = "seq_barbcaudal", initialValue = 1, allocationSize = 1)

	@Column(name = "CodBarbCaudal")
	private Integer codBarbCaudal;
	
	@Column(name = "DescBarbCaudal", length=60)
	private String descBarbAnal;

	public BarbCaudal() {
		// TODO Auto-generated constructor stub
	}

	public Integer getCodBarbCaudal() {
		return codBarbCaudal;
	}

	public void setCodBarbCaudal(Integer codBarbCaudal) {
		this.codBarbCaudal = codBarbCaudal;
	}

	public String getDescBarbAnal() {
		return descBarbAnal;
	}

	public void setDescBarbAnal(String descBarbAnal) {
		this.descBarbAnal = descBarbAnal;
	}
}