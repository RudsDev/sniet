package br.com.service.api;

import java.util.List;

import br.com.dao.api.IndividuoDao;
import br.com.model.api.Individuo;

public class IndividuoService {
	
	
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

}
