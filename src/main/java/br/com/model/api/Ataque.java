package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Ataque")
public class Ataque {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="idAtaque")
	private Integer idAtaque;
	
	@Column(name="statusSequela")
	private String statusSequela;
	
	@Column(name="statusTubarao")
	private String statusTubarao;
	
	@Column(name="obsAtaque")
	private String obsAtaque;
	
	@Column(name="statusFatalidade")
	private String statusFatalidade;
	
	@Column(name="localCorpo")
	private String localCorpo;
	
		
	public Integer getIdAtaque() {
		return idAtaque;
	}

	public void setIdAtaque(Integer idAtaque) {
		this.idAtaque = idAtaque;
	}

	public String getStatusSequela() {
		return statusSequela;
	}

	public void setStatusSequela(String statusSequela) {
		this.statusSequela = statusSequela;
	}

	public String getStatusTubarao() {
		return statusTubarao;
	}

	public void setStatusTubarao(String statusTubarao) {
		this.statusTubarao = statusTubarao;
	}

	public String getObsAtaque() {
		return obsAtaque;
	}

	public void setObsAtaque(String obsAtaque) {
		this.obsAtaque = obsAtaque;
	}

	public String getStatusFatalidade() {
		return statusFatalidade;
	}

	public void setStatusFatalidade(String statusFatalidade) {
		this.statusFatalidade = statusFatalidade;
	}

	public String getLocalCorpo() {
		return localCorpo;
	}

	public void setLocalCorpo(String localCorpo) {
		this.localCorpo = localCorpo;
	}

}
