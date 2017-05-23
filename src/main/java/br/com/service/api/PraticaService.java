package br.com.service.api;

import br.com.dao.api.PraticaDao;
import br.com.model.api.Pratica;

public class PraticaService {
	
	private PraticaDao praticaDao;
	
	public PraticaService(){
		this.praticaDao = new PraticaDao();
	}
	
	public void gravar(Pratica pratica){
		this.praticaDao.gravar(pratica);
	}

}
