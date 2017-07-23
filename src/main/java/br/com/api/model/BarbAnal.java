package br.com.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "BarbAnal")
public class BarbAnal {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_barbanal")
	@SequenceGenerator(name = "seq_barbanal", sequenceName = "seq_barbanal", initialValue = 1, allocationSize = 1)

	@Column(name = "codbarbanal")
	private Integer codBarbAnal;
	
	@Column(name = "descbarbanal", length=50)
	private String descBarbAnal;

	public Integer getCodBarbAnal() {
		return codBarbAnal;
	}

	public void setCodBarbAnal(Integer codBarbAnal) {
		this.codBarbAnal = codBarbAnal;
	}

	public String getDescBarbAnal() {
		return descBarbAnal;
	}

	public void setDescBarbAnal(String descBarbAnal) {
		this.descBarbAnal = descBarbAnal;
	}

}
