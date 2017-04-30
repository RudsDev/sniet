package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.Gson;

@Entity
@Table(name="Ventre")
public class Ventre {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="codVentre")
	private Integer codVentre;

	@Column(name="descCorVentre")
	private Integer descCorVentre;


	public Integer getCodVentre() {
		return codVentre;
	}

	public void setCodVentre(Integer codVentre) {
		this.codVentre = codVentre;
	}

	public Integer getDescCorVentre() {
		return descCorVentre;
	}

	public void setDescCorVentre(Integer descCorVentre) {
		this.descCorVentre = descCorVentre;
	}


	public static Ventre jsonToVentre(String json){
		return new Gson().fromJson(json, Ventre.class);
	}

	public static String ventreToJson(Ventre ventre){
		return new Gson().toJson(ventre);
	}
}