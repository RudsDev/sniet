package br.com.model.api;

import javax.persistence.CascadeType;
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
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="IDEndereco")
	private Endereco endereco;
	
	@Column(name="NomeInstituicao", length=50)
	private String nome;
	
	@Column(name="Registro", length=20)
	private String registro;
	
	@Column(name="Tipo_instituicao", length=20)
	private String tipoInstituicao;
	
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

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	public String getTipoInstituicao() {
		return tipoInstituicao;
	}

	public void setTipoInstituicao(String tipoInstituicao) {
		this.tipoInstituicao = tipoInstituicao;
	}
	
	public void exibir(){
		System.out.println("Registro: " +  this.getRegistro());
		System.out.println("Tipo Instituicao: " +  this.getTipoInstituicao());
		System.out.println("Instituicao: " +  this.getNome());
	}
}