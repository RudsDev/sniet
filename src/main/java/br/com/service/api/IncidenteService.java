package br.com.service.api;

import java.util.List;

import br.com.dao.api.IncidenteDao;
import br.com.model.api.Incidente;
import br.com.model.api.Individuo;


public class IncidenteService {

	private IncidenteDao dao;
	private IndividuoService individuoService;
	
	
	public IncidenteService(){
		this.dao = new IncidenteDao();
		this.individuoService = new IndividuoService();
	}
	
	public  Individuo save(Incidente incidente, Individuo individuo){
		
		incidente.exibir();
		incidente.getLocal().exibir();
		individuo.setIncidente(incidente);
		
		Individuo saved = this.individuoService.gravar(individuo);
		
		saved.exibir();
		
		return saved;
	}
	
	public  Incidente searchByID(Integer id){
		return this.dao.getIncidenteById(id);
	}
	
	
	public List<Incidente> searchByLocalNameIncidente(String nomeLocal){
		return this.dao.getIncidenteByNomeLocal(nomeLocal);
	}
	
	
	public  List<Incidente> searchByPeriodo(String dataInicial, String dataFinal){
		//TODO converter para o formato correto de Date aqui
		//return this.dao.getByPeriodo(dataInicial, dataFinal);
		
		return null;
	}
	
	public List<Incidente> getAllIncidentes(){
		return this.dao.buscarTodosInicidentes();
	}
	
	public List<Individuo> getAllIncidentesFull(){
		return this.individuoService.getAllIndividuos();
	}
	
}