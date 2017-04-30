package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.Gson;

@Entity
@Table(name="Família")
public class Familia {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="idFamilia")
	private Integer idFamilia;

	@Column(name="nomeFamilia")
	private String nomeFamilia;

	@Column(name="descFamilia")
	private String descFamilia;


	public Integer getIdFamilia() {
		return idFamilia;
	}

	public void setIdFamilia(Integer idFamilia) {
		this.idFamilia = idFamilia;
	}

	public String getNomeFamilia() {
		return nomeFamilia;
	}

	public void setNomeFamilia(String nomeFamilia) {
		this.nomeFamilia = nomeFamilia;
	}

	public String getDescFamilia() {
		return descFamilia;
	}

	public void setDescFamilia(String descFamilia) {
		this.descFamilia = descFamilia;
	}


	public static Familia jsonToFamília(String json){
		return new Gson().fromJson(json, Familia.class);
	}

	public static String famíliaToJson(Familia família){
		return new Gson().toJson(família);
	}

}
