package br.com.service.api;

import java.util.List;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import br.com.dao.api.IndividuoDao;
import br.com.model.api.Individuo;
import br.com.util.api.Util;

public class IndividuoService {
	
	private static final JsonParser parser = new JsonParser();
	
	private IndividuoDao individuoDao;
	
	public IndividuoService(){
		this.individuoDao = new IndividuoDao();
	}
	
	public Individuo gravar(Individuo individuo){
		return this.individuoDao.gravar(individuo);
	}
	
	
	public List<Individuo> getAllIndividuos(){
		return this.individuoDao.buscarTodosIndividuos();
	}
	
	public Individuo convertToIndividuoObject(String incidenteWrapperJson){
		
		JsonObject jsonObj = parser.parse(incidenteWrapperJson).getAsJsonObject();
		JsonObject individuoJson = jsonObj.get("individuo").getAsJsonObject();
		
		Individuo individuo = (Individuo)Util.jsonToObject(individuoJson.toString(), Individuo.class);

		return individuo;
	}

}
