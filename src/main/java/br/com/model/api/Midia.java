package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Midia")
public class Midia {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="idMidia")
	private Integer idMidia;

	@Column(name="tipoMidia")
	private String tipoMidia;

	@Column(name="localMidia")
	private String localMidia;

	@Column(name="legendaMidia")
	private String legendaMidia;


	public Integer getIdMidia() {
		return idMidia;
	}

	public void setIdMidia(Integer idMidia) {
		this.idMidia = idMidia;
	}

	public String getTipoMidia() {
		return tipoMidia;
	}

	public void setTipoMidia(String tipoMidia) {
		this.tipoMidia = tipoMidia;
	}

	public String getLocalMidia() {
		return localMidia;
	}

	public void setLocalMidia(String localMidia) {
		this.localMidia = localMidia;
	}

	public String getLegendaMidia() {
		return legendaMidia;
	}

	public void setLegendaMidia(String legendaMidia) {
		this.legendaMidia = legendaMidia;
	}

}
