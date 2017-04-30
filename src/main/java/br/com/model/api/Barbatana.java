package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.Gson;

@Entity
@Table(name="Barbatana")
public class Barbatana {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="codBarbatana")
	private Integer codBarbatana;

	@Column(name="descBarbatana")
	private String descBarbatana;


	public Integer getCodBarbatana() {
		return codBarbatana;
	}

	public void setCodBarbatana(Integer codBarbatana) {
		this.codBarbatana = codBarbatana;
	}

	public String getDescBarbatana() {
		return descBarbatana;
	}

	public void setDescBarbatana(String descBarbatana) {
		this.descBarbatana = descBarbatana;
	}


	public static Barbatana jsonToBarbatana(String json){
		return new Gson().fromJson(json, Barbatana.class);
	}

	public static String barbatanaToJson(Barbatana barbatana){
		return new Gson().toJson(barbatana);
	}
}
