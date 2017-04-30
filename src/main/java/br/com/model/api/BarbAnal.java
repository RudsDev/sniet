package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.Gson;

@Entity
@Table(name="BarbAnal")
public class BarbAnal {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="codBarbAnal")
	private Integer codBarbAnal;

	@Column(name="descBarbAnal")
	private String descBarbAnal;


	public Integer getCodBarbAnal() {
		return codBarbAnal;
	}

	public void setCodBarbAnal(Integer codBarbAnal) {
		this.codBarbAnal = codBarbAnal;
	}

	public String getDescBarbAnal() {
		return descBarbAnal;
	}

	public void setDescBarbAnal(String descBarbAnal) {
		this.descBarbAnal = descBarbAnal;
	}


	public static BarbAnal jsonToBarbAnal(String json){
		return new Gson().fromJson(json, BarbAnal.class);
	}

	public static String barbAnalToJson(BarbAnal barbAnal){
		return new Gson().toJson(barbAnal);
	}
}
