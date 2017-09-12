package br.com.api.service;

import java.util.List;

import javax.el.MethodNotFoundException;

import br.com.api.dao.DaoInterface;
import br.com.api.model.Usuario;
import br.com.api.persist.JPAUtil;

public interface GenericService {
	
	
	public default Object save(DaoInterface dao,Object object){
		
		Usuario objectSave = null;
		
		try {
			JPAUtil.beginTransaction();
			objectSave = (Usuario) dao
					.save(JPAUtil.getEntityManager(), object);
			JPAUtil.commitTransaction();
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();			
		}
		finally {
			JPAUtil.closeEntityManager();
		}
		
		return objectSave;
	}
	
	
	public default List<?> getAll(DaoInterface dao,Class<?> classType){
		
		List<?> list = null;
		
		try {
			JPAUtil.beginTransaction();
			list =  (List<?>) dao
					.searchAll(JPAUtil.getEntityManager(), classType);
			JPAUtil.commitTransaction();
			return list;
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();
		}
		finally {
			JPAUtil.closeEntityManager();
		}
		
		return list;
	}
	
	public default List<?> getAllPaginate(DaoInterface dao,Class<?> classType,
			int maxResults, int firstResults){
		
		List<?> list = null;
		
		try {
			JPAUtil.beginTransaction();
			list =  (List<?>) dao
					.searchAllPaginate(JPAUtil.getEntityManager(), classType, maxResults, firstResults);
			JPAUtil.commitTransaction();
			return list;
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();
		}
		finally {
			JPAUtil.closeEntityManager();
		}
		
		return list;
	}
	
	public List<?> getAll();
	
	public default void setDao(DaoInterface dao){
		throw new MethodNotFoundException("Método não implementado!");
	};
	
	public default void setClassType(Class<?> classType){
		throw new MethodNotFoundException("Método não implementado!");
	};
	
}
