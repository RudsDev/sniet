package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "BarbPeitoral")
public class BarbPeitoral {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_barbPeitoral")
	@SequenceGenerator(name = "seq_barbPeitoral", sequenceName = "seq_barbPeitoral", initialValue = 1, allocationSize = 1)

	@Column(name = "codbarbpeitoral")
	private Integer codBarbPeitoral;
	
	@Column(name = "descbarbpeitoral", length=50)
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
