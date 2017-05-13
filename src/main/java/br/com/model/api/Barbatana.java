package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Barbatana")
public class Barbatana {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_barbatana")
	@SequenceGenerator(name = "seq_barbatana", sequenceName = "seq_barbatana", initialValue = 1, allocationSize = 1)

	@Column(name = "CodBarbatana")
	private Integer codBarbatana;
	
	@Column(name = "DescCorBarbatana", length=50)
	private String descCorBarbatana;

	public Barbatana() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Barbatana [codBarbatana=" + codBarbatana + ", descCorBarbatana=" + descCorBarbatana + "]";
	}

	public Integer getCodBarbatana() {
		return codBarbatana;
	}

	public void setCodBarbatana(Integer codBarbatana) {
		this.codBarbatana = codBarbatana;
	}

	public String getDescCorBarbatana() {
		return descCorBarbatana;
	}

	public void setDescCorBarbatana(String descCorBarbatana) {
		this.descCorBarbatana = descCorBarbatana;
	}
}
