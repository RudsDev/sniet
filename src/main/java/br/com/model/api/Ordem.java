package br.com.model.api;

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
@Table(name = "Ordem")
public class Ordem {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_ordem")
	@SequenceGenerator(name = "seq_ordem", sequenceName = "seq_ordem", initialValue = 1, allocationSize = 1)
	@Column(name = "IDOrdem")
	private Integer idOrdem;
	
	@Column(name = "NomeOrdem", length=20)
	private String nomeOrdem;
	
	@Column(name = "DescOrdem", length=500)
	private String descOrdem;
	
	@Column(name = "MembranaNictante", length=30)
	private  String membranaNictante;
	
	@Column(name = "CorpoAchatado", length=30)
	private String corpoAchatado;
	
	@Column(name = "PosicaoBoca", length=30)
	private String posicaoBoca;
	
	@ManyToOne
	@JoinColumn(name="CodBarbPeitoral")
	private BarbPeitoral barbPeitoral;
	
	@ManyToOne
	@JoinColumn(name="CodBarbDorsal")
	private BarbDorsal barbDorsal;
	
	@ManyToOne
	@JoinColumn(name="CodBarbAnal")
	private BarbAnal barbAnal;
	
	@ManyToOne
	@JoinColumn(name="CodBarbCaudal")
	private BarbCaudal barbCaudal;
	
	
	


	public Ordem() {
	
	}


	public Integer getIdOrdem() {
		return idOrdem;
	}


	public void setIdOrdem(Integer idOrdem) {
		this.idOrdem = idOrdem;
	}


	public String getNomeOrdem() {
		return nomeOrdem;
	}


	public void setNomeOrdem(String nomeOrdem) {
		this.nomeOrdem = nomeOrdem;
	}


	public String getDescOrdem() {
		return descOrdem;
	}


	public void setDescOrdem(String descOrdem) {
		this.descOrdem = descOrdem;
	}


	public String getMembranaNictante() {
		return membranaNictante;
	}


	public void setMembranaNictante(String membranaNictante) {
		this.membranaNictante = membranaNictante;
	}


	public String getCorpoAchatado() {
		return corpoAchatado;
	}


	public void setCorpoAchatado(String corpoAchatado) {
		this.corpoAchatado = corpoAchatado;
	}


	public String getPosicaoBoca() {
		return posicaoBoca;
	}


	public void setPosicaoBoca(String posicaoBoca) {
		this.posicaoBoca = posicaoBoca;
	}


	public BarbPeitoral getBarbPeitoral() {
		return barbPeitoral;
	}


	public void setBarbPeitoral(BarbPeitoral barbPeitoral) {
		this.barbPeitoral = barbPeitoral;
	}


	public BarbDorsal getBarbDorsal() {
		return barbDorsal;
	}


	public void setBarbDorsal(BarbDorsal barbDorsal) {
		this.barbDorsal = barbDorsal;
	}


	public BarbAnal getBarbAnal() {
		return barbAnal;
	}


	public void setBarbAnal(BarbAnal barbAnal) {
		this.barbAnal = barbAnal;
	}


	public BarbCaudal getBarbCaudal() {
		return barbCaudal;
	}


	public void setBarbCaudal(BarbCaudal barbCaudal) {
		this.barbCaudal = barbCaudal;
	}
		
}