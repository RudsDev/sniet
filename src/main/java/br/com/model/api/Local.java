package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Local")
public class Local {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="idLocal")
	private Integer idLocal;

	@Column(name="nomeLocal")
	private String nomeLocal;
	
	@Column(name="pais")
	private String pais;
	
	@Column(name="uf")
	private String uf;

	@Column(name="cidade")
	private String cidade;

	@Column(name="bairro")
	private String bairro;
	
	@Column(name="latitude")
	private Double latitude;

	@Column(name="longitude")
	private Double longitude;



	public Integer getIdLocal() {
		return idLocal;
	}

	public void setIdLocal(Integer idLocal) {
		this.idLocal = idLocal;
	}

	public String getNomeLocal() {
		return nomeLocal;
	}

	public void setNomeLocal(String nomeLocal) {
		this.nomeLocal = nomeLocal;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
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
	
	public String getPais() {
		return pais;
	}

	public void setPais(String pais) {
		this.pais = pais;
	}

	public void exibir(){
		System.out.println("ID: " +  this.getIdLocal());
		System.out.println("Nome: " +  this.getNomeLocal());
		System.out.println("Pais: " +  this.getPais());
		System.out.println("UF: " +  this.getUf());
		System.out.println("Cidade: " +  this.getCidade());
	}
}