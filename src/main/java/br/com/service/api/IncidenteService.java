package br.com.service.api;

import java.util.Date;
import java.util.List;
import br.com.dao.api.IncidenteDao;
import br.com.model.api.Incidente;


public class IncidenteService {

	private IncidenteDao dao;
	
	
	public IncidenteService(){
		this.dao = new IncidenteDao();
	}
	
	public  Incidente searchByID(Integer id){
		return this.dao.getIncidenteById(id);
	}
	
	//TODO converter para o formato correto de Date aqui
	public  List<Incidente> searchByPeriodo(Date dataInicial, Date dataFinal){
		return this.dao.getByPeriodo(dataInicial, dataFinal);
	}
	
	public List<Incidente> getAllIncidentes(){
		return this.dao.buscarTodosInicidentes();
	}
	
}