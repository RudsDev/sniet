package br.com.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Familia")
public class Familia {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_familia")
	@SequenceGenerator(name = "seq_familia", sequenceName = "seq_familia", initialValue = 1, allocationSize = 1)
	@Column(name = "idfamilia")
	private Integer idFamilia;
	
	@Column(name = "nomefamilia", length=50)
	private String nomeFamilia;
	
	@Column(name = "descfamilia", length=500)
	private String descFamilia;
	
	@ManyToOne
	@JoinColumn(name = "idfendabranquial")
	private FendasBranquiais fendasBranquiais; 
	
	@ManyToOne
	@JoinColumn(name = "idordem")
	private Ordem ordem; 
	
	public Integer getIdFamilia() {
		return idFamilia;
	}

	public void setIdFamilia(Integer idFamilia) {
		this.idFamilia = idFamilia;
	}

	public String getNomeFamilia() {
		return nomeFamilia;
	}

	public void setNomeFamilia(String nomeFamilia) {
		this.nomeFamilia = nomeFamilia;
	}

	public String getDescFamilia() {
		return descFamilia;
	}

	public void setDescFamilia(String descFamilia) {
		this.descFamilia = descFamilia;
	}

	public FendasBranquiais getFendasBranquiais() {
		return fendasBranquiais;
	}

	public void setFendasBranquiais(FendasBranquiais fendasBranquiais) {
		this.fendasBranquiais = fendasBranquiais;
	}

	public Ordem getOrdem() {
		return ordem;
	}

	public void setOrdem(Ordem ordem) {
		this.ordem = ordem;
	}

}