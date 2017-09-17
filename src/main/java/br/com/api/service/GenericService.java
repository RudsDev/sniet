package br.com.api.service;

import java.util.List;
import javax.el.MethodNotFoundException;
import br.com.api.dao.DaoInterface;
import br.com.api.dao.GenericDao;
<<<<<<< HEAD
=======
import br.com.api.model.Usuario;
>>>>>>> a1cd112e7197eeabcd872a624681e83fc77e1aee
import br.com.api.persist.JPAUtil;
import br.com.api.reflect.GenerateClass;

public class GenericService {
	
<<<<<<< HEAD
	private static final DaoInterface dao = new GenericDao();
=======
	public static GenericService getService(String type){
		return GenerateClass.generateServiceClass(type);
	}
	
>>>>>>> a1cd112e7197eeabcd872a624681e83fc77e1aee
	
	public Object save(Object object){
		
		Object objectSave = null;
		
		try {
			JPAUtil.beginTransaction();
			objectSave = dao
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
	
	
	public List<?> getAll(Class<?> classType){
		
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
	
<<<<<<< HEAD
	public List<?> getAllPaginate(Class<?> classType,
=======
	public default List<?> getAllPaginate(String type,
>>>>>>> a1cd112e7197eeabcd872a624681e83fc77e1aee
			int maxResults, int firstResults){
		
		DaoInterface dao = new GenericDao();
		Class<?> classType = GenerateClass.generateModelClass(type);
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
	
	public Integer count(Class<?> classType){
		
		try {
			JPAUtil.beginTransaction();
			Integer qtd =  dao
					.count(JPAUtil.getEntityManager(), classType);
			JPAUtil.commitTransaction();
			return qtd;
		}
		catch(Exception ex) {
			// TODO criar uma exception apropriada
			//JPAUtil_new.rollbackTransaction();
		}
		finally {
			JPAUtil.closeEntityManager();
		}
		
		return 0;
	}
	
	public void setClassType(Class<?> classType){
		throw new MethodNotFoundException("Método não implementado!");
	};
	
}
