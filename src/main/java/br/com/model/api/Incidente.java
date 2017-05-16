package br.com.model.api;

import java.util.Date;

import javax.persistence.CascadeType;
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
@Table(name = "Incidente")
public class Incidente {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_incidente")
	@SequenceGenerator(name = "seq_incidente", sequenceName = "seq_incidente", initialValue = 1, allocationSize = 1)
	@Column(name="IDIncidente")
	private Integer id;
		
	@Column(name="DescIncidente", length=300)
	private String descricaoIncidente;
	
	@Column(name="DataHoraIncidente")
	private Date dataIncidente;
	
	@Column(name="status")
	private String status;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="IdTubarao")
	private Tubarao tubarao;

	public Integer getId() {
		return id;
	}
	@Column(name="latitude")
	private Double latitude;

	@Column(name="longitude")
	private Double longitude;

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescricaoIncidente() {
		return descricaoIncidente;
	}

	public void setDescricaoIncidente(String descricaoIncidente) {
		this.descricaoIncidente = descricaoIncidente;
	}

	public Date getDataIncidente() {
		return dataIncidente;
	}

	public void setDataIncidente(Date dataIncidente) {
		this.dataIncidente = dataIncidente;
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
}

