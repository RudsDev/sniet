package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity 
@Table(name="instituicao")
public class Instituicao {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq_instituicao")
	@SequenceGenerator(
		    name="seq_instituicao",
		    sequenceName="seq_instituicao",
		    initialValue=1,
		    allocationSize=1)
	@Column(name="IDInst")
	private Integer id;
	
	@Column(name="NomeInstituicao", length=50)
	private String nome;
	
	@Column(name="Registro", length=20)
	private String registro;
	
	
	public Instituicao(){
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getRegistro() {
		return registro;
	}

	public void setRegistro(String registro) {
		this.registro = registro;
	}
}