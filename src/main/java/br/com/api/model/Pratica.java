package br.com.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "PRATICA")
public class Pratica {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_pratica")
	@SequenceGenerator(name = "seq_pratica", sequenceName = "seq_pratica", initialValue = 1, allocationSize = 1)
	@Column(name="IDPratica")
	private Integer id;
	
	@Column(name="TipoPratica", length=1)
	private char tipoPratica;
	
	@Column(name="StatusPratica", length=1)
	private char statusPratica;
	
	@Column(name="descPratica", length=100)
	private String descPratica;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public char getTipoPratica() {
		return tipoPratica;
	}

	public void setTipoPratica(char tipoPratica) {
		this.tipoPratica = tipoPratica;
	}

	public char getStatusPratica() {
		return statusPratica;
	}

	public void setStatusPratica(char statusPratica) {
		this.statusPratica = statusPratica;
	}

	public String getDescPratica() {
		return descPratica;
	}

	public void setDescPratica(String descPratica) {
		this.descPratica = descPratica;
	}
	
	public void exibir(){
		System.out.println("ID: " +  this.getId());
		System.out.println("Descricao: " +  this.getDescPratica());
		System.out.println("Tipo Pratica: " +  this.getTipoPratica());
		System.out.println("Status Pratica: " +  this.getStatusPratica());
	}
	
}