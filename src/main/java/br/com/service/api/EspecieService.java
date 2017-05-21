package br.com.service.api;

import java.util.List;

import br.com.dao.api.EspecieDao;
import br.com.model.api.Especie;

public class EspecieService {
	
	private EspecieDao dao;
	
	
	public EspecieService(){
		this.dao = new EspecieDao();
	}
	
	public  Especie searchByID(Integer id){
		return this.dao.getEspecieById(id);
	}
	
	public  Especie searchByNomeCientifico(String nomeCientifico){
		return this.dao.getEspecieByNomeCientifico(nomeCientifico);
	}
	
	public List<Especie> getAllEspecies(){
		return this.dao.buscarTodasAsEspecies();
	}
	
}
