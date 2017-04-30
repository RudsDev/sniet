package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.Gson;

@Entity
@Table(name="Local")
public class Local {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="codLocal")
	private Integer codLocal;

	@Column(name="nomeLocal")
	private String nomeLocal;

	@Column(name="cidade")
	private String cidade;

	@Column(name="uf")
	private String uf;


	public Integer getCodLocal() {
		return codLocal;
	}

	public void setCodLocal(Integer codLocal) {
		this.codLocal = codLocal;
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
	

	public static Local jsonToLocal(String json){
		return new Gson().fromJson(json, Local.class);
	}

	public static String localToJson(Local local){
		return new Gson().toJson(local);
	}
}