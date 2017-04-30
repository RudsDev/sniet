package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.Gson;

@Entity
@Table(name="Pais")
public class Pais {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="codPais")
	private Integer codPais;

	@Column(name="nomePais")
	private String nomePais;

	@Column(name="descPais")
	private String descPais;


	public Integer getCodPais() {
		return codPais;
	}

	public void setCodPais(Integer codPais) {
		this.codPais = codPais;
	}

	public String getNomePais() {
		return nomePais;
	}

	public void setNomePais(String nomePais) {
		this.nomePais = nomePais;
	}

	public String getDescPais() {
		return descPais;
	}

	public void setDescPais(String descPais) {
		this.descPais = descPais;
	}


	public static Pais jsonToPais(String json){
		return new Gson().fromJson(json, Pais.class);
	}

	public static String paisToJson(Pais pais){
		return new Gson().toJson(pais);
	}

}