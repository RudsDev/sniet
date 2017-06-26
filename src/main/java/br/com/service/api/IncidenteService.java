package br.com.service.api;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.google.gson.JsonObject;

import br.com.dao.api.IncidenteDao;
import br.com.model.api.Incidente;
import br.com.model.api.Individuo;
import br.com.util.api.Util;


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
	
	public Incidente convertToIncidenteObject(String incidenteWrapperJson){
		
		JsonObject jsonObj = Util.getParser().parse(incidenteWrapperJson).getAsJsonObject();
		JsonObject incidente = jsonObj.get("incidente").getAsJsonObject();
		
		String dataIncidente = incidente.get("dataIncidente").getAsString();

		incidente.addProperty("dataIncidente", "0");
		
		Incidente incidenteObj = (Incidente)Util.jsonToObject(incidente.toString(), Incidente.class);
		
		incidenteObj.exibir();
		
		incidenteObj.setDataIncidente(this.convertData(dataIncidente));
		
		
		System.out.println(incidente.get("dataIncidente").getAsString());
		return incidenteObj;
	}
	
	private Date convertData(String data){
		SimpleDateFormat formato = new SimpleDateFormat("dd/MM/yyyy");
		
		try {
			return formato.parse(data);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}

	public Incidente update(Incidente incidente) {
		return this.dao.atualizar(incidente);
	}
	
}