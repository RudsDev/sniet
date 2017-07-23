package br.com.api.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="Nome")
public class Nome {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq_nome")
	@SequenceGenerator(
		    name="seq_nome",
		    sequenceName="seq_nome",
		    initialValue=1,
		    allocationSize=1)
	@Column(name="IDNome")
	private Integer idNome;
	
	@Column(name="NomePopular", length=30)
	private String nomePopular;
	
	@Column(name="UF", length=2)
	private String uf;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name="IDEspecie")
	private Especie especie;
	
	
	public Integer getIdNome() {
		return idNome;
	}
	public void setIdNome(Integer idNome) {
		this.idNome = idNome;
	}
	public String getNomePopular() {
		return nomePopular;
	}
	public void setNomePopular(String nomePopular) {
		this.nomePopular = nomePopular;
	}
	public String getUf() {
		return uf;
	}
	public void setUf(String uf) {
		this.uf = uf;
	}
	public Especie getEspecie() {
		return especie;
	}
	public void setEspecie(Especie especie) {
		this.especie = especie;
	}
}
