package br.com.model.api;

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
@Table(name="Tubarao")
public class Tubarao {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq_tubarao")
	@SequenceGenerator(
		    name="seq_tubarao",
		    sequenceName="seq_tubarao",
		    initialValue=1,
		    allocationSize=1)
	@Column(name="IdTubarao")
	private Integer idTubarao;
	
	@Column(name = "Comprimento",precision=4, scale=2,
			columnDefinition="Decimal(4,2) default '0.00'")
	private Double comprimento;
	
	@Column(name="Sexo", length=1)
	private String sexo;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "IDEspecie")
	private Especie especie;
	
	public Integer getIdTubarao() {
		return idTubarao;
	}
	public void setIdTubarao(Integer idTubarao) {
		this.idTubarao = idTubarao;
	}
	public Double getComprimento() {
		return comprimento;
	}
	public void setComprimento(Double comprimento) {
		this.comprimento = comprimento;
	}
	public String getSexo() {
		return sexo;
	}
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	public Especie getEspecie() {
		return especie;
	}
	public void setEspecie(Especie especie) {
		this.especie = especie;
	}
}
