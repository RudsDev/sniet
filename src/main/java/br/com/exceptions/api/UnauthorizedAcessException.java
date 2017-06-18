package br.com.exceptions.api;

public class UnauthorizedAcessException extends Exception {

	private static final long serialVersionUID = 1L;
	
	public UnauthorizedAcessException() {
		super("Acesso não autorizado!");
	}
}
