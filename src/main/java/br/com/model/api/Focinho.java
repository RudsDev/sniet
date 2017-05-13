package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="Focinho")
public class Focinho {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq_focinho")
	@SequenceGenerator(
		    name="seq_focinho",
		    sequenceName="seq_focinho",
		    initialValue=1,
		    allocationSize=1)
	@Column(name="CodFocinho")
	private Integer codFocinho;
	
	@Column(name="TipoFocinho", length=30)
	private String tipoFocinho;
	
	@Column(name="DescFocinho", length=200)
	private String descFocinho;
	
	
	public Focinho() {
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public String toString() {
		return "Focinho [codFocinho=" + codFocinho + ", tipoFocinho=" + tipoFocinho + ", descFocinho=" + descFocinho
				+ "]";
	}

	public Integer getCodFocinho() {
		return codFocinho;
	}
	public void setCodFocinho(Integer codFocinho) {
		this.codFocinho = codFocinho;
	}
	public String getTipoFocinho() {
		return tipoFocinho;
	}
	public void setTipoFocinho(String tipoFocinho) {
		this.tipoFocinho = tipoFocinho;
	}
	public String getDescFocinho() {
		return descFocinho;
	}
	public void setDescFocinho(String descFocinho) {
		this.descFocinho = descFocinho;
	}
}
