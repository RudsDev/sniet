package br.com.model.api;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.Gson;

@Entity
@Table(name="Fonte")
public class Fonte {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="idFonte")
	private Integer idFonte;
	
	@Column(name="descFonte")
	private String descFonte;
	
	@Column(name="dataPublicacao")
	private Date dataPublicacao;
	
	@Column(name="obsFonte")
	private String obsFonte;
	
	@Column(name="tipoFonte")
	private String tipoFonte;
	
		
	public Integer getIdFonte() {
		return idFonte;
	}

	public void setIdFonte(Integer idFonte) {
		this.idFonte = idFonte;
	}

	public String getDescFonte() {
		return descFonte;
	}

	public void setDescFonte(String descFonte) {
		this.descFonte = descFonte;
	}

	public Date getDataPublicacao() {
		return dataPublicacao;
	}

	public void setDataPublicacao(Date dataPublicacao) {
		this.dataPublicacao = dataPublicacao;
	}

	public String getObsFonte() {
		return obsFonte;
	}

	public void setObsFonte(String obsFonte) {
		this.obsFonte = obsFonte;
	}

	public String getTipoFonte() {
		return tipoFonte;
	}

	public void setTipoFonte(String tipoFonte) {
		this.tipoFonte = tipoFonte;
	}

	
	public static Fonte jsonToFonte(String json){
		return new Gson().fromJson(json, Fonte.class);
	}

	public static String fonteToJson(Fonte fonte){
		return new Gson().toJson(fonte);
	}
}