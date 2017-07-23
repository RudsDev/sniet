package br.com.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "FendasBranquiais")
public class FendasBranquiais {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_fendasbranquiais")
	@SequenceGenerator(name = "seq_fendasbranquiais", sequenceName = "seq_fendasbranquiais", initialValue = 1, allocationSize = 1)

	@Column(name = "IDFendasBranquiais")
	private Integer id;
	
	@Column(name = "QtdFendasBranquiais", length=15)
	private Integer qtdFendasBranquiais;
	
	@Column(name = "PosicaoFendasBranquiais", length=15)
	private String posicaoFendasBranquiais;
	
	@Column(name = "DescricaoFendasBranquiais", length=200)
	private String descricaoFendasBranquiais;

	public FendasBranquiais() {
		// TODO Auto-generated constructor stub
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

}
