package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Dorso")
public class Dorso {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_dorso")
	@SequenceGenerator(name = "seq_dorso", sequenceName = "seq_dorso", initialValue = 1, allocationSize = 1)
	@Column(name = "CodDorso")
	private Integer codDorso;
	
	@Column(name = "DescCorDorso", length=50)
	private String descCorDorso;

		public Dorso() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Dorso [codDorso=" + codDorso + ", descCorDorso=" + descCorDorso + "]";
	}

	public Integer getCodDorso() {
		return codDorso;
	}

	public void setCodDorso(Integer codDorso) {
		this.codDorso = codDorso;
	}

	public String getDescCorDorso() {
		return descCorDorso;
	}

	public void setDescCorDorso(String descCorDorso) {
		this.descCorDorso = descCorDorso;
	}
}
