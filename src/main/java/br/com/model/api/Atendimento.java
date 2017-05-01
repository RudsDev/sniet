package br.com.model.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Atendimento")
public class Atendimento {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="idAtendimento")
	private Integer idAtendimento;

	@Column(name="encaminhamento")
	private String encaminhamento;

	@Column(name="obsAtendimento")
	private String obsAtendimento;

	@Column(name="tempoRecuperacao")
	private Double tempoRecuperacao;

	@Column(name="statusAtendimento")
	private String statusAtendimento;

	
	public Integer getIdAtendimento() {
		return idAtendimento;
	}

	public void setIdAtendimento(Integer idAtendimento) {
		this.idAtendimento = idAtendimento;
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

	public Double getTempoRecuperacao() {
		return tempoRecuperacao;
	}

	public void setTempoRecuperacao(Double tempoRecuperacao) {
		this.tempoRecuperacao = tempoRecuperacao;
	}

	public String getStatusAtendimento() {
		return statusAtendimento;
	}

	public void setStatusAtendimento(String statusAtendimento) {
		this.statusAtendimento = statusAtendimento;
	}

}