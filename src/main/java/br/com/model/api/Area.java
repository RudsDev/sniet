package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.Gson;

@Entity
@Table(name="Area")
public class Area {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="codArea")
	private Integer codArea;

	@Column(name="nomeArea")
	private String nomeArea;

		
	public Integer getCodArea() {
		return codArea;
	}

	public void setCodArea(Integer codArea) {
		this.codArea = codArea;
	}

	public String getNomeArea() {
		return nomeArea;
	}

	public void setNomeArea(String nomeArea) {
		this.nomeArea = nomeArea;
	}

	
	public static Area jsonToArea(String json){
		return new Gson().fromJson(json, Area.class);
	}

	public static String areaToJson(Area area){
		return new Gson().toJson(area);
	}

}