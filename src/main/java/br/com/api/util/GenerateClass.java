package br.com.api.util;

import java.lang.reflect.InvocationTargetException;

import br.com.api.dao.DaoInterface;
import br.com.api.service.GenericService;

public abstract class GenerateClass {

	private static final String servicesPath = "br.com.api.service.";
	private static final String daoPath = "br.com.api.dao.";
	private static final String modelsPath = "br.com.api.model.";
	
	//TODO Usar Enums para type
	/*public static Object generateClass(String type, String simpleName){
		
		
		if(type.compareToIgnoreCase("dao")==0){
			return generateDAO(simpleName);
		}else if(type.compareToIgnoreCase("service")==0){
			return generateService(simpleName);
		}
		return null;
	}*/
	
	
	public static GenericService generateServiceClass(String simpleName){

		GenericService service = null;
		
		try {
			service = (GenericService) Class.forName(servicesPath+simpleName+"Service")
					.getConstructor().newInstance();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return service;
	}
	
	
	public static GenericService generateServiceClass(Class<?> classType){

		GenericService service = null;
		
		try {
			service = (GenericService) Class.forName(classType.getName())
					.getConstructor().newInstance();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return service;
	}	
	
	public static DaoInterface generateDaoClass(String simpleName){

		DaoInterface dao = null;
		
		try {
			dao = (DaoInterface) Class.forName(daoPath+simpleName+"Dao")
					.getConstructor().newInstance();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return dao;
	}
	
	
	public static DaoInterface generateDaoClass(Class<?> classType){

		DaoInterface dao = null;
		
		try {
			dao = (DaoInterface) Class.forName(classType.getName())
					.getConstructor().newInstance();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return dao;
	}
	
	public static Class<?> generateModelClass(String simpleName){

		Class<?> classe = null;
		
		try {
			classe =  Class.forName(modelsPath+simpleName)
					.getConstructor().newInstance().getClass();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return classe;
	}
	
}
