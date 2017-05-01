package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Reproducao")
public class Reproducao {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="codReprod")
	private Integer codReprod;

	@Column(name="tipoReprod")
	private String tipoReprod;


	public Integer getCodReprod() {
		return codReprod;
	}

	public void setCodReprod(Integer codReprod) {
		this.codReprod = codReprod;
	}

	public String getTipoReprod() {
		return tipoReprod;
	}

	public void setTipoReprod(String tipoReprod) {
		this.tipoReprod = tipoReprod;
	}

}