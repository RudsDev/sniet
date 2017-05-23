package br.com.service.api;

import br.com.dao.api.IndividuoDao;
import br.com.model.api.Individuo;

public class IndividuoService {
	
	
	private IndividuoDao individuoDao;
	
	public IndividuoService(){
		this.individuoDao = new IndividuoDao();
	}
	
	public void gravar(Individuo individuo){
		this.individuoDao.gravar(individuo);
	}

}
