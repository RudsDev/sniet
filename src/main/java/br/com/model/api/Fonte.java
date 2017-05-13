package br.com.model.api;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "FONTE")
public class Fonte {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_fonte")
	@SequenceGenerator(name = "seq_fonte", sequenceName = "seq_fonte", initialValue = 1, allocationSize = 1)
	@Column(name="IDFonte")
	private Integer id;
	
	@OneToOne
	@JoinColumn(name="IDIncidente")
	private Incidente incidente;
	
	@Column(name="DescFonte", length=100)
	private String descricaoFonte;
	
	@Column(name="DataPublicacao")
	private Date dataPublicacao;
	
	@Column(name="OBSFonte", length=100)
	private String obsFonte;
	
	@Column(name="TipoFonte", length=1)
	private String tipoFonte;
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Incidente getIncidente() {
		return incidente;
	}
	public void setIncidente(Incidente incidente) {
		this.incidente = incidente;
	}
	public String getDescricaoFonte() {
		return descricaoFonte;
	}
	public void setDescricaoFonte(String descricaoFonte) {
		this.descricaoFonte = descricaoFonte;
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
	public Date getDataPublicacao() {
		return dataPublicacao;
	}
	public void setDataPublicacao(Date dataPublicacao) {
		this.dataPublicacao = dataPublicacao;
	}

}
