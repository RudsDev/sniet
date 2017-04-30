package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.Gson;

@Entity
@Table(name="FendasBranquiais")
public class FendasBranquiais {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="idFendaBranquial")
	private Integer idFendaBranquial;

	@Column(name="qtdFendasBranquiais")
	private Integer qtdFendasBranquiais;

	@Column(name="posicaoFendasBranquiais")
	private String posicaoFendasBranquiais;

	@Column(name="descricaoFendasBranquiais")
	private String descricaoFendasBranquiais;

	public Integer getIdFendaBranquial() {
		return idFendaBranquial;
	}

	public void setIdFendaBranquial(Integer idFendaBranquial) {
		this.idFendaBranquial = idFendaBranquial;
	}

	public Integer getQtdFendasBranquiais() {
		return qtdFendasBranquiais;
	}

	public void setQtdFendasBranquiais(Integer qtdFendasBranquiais) {
		this.qtdFendasBranquiais = qtdFendasBranquiais;
	}

	public String getPosicaoFendasBranquiais() {
		return posicaoFendasBranquiais;
	}

	public void setPosicaoFendasBranquiais(String posicaoFendasBranquiais) {
		this.posicaoFendasBranquiais = posicaoFendasBranquiais;
	}

	public String getDescricaoFendasBranquiais() {
		return descricaoFendasBranquiais;
	}

	public void setDescricaoFendasBranquiais(String descricaoFendasBranquiais) {
		this.descricaoFendasBranquiais = descricaoFendasBranquiais;
	}


	public static FendasBranquiais jsonToFendasBranquiais(String json){
		return new Gson().fromJson(json, FendasBranquiais.class);
	}

	public static String fendasBranquiaisToJson(FendasBranquiais fendasBranquiais){
		return new Gson().toJson(fendasBranquiais);
	}

}
