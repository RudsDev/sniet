package br.com.api.exceptions;

public class UnauthorizedAcessException extends Exception {

	private static final long serialVersionUID = 1L;
	
	public UnauthorizedAcessException(String msg) {
		super(msg);
	}
}
