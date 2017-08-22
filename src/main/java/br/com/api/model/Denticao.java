package br.com.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Denticao")
public class Denticao {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_denticao")
	@SequenceGenerator(name = "seq_denticao", sequenceName = "seq_denticao", initialValue = 1, allocationSize = 1)

	@Column(name = "coddenticao")
	private Integer idDenticao;
	
	@Column(name = "caracdenticao", length=80)
	private String caracDenticao;
	

	public Integer getIdDenticao() {
		return idDenticao;
	}

	public void setIdDenticao(Integer idDenticao) {
		this.idDenticao = idDenticao;
	}

	public String getCaracDenticao() {
		return caracDenticao;
	}

	public void setCaracDenticao(String caracDenticao) {
		this.caracDenticao = caracDenticao;
	}
}
