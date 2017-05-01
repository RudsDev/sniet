package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Focinho")
public class Focinho {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="codFocinho")
	private Integer codFocinho;

	@Column(name="tipoFocinho")
	private String tipoFocinho;

	@Column(name="descFocinho")
	private String descFocinho;

	public Integer getCodFocinho() {
		return codFocinho;
	}

	public void setCodFocinho(Integer codFocinho) {
		this.codFocinho = codFocinho;
	}

	public String getTipoFocinho() {
		return tipoFocinho;
	}

	public void setTipoFocinho(String tipoFocinho) {
		this.tipoFocinho = tipoFocinho;
	}

	public String getDescFocinho() {
		return descFocinho;
	}

	public void setDescFocinho(String descFocinho) {
		this.descFocinho = descFocinho;
	}

}
