package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="Reproducao")
public class Reproducao {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq_reproducao")
	@SequenceGenerator(
		    name="seq_reproducao",
		    sequenceName="seq_reproducao",
		    initialValue=1,
		    allocationSize=1)
	@Column(name="CodReprod")
	private Integer codReproducao;
	
	@Column(name="TipoReprod", length=20)
	private String tipoReproducao;
	
	
	public Reproducao() {
		// TODO Auto-generated constructor stub
	}
	
	
	@Override
	public String toString() {
		return "Reproducao [codReproducao=" + codReproducao + ", tipoReproducao=" + tipoReproducao + "]";
	}


	public Integer getCodReproducao() {
		return codReproducao;
	}
	public void setCodReproducao(Integer codReproducao) {
		this.codReproducao = codReproducao;
	}
	public String getTipoReproducao() {
		return tipoReproducao;
	}
	public void setTipoReproducao(String tipoReproducao) {
		this.tipoReproducao = tipoReproducao;
	}
}
