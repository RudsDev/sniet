package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Nome")
public class Nome {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="idNome")
	private Integer idNome;

	@Column(name="nomePopular")
	private String nomePopular;

	@Column(name="cidade")
	private String cidade;

	@Column(name="uf")
	private String uf;


	public Integer getIDNome() {
		return idNome;
	}

	public void setIDNome(Integer idNome) {
		this.idNome = idNome;
	}

	public String getNomePopular() {
		return nomePopular;
	}

	public void setNomePopular(String nomePopular) {
		this.nomePopular = nomePopular;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getUF() {
		return uf;
	}

	public void setUF(String uf) {
		this.uf = uf;
	}

}
