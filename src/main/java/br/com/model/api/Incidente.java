package br.com.model.api;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Incidente")
public class Incidente {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_incidente")
	@SequenceGenerator(name = "seq_incidente", sequenceName = "seq_incidente", initialValue = 1, allocationSize = 1)
	@Column(name="IDIncidente")
	private Integer idIncidente;
		
	@Column(name="descIncidente", length=300)
	private String descIncidente;
	
	@Column(name="DataHoraIncidente")
	private Date dataIncidente;
	
	@Column(name="status")
	private String status;
	
	@JsonIgnore
	@OneToOne(fetch = FetchType.EAGER,cascade=CascadeType.ALL)
	@JoinColumn(name="IdTubarao")
	private Tubarao tubarao;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name="IdLocal")
	private Local local;

	
	public String getDescIncidente() {
		return descIncidente;
	}

	public void setDescIncidente(String descricaoIncidente) {
		this.descIncidente = descricaoIncidente;
	}

	public Date getDataIncidente() {
		return dataIncidente;
	}

	public void setDataIncidente(Date dataIncidente) {
		this.dataIncidente = dataIncidente;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Tubarao getTubarao() {
		return tubarao;
	}

	public void setTubarao(Tubarao tubarao) {
		this.tubarao = tubarao;
	}
	
	public Local getLocal() {
		return local;
	}

	public void setLocal(Local local) {
		this.local = local;
	}
	
	public Integer getidIncidente() {
		return idIncidente;
	}

	
	public void exibir(){
		System.out.println("ID: " +  this.getidIncidente());
		System.out.println("Descricao: " +  this.getDescIncidente());
		System.out.println("Data: " +  this.getDataIncidente());
		System.out.println("Status: " +  this.getStatus());
	}

}