package br.com.api.service;

import java.util.List;

import br.com.api.dao.EspecieDao;
import br.com.api.model.Especie;
import br.com.api.persist.JPAUtil;

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

	public Especie save(Especie especie) {
		
		Especie especieSave = null;
		
		try {
			JPAUtil.beginTransaction();
			especieSave = this.dao.gravar(especie);
			JPAUtil.commitTransaction();
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();			
		}
		finally {
			JPAUtil.closeEntityManager();
		}
		
		return especieSave;
	}
	
}