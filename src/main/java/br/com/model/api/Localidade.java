package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Localidade")
public class Localidade {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="idLocalidade")
	private Integer idLocalidade;
	
	@Column(name="latitude")
	private Double latitude;
	
	@Column(name="longitude")
	private Double longitude;
	
	@Column(name="statusLocalidade")
	private String statusLocalidade;

	
	public Integer getIDLocalidade() {
		return idLocalidade;
	}

	public void setIDLocalidade(Integer idLocalidade) {
		this.idLocalidade = idLocalidade;
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

	public String getStatusLocalidade() {
		return statusLocalidade;
	}

	public void setStatusLocalidade(String statusLocalidade) {
		this.statusLocalidade = statusLocalidade;
	}

}