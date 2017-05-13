package br.com.model.api;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
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
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="IDEspecie")
	private Especie especie;

	@OneToMany(cascade=CascadeType.ALL)
	private List<Pais> pais;

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

}
