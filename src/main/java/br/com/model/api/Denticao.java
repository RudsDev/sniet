package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.Gson;

@Entity
@Table(name="Denticao")
public class Denticao {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="codDenticao")
	private Integer codDenticao;

	@Column(name="caracDenticao")
	private String caracDenticao;


	public Integer getCodDenticao() {
		return codDenticao;
	}

	public void setCodDenticao(Integer codDenticao) {
		this.codDenticao = codDenticao;
	}

	public String getCaracDenticao() {
		return caracDenticao;
	}

	public void setCaracDenticao(String caracDenticao) {
		this.caracDenticao = caracDenticao;
	}


	public static Denticao jsonToDenticao(String json){
		return new Gson().fromJson(json, Denticao.class);
	}

	public static String denticaoToJson(Denticao denticao){
		return new Gson().toJson(denticao);
	}

}