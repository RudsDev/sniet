package br.com.api.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.google.gson.JsonObject;

import br.com.api.dao.IncidenteDao;
import br.com.api.model.Incidente;
import br.com.api.model.Individuo;
import br.com.api.persist.JPAUtil;
import br.com.api.util.Util;


public class IncidenteService {

	private IncidenteDao dao;
	private IndividuoService individuoService;
	
	
	public IncidenteService(){
		this.dao = new IncidenteDao();
		this.individuoService = new IndividuoService();
	}
	
	/*public  Individuo save(Incidente incidente, Individuo individuo){
		
		try {
			JPAUtil.beginTransaction();
			
			JPAUtil.commitTransaction();
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();			
		}
		finally {
			JPAUtil.closeEntityManager();
		}		
		
		incidente.exibir();
		incidente.getLocal().exibir();
		individuo.setIncidente(incidente);
		
		Individuo saved = this.individuoService.gravar(individuo);
		
		saved.exibir();
		
		return saved;
	}*/

	public  Individuo save(Incidente incidente, Individuo individuo){
		
		//TODO Refatorar usando lado forte e fraco.
		
		Individuo saved = null;
		individuo.setIncidente(incidente);
		
		try {
			JPAUtil.beginTransaction();
			saved = this.individuoService.gravar(individuo);
			JPAUtil.commitTransaction();
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();			
		}
		finally {
			JPAUtil.closeEntityManager();
		}		
		return saved;
	}
	
	public  Incidente searchByID(Integer id){

		Incidente incidente = null;
		
		try {
			JPAUtil.beginTransaction();
			incidente = this.dao.getIncidenteById(id);
			JPAUtil.commitTransaction();
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();			
		}
		finally {
			JPAUtil.closeEntityManager();
		}
		
		return incidente;
	}
	
	
	public List<Incidente> searchByLocalNameIncidente(String nomeLocal){
		
		List<Incidente> incidentes = null;
		
		try {
			JPAUtil.beginTransaction();
			incidentes = this.dao.getIncidenteByNomeLocal(nomeLocal);
			JPAUtil.commitTransaction();
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();			
		}
		finally {
			JPAUtil.closeEntityManager();
		}		
		
		return incidentes;
	}
	
	
	public  List<Incidente> searchByPeriodo(String dataInicial, String dataFinal){
		//TODO converter para o formato correto de Date aqui
		//return this.dao.getByPeriodo(dataInicial, dataFinal);
		
		try {
			JPAUtil.beginTransaction();
			
			JPAUtil.commitTransaction();
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();			
		}
		finally {
			JPAUtil.closeEntityManager();
		}		
		
		return null;
	}
	
	public List<Incidente> getAllIncidentes(){
		
		List<Incidente> incidentes = null;
		
		try {
			JPAUtil.beginTransaction();
			incidentes = this.dao.buscarTodosInicidentes();
			JPAUtil.commitTransaction();
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();			
		}
		finally {
			JPAUtil.closeEntityManager();
		}		
		
		return incidentes;
	}
	
	public List<Individuo> getAllIncidentesFull(){
		
		List<Individuo> individuos = null;
		
		try {
			JPAUtil.beginTransaction();
			individuos = this.individuoService.getAllIndividuos();
			JPAUtil.commitTransaction();
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();			
		}
		finally {
			JPAUtil.closeEntityManager();
		}		
		
		return individuos;
	}

	
	public Incidente update(Incidente incidente) {
	
		Incidente incidenteUpdate = null;
		
		try {
			JPAUtil.beginTransaction();
			incidenteUpdate = this.dao.atualizar(incidente);
			JPAUtil.commitTransaction();
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();			
		}
		finally {
			JPAUtil.closeEntityManager();
		}		
		
		return incidenteUpdate;
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
	
}