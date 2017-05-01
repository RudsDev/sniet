package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Pratica")
public class Pratica {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="idPratica")
	private Integer idPratica;

	@Column(name="tipoPratica")
	private String tipoPratica;

	@Column(name="statusPratica")
	private String statusPratica;

	@Column(name="descPratica")
	private String descPratica;


	public Integer getIdPratica() {
		return idPratica;
	}

	public void setIdPratica(Integer idPratica) {
		this.idPratica = idPratica;
	}

	public String getTipoPratica() {
		return tipoPratica;
	}

	public void setTipoPratica(String tipoPratica) {
		this.tipoPratica = tipoPratica;
	}

	public String getStatusPratica() {
		return statusPratica;
	}

	public void setStatusPratica(String statusPratica) {
		this.statusPratica = statusPratica;
	}

	public String getDescPratica() {
		return descPratica;
	}

	public void setDescPratica(String descPratica) {
		this.descPratica = descPratica;
	}

}
