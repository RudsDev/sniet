package br.com.app.api;

public class GeraID {
	
	private static int id=0;
	
	public static int geraId(){
		return id++;
	}

}
