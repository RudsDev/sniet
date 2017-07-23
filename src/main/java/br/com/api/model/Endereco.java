package br.com.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity 
@Table(name="Endereco")
public class Endereco {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE,
					generator="seq_endereco")
	@SequenceGenerator(
		    name="seq_endereco",
		    sequenceName="seq_endereco",
		    initialValue=1,
		    allocationSize=1)
	@Column(name="IDEndereco")
	private Integer id;

	@Column(name="Pais", length=50)
	private String pais;
	
	@Column(name="UF", length=50)
	private String uf;
	
	@Column(name="Cidade", length=50)
	private String cidade;
	
	@Column(name="Bairro", length=50)
	private String bairro;
	
	@Column(name="Numero", length=50)
	private String numero;
	
	@Column(name="Tipo_logradouro", length=50)
	private String tipoLogradouro;
	
	@Column(name="Logradouro", length=50)
	private String logradouro;
	
	@Column(name="cep", length=50)
	private String cep;
	
	
	public Endereco(){

	}	
	
	public Endereco(String pais, String uf, String cidade, 
			String bairro, String numero, String tipoLogradouro,
			String logradouro, String cep) {
		this.pais = pais;
		this.uf = uf;
		this.cidade = cidade;
		this.bairro = bairro;
		this.numero = numero;
		this.tipoLogradouro = tipoLogradouro;
		this.logradouro = logradouro;
		this.cep = cep;
	}

	public String getPais() {
		return pais;
	}

	public void setPais(String pais) {
		this.pais = pais;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getTipoLogradouro() {
		return tipoLogradouro;
	}

	public void setTipoLogradouro(String tipoLogradouro) {
		this.tipoLogradouro = tipoLogradouro;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}
	
	
	public void exibir(){
		System.out.println("Pais: " +  this.getPais());
		System.out.println("UF: " +  this.getUf());
		System.out.println("Cidade: " +  this.getCidade());
		System.out.println("Bairro: " +  this.getBairro());
		System.out.println("Tipo: " +  this.getTipoLogradouro());
		System.out.println("Logradouro: " +  this.getLogradouro());
		System.out.println("Num: " + this.getNumero());
		System.out.println("CEP: " + this.getCep());
	}

	
}
