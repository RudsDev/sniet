package br.com.api.service;

import java.util.List;
import br.com.api.dao.DaoInterface;
import br.com.api.reflect.GenerateClass;

public class Service implements GenericService {

	private DaoInterface dao = null;
	private Class<?> classType = null;
	
	public Service(){
		
	}

	public Service(Class<?> classType) {
		this.dao = GenerateClass.generateDaoClass(classType.getSimpleName());
		this.classType = classType;
	}
	
	public Service(String simpleName) {
		Class<?> classType = GenerateClass.generateModelClass(simpleName);
		this.dao = GenerateClass.generateDaoClass(classType.getSimpleName());
		this.classType = classType;
	}

	@Override
	public List<?> getAll() {
		
		if(this.dao == null || this.classType ==null){
			throw new NullPointerException("Objeto criado manualmente. Inicia suas"
					+ " propriedades manualmente utilizando os respectivos m�todos set().");
		}
		return this.getAll(this.dao, this.classType);
	}

	@Override
	public void setDao(DaoInterface dao) {
		this.dao = dao;
	}

	@Override
	public void setClassType(Class<?> classType) {
		this.classType = classType;
	}

}
