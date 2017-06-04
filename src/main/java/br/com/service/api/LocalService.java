package br.com.service.api;

import java.util.List;

import br.com.dao.api.LocalDao;
import br.com.model.api.Local;


public class LocalService {
	
	private LocalDao localDao;
	
	public LocalService(){
		this.localDao = new LocalDao();
	}
	
	public List<Local> getLocalByName(String nomeLocal){
		
		return this.localDao.getLocalByName(nomeLocal);
	}

}
