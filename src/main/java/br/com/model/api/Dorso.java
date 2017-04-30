package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.Gson;

@Entity
@Table(name="Dorso")
public class Dorso {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="codDorso")
	private Integer codDorso;
	
	@Column(name="descCorDorso")
	private String descCorDorso;

	
	public Integer getCodDorso() {
		return codDorso;
	}

	public void setCodDorso(Integer codDorso) {
		this.codDorso = codDorso;
	}

	public String getDescCorDorso() {
		return descCorDorso;
	}

	public void setDescCorDorso(String descCorDorso) {
		this.descCorDorso = descCorDorso;
	}
	
	
	public static Dorso jsonToDorso(String json){
		return new Gson().fromJson(json, Dorso.class);
	}

	public static String dorsoToJson(Dorso dorso){
		return new Gson().toJson(dorso);
	}
}
