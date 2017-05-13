package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "ATAQUE")
public class Ataque {	
	
	@Id 
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_ataque")
	@SequenceGenerator(name = "seq_ataque", sequenceName = "seq_ataque", initialValue = 1, allocationSize = 1)
	@Column(name="IDAtaque")
	private Integer id;
	
	@OneToOne
	@JoinColumn(name="IDIncidente")
	private Incidente incidente;
	
	@Column(name="LocalCorpo", length=20)
	private String localCorpo;
	
	@Column(name="StatusSequela", length=30)
	private String statusSequela;
	
	@Column(name="StatusFatalidade", length=1)
	private char statusFatalidade;
	
	@Column(name="StatusTubarao", length=30)
	private String statusTubarao;
	
	@Column(name="OBSAtaque", length=300)
	private String obsAtaque;


	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Incidente getIncidente() {
		return incidente;
	}
	public void setIncidente(Incidente incidente) {
		this.incidente = incidente;
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
	public char getStatusFatalidade() {
		return statusFatalidade;
	}
	public void setStatusFatalidade(char statusFatalidade) {
		this.statusFatalidade = statusFatalidade;
	}
	public String getLocalCorpo() {
		return localCorpo;
	}
	public void setLocalCorpo(String localCorpo) {
		this.localCorpo = localCorpo;
	}
	public String getStatusSequela() {
		return statusSequela;
	}
	public void setStatusSequela(String statusSequela) {
		this.statusSequela = statusSequela;
	}

}
