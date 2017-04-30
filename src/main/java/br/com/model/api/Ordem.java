package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.Gson;

@Entity
@Table(name="Ordem")
public class Ordem {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="idOrdem")
	private Integer idOrdem;

	@Column(name="nomeOrdem")
	private String nomeOrdem;

	@Column(name="descOrdem")
	private String descOrdem;

	@Column(name="membranaNictante")
	private String membranaNictante;

	@Column(name="corpoAchatado")
	private String corpoAchatado;

	@Column(name="posicaoBoca")
	private String posicaoBoca;


	public Integer getIdOrdem() {
		return idOrdem;
	}

	public void setIdOrdem(Integer idOrdem) {
		this.idOrdem = idOrdem;
	}

	public String getNomeOrdem() {
		return nomeOrdem;
	}

	public void setNomeOrdem(String nomeOrdem) {
		this.nomeOrdem = nomeOrdem;
	}

	public String getDescOrdem() {
		return descOrdem;
	}

	public void setDescOrdem(String descOrdem) {
		this.descOrdem = descOrdem;
	}

	public String getMembranaNictante() {
		return membranaNictante;
	}

	public void setMembranaNictante(String membranaNictante) {
		this.membranaNictante = membranaNictante;
	}

	public String getCorpoAchatado() {
		return corpoAchatado;
	}

	public void setCorpoAchatado(String corpoAchatado) {
		this.corpoAchatado = corpoAchatado;
	}

	public String getPosicaoBoca() {
		return posicaoBoca;
	}

	public void setPosicaoBoca(String posicaoBoca) {
		this.posicaoBoca = posicaoBoca;
	}


	public static Ordem jsonToOrdem(String json){
		return new Gson().fromJson(json, Ordem.class);
	}

	public static String ordemToJson(Ordem ordem){
		return new Gson().toJson(ordem);
	}
}
