package br.com.service.api;

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

}
