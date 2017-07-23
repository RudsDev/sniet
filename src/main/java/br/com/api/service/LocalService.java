package br.com.api.service;

import java.util.List;

import br.com.api.dao.LocalDao;
import br.com.api.model.Local;


public class LocalService {
	
	private LocalDao localDao;
	
	public LocalService(){
		this.localDao = new LocalDao();
	}
	
	public List<Local> getLocalByName(String nomeLocal){
		
		return this.localDao.getLocalByName(nomeLocal);
	}

}
