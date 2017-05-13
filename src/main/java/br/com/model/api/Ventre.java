package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Ventre")
public class Ventre {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_ventre")
	@SequenceGenerator(name = "seq_ventre", sequenceName = "seq_ventre", initialValue = 1, allocationSize = 1)
	@Column(name = "CodVentre")
	private Integer codVentre;
	
	@Column(name = "DescCorVentre", length=50)
	private String descCorVentre;

	public Ventre() {

	}

	@Override
	public String toString() {
		return "Ventre [codVentre=" + codVentre + ", descCorVentre=" + descCorVentre + "]";
	}

	public Integer getCodVentre() {
		return codVentre;
	}

	public void setCodVentre(Integer codVentre) {
		this.codVentre = codVentre;
	}

	public String getDescCorVentre() {
		return descCorVentre;
	}

	public void setDescCorVentre(String descCorVentre) {
		this.descCorVentre = descCorVentre;
	}
}
