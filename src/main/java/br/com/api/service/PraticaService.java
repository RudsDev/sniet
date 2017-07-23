package br.com.api.service;

import br.com.api.dao.PraticaDao;
import br.com.api.model.Pratica;

public class PraticaService {
	
	private PraticaDao praticaDao;
	
	public PraticaService(){
		this.praticaDao = new PraticaDao();
	}
	
	public void gravar(Pratica pratica){
		this.praticaDao.gravar(pratica);
	}

}
