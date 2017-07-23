package br.com.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="HABITAT")
public class Habitat {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq_habitat")
	@SequenceGenerator(
		    name="seq_habitat",
		    sequenceName="seq_habitat",
		    initialValue=1,
		    allocationSize=1)
	@Column(name="CodHabitat")
	private Integer codHabitat;
	
	@Column(name="DescHabitat", length=50)
	private String descHabitat;
	
	public Habitat() {
		// TODO Auto-generated constructor stub
	}
	
	
	@Override
	public String toString() {
		return "Habitat [codHabitat=" + codHabitat + ", descHabitat=" + descHabitat + "]";
	}


	public Integer getCodHabitat() {
		return codHabitat;
	}
	public void setCodHabitat(Integer codHabitat) {
		this.codHabitat = codHabitat;
	}
	public String getDescHabitat() {
		return descHabitat;
	}
	public void setDescHabitat(String descHabitat) {
		this.descHabitat = descHabitat;
	}
}
