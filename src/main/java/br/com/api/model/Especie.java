package br.com.api.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Especie")
public class Especie {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_especie")
	@SequenceGenerator(name = "seq_especie", sequenceName = "seq_especie", initialValue = 1, allocationSize = 1)
	@Column(name = "IDEspecie")
	private Integer idEspecie;
	
	@Column(name = "nomecientifico", length=50)
	private String nomeCientifico;
	
	@Column(name = "descricao", length=200)
	private String descricao;
	
	@JsonIgnore
	@Column(name = "fotopadrao", length=60)
	private String fotoPadrao;
	
	@Column(name = "tammenor", precision=5, scale=2)
	private Double tamMenor;
	
	@Column(name = "tammedio", precision=5, scale=2)
	private Double tamMedio;
	
	@Column(name = "tammaior", precision=5, scale=2)
	private Double tamMaior;
	
	@Column(name = "tammediofilhote", precision=5, scale=2)
	private Double tamMedioFilhote;
	
	@Column (name = "statusextincao", length=1)
	private char extincao;
	
	
	@OneToMany(cascade=CascadeType.ALL)
	private List<Nome> nomes;

	@ManyToOne
	@JoinColumn(name = "codhabitat")
	private Habitat habitat;

	@ManyToOne
	@JoinColumn(name = "codreprod")
	private Reproducao reproducao;

	@ManyToOne
	@JoinColumn(name = "codfocinho")
	private Focinho focinho;

	@ManyToOne
	@JoinColumn(name = "idfamilia")
	private Familia familia;

	@ManyToOne
	@JoinColumn(name = "coddorso")
	private Dorso dorso;

	@ManyToOne
	@JoinColumn(name = "codventre")
	private Ventre ventre;

	@ManyToOne
	@JoinColumn(name = "coddenticao")
	private Denticao denticao;

	@ManyToOne
	@JoinColumn(name = "codbarbatana")
	private Barbatana Barbatana;

	public Especie() {
		
	}

	@Override
	public String toString() {
		return "Especie [idEspecie=" + idEspecie + ", nomeCientifico=" + nomeCientifico + ", descricao=" + descricao
				+ ", fotoPadrao=" + ", tamMenor=" + tamMenor + ", tamMedio=" + tamMedio + ", tamMaior="
				+ tamMaior + ", tamMedioFilhote=" + tamMedioFilhote + ", habitat=" + habitat + ", reproducao="
				+ reproducao + ", focinho=" + focinho + ", familia=" + familia + ", dorso=" + dorso + ", ventre="
				+ ventre + ", denticao=" + denticao + ", Barbatana=" + Barbatana + "]";
	}

	public Integer getIdEspecie() {
		return idEspecie;
	}

	public void setIdEspecie(Integer idEspecie) {
		this.idEspecie = idEspecie;
	}

	public String getNomeCientifico() {
		return nomeCientifico;
	}

	public void setNomeCientifico(String nomeCientifico) {
		this.nomeCientifico = nomeCientifico;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Double getTamMenor() {
		return tamMenor;
	}

	public void setTamMenor(Double tamMenor) {
		this.tamMenor = tamMenor;
	}

	public Double getTamMedio() {
		return tamMedio;
	}

	public void setTamMedio(Double tamMedio) {
		this.tamMedio = tamMedio;
	}

	public Double getTamMaior() {
		return tamMaior;
	}

	public void setTamMaior(Double tamMaior) {
		this.tamMaior = tamMaior;
	}

	public Double getTamMedioFilhote() {
		return tamMedioFilhote;
	}

	public void setTamMedioFilhote(Double tamMedioFilhote) {
		this.tamMedioFilhote = tamMedioFilhote;
	}

	public char getExtincao() {
		return extincao;
	}

	public void setExtincao(char extincao) {
		this.extincao = extincao;
	}

	public Habitat getHabitat() {
		return habitat;
	}

	public void setHabitat(Habitat habitat) {
		this.habitat = habitat;
	}

	public Reproducao getReproducao() {
		return reproducao;
	}

	public void setReproducao(Reproducao reproducao) {
		this.reproducao = reproducao;
	}

	public Focinho getFocinho() {
		return focinho;
	}

	public void setFocinho(Focinho focinho) {
		this.focinho = focinho;
	}

	public Familia getFamilia() {
		return familia;
	}

	public void setFamilia(Familia familia) {
		this.familia = familia;
	}

	public Dorso getDorso() {
		return dorso;
	}

	public void setDorso(Dorso dorso) {
		this.dorso = dorso;
	}

	public Ventre getVentre() {
		return ventre;
	}

	public void setVentre(Ventre ventre) {
		this.ventre = ventre;
	}

	public Denticao getDenticao() {
		return denticao;
	}

	public void setDenticao(Denticao denticao) {
		this.denticao = denticao;
	}

	public Barbatana getBarbatana() {
		return Barbatana;
	}

	public void setBarbatana(Barbatana barbatana) {
		Barbatana = barbatana;
	}

	public List<Nome> getNomes() {
		return nomes;
	}

	public void setNomes(List<Nome> nomes) {
		this.nomes = nomes;
	}
	
	public String getFotoPadrao() {
		return fotoPadrao;
	}

	public void setFotoPadrao(String fotoPadrao) {
		this.fotoPadrao = fotoPadrao;
	}}

	