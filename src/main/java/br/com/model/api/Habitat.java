package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.Gson;

@Entity
@Table(name="Habitat")
public class Habitat {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="codHabitat")
	private Integer codHabitat;

	@Column(name="descHabitat")
	private String descHabitat;


	public Integer getCodHabitat() {
		return codHabitat;
	}

	public void setCodHabitat(Integer codHabitat) {
		this.codHabitat = codHabitat;
	}

	public String getDescHabitat() {
		return descHabitat;
	}

	public void setDescHabitat(String descHabitat) {
		this.descHabitat = descHabitat;
	}


	public static Habitat jsonToHabitat(String json){
		return new Gson().fromJson(json, Habitat.class);
	}

	public static String habitatToJson(Habitat habitat){
		return new Gson().toJson(habitat);
	}
}
