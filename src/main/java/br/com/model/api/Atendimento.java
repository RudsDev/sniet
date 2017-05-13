package br.com.model.api;

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
@Table(name = "ATENDIMENTO")
public class Atendimento {
	
	
	@Id 
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_atendimento")
	@SequenceGenerator(name = "seq_atendimento", sequenceName = "seq_atendimento", initialValue = 1, allocationSize = 1)
	@Column(name="IDAtendimento")
	private Integer id;

	@OneToOne
	@JoinColumn(name="IDIndividuo")
	private Individuo individuo;
	
	@OneToOne
	@JoinColumn(name="IDIncidente")
	private Incidente incidente;
	
	@Column(name="Encaminhamento", length=50)
	private String encaminhamento;
	
	@Column(name="OBSAtendimento", length=200)
	private String obsAtendimento;
	
	@Column(name="TempoRecuperacao", length=3)
	private Integer tempoDeRecuperacao;
	
	@Column(name="StatusAtendimento", length=1)
	private char statusAtendimento;
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Individuo getIndividuo() {
		return individuo;
	}
	public void setIndividuo(Individuo individuo) {
		this.individuo = individuo;
	}
	public String getEncaminhamento() {
		return encaminhamento;
	}
	public void setEncaminhamento(String encaminhamento) {
		this.encaminhamento = encaminhamento;
	}
	public String getObsAtendimento() {
		return obsAtendimento;
	}
	public void setObsAtendimento(String obsAtendimento) {
		this.obsAtendimento = obsAtendimento;
	}
	public Integer getTempoDeRecuperacao() {
		return tempoDeRecuperacao;
	}
	public void setTempoDeRecuperacao(Integer tempoDeRecuperacao) {
		this.tempoDeRecuperacao = tempoDeRecuperacao;
	}
	public char getStatusAtendimento() {
		return statusAtendimento;
	}
	public void setStatusAtendimento(char statusAtendimento) {
		this.statusAtendimento = statusAtendimento;
	}
	public Incidente getIncidente() {
		return incidente;
	}
	public void setIncidente(Incidente incidente) {
		this.incidente = incidente;
	}
}
