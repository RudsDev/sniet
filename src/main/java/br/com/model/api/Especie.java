package br.com.model.api;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Especie")
public class Especie {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_especie")
	@SequenceGenerator(name = "seq_especie", sequenceName = "seq_especie", initialValue = 1, allocationSize = 1)
	@Column(name = "IDEspecie")
	private Integer idEspecie;
	
	@Column(name = "NomeCientifico", length=50)
	private String nomeCientifico;
	
	@Column(name = "Descricao", length=200)
	private String descricao;
	
	@Column(name = "TamMenor", precision=5, scale=2)
	private Double tamMenor;
	
	@Column(name = "TamMedio", precision=5, scale=2)
	private Double tamMedio;
	
	@Column(name = "TamMaior", precision=5, scale=2)
	private Double tamMaior;
	
	@Column(name = "TamMedioFilhote", precision=5, scale=2)
	private Double tamMedioFilhote;
	
	@Column (name = "StatusExtincao", length=1)
	private String extincao;
	
	
	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
	private List<Nome> nomes;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "CodHabitat")
	private Habitat habitat;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "CodReprod")
	private Reproducao reproducao;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "CodFocinho")
	private Focinho focinho;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "IdFamilia")
	private Familia familia;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "CodDorso")
	private Dorso dorso;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "CodVentre")
	private Ventre ventre;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "CodDenticao")
	private Denticao denticao;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "CodBarbatana")
	private Barbatana Barbatana;

	public Especie() {
		// TODO Auto-generated constructor stub
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

	public String getExtincao() {
		return extincao;
	}

	public void setExtincao(String extincao) {
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
	
	
	public void exibir(){
		System.out.println("Objeto: " +  this);
		System.out.println("ID: " +  this.getIdEspecie());
		System.out.println("Nome: " +  this.getNomeCientifico());
		System.out.println("Tamanho Medio: " +  this.getTamMedio());
		System.out.println("Descricao: " +  this.getDescricao());
	}

}
