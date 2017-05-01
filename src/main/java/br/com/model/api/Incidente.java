package br.com.model.api;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Incidente")
public class Incidente {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="idIncidente")
	private Integer idIncidente;

	@Column(name="descIncidente")
	private String descIncidente;

	@Column(name="dataHoraIncidente")
	private Date dataHoraIncidente;


	public Integer getIdIncidente() {
		return idIncidente;
	}
	public void setIdIncidente(Integer idIncidente) {
		this.idIncidente = idIncidente;
	}
	public String getDescIncidente() {
		return descIncidente;
	}
	public void setDescIncidente(String descIncidente) {
		this.descIncidente = descIncidente;
	}
	public Date getDataHoraIncidente() {
		return dataHoraIncidente;
	}
	public void setDataHoraIncidente(Date dataHoraIncidente) {
		this.dataHoraIncidente = dataHoraIncidente;
	}

}
