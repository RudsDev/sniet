package br.com.api.model;

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

	@Column(name = "codbarbatana")
	private Integer idBarbatana;
	
	@Column(name = "desccorbarbatana", length=50)
	private String descCorBarbatana;

	
	public Integer getIdBarbatana() {
		return idBarbatana;
	}

	public void setIdBarbatana(Integer idBarbatana) {
		this.idBarbatana = idBarbatana;
	}

	public String getDescCorBarbatana() {
		return descCorBarbatana;
	}

	public void setDescCorBarbatana(String descCorBarbatana) {
		this.descCorBarbatana = descCorBarbatana;
	}

	@Override
	public String toString() {
		return "Barbatana [idBarbatana=" + idBarbatana + ", descCorBarbatana=" + descCorBarbatana + "]";
	}
}
