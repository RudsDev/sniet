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

	@Column(name="latitude")
	private Double latitude;

	@Column(name="longitude")
	private Double longitude;

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
	public Double getLatitude() {
		return latitude;
	}
	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}
	public Double getLongitude() {
		return longitude;
	}
	public void setLongitude(Double longitude) {
		this.longitude = longitude;
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
