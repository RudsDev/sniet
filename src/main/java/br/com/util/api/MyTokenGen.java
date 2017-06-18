package br.com.util.api;

import java.io.UnsupportedEncodingException;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

import br.com.exceptions.api.UnauthorizedAcessException;
import br.com.model.api.Usuario;

public class MyTokenGen {
	
	private static String myKey = "whopper";
	private static String myIssuer = "sniet.api";
	
	public static String createToken(Usuario usuario){
		
		try {
			Algorithm algorithm = Algorithm.HMAC256(myKey);
			String token = JWT.create().withIssuer(myIssuer)
							.withClaim("acessLevel", usuario.getAcessLevel())
							.withClaim("password", usuario.getPassword())
							.sign(algorithm);
			
			return token;
			
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static void verifyTokenAcess(String token, Integer acessLevel)
			throws UnauthorizedAcessException{
		
		System.out.println("verifyTokenAcess");
		
		try {
		    Algorithm algorithm = Algorithm.HMAC256(myKey);
		    JWT.require(algorithm)
		        .withIssuer(myIssuer)
		        .withClaim("acessLevel", acessLevel)
		        .build().verify(token); 
		} catch (UnsupportedEncodingException exception){
			exception.printStackTrace();
			throw new UnauthorizedAcessException();
		} catch (JWTVerificationException exception){
			exception.printStackTrace();
			throw new UnauthorizedAcessException();
		}
	}
}
