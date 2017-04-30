package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.Gson;

@Entity
@Table(name="Ataque")
public class Ataque {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="idAtaque")
	public Integer idAtaque;
	
	@Column(name="statusSequela")
	public String statusSequela;
	
	@Column(name="statusTubarao")
	public String statusTubarao;
	
	@Column(name="obsAtaque")
	public String obsAtaque;
	
	@Column(name="statusFatalidade")
	public String statusFatalidade;
	
	@Column(name="localCorpo")
	public String localCorpo;
	
		
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

	
	public static Ataque jsonToAtaque(String json){
		return new Gson().fromJson(json, Ataque.class);
	}

	public static String ataqueToJson(Ataque ataque){
		return new Gson().toJson(ataque);
	}
}
