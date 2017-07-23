package br.com.api.util;

import java.io.UnsupportedEncodingException;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

import br.com.api.exceptions.UnauthorizedAcessException;
import br.com.api.model.Usuario;

public class MyTokenGen {
	
	private static String myKey = "whopper";
	private static String myIssuer = "sniet.api";
	
	public static String createToken(Usuario usuario){
		
		try {
			Algorithm algorithm = Algorithm.HMAC256(myKey);
			String token = JWT.create().withIssuer(myIssuer)
							.withClaim("name", usuario.getName())
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
		
		System.out.println("verifyTokenAcess: " + token);
		
		if(token==null)
			throw new UnauthorizedAcessException("Token is empty!");
			
		
		try {
		    Algorithm algorithm = Algorithm.HMAC256(myKey);
		    JWT.require(algorithm)
		        .withIssuer(myIssuer)
		        .withClaim("acessLevel", acessLevel)
		        .build().verify(token); 
		} catch (UnsupportedEncodingException exception){
			throw new UnauthorizedAcessException("Invalid encoding token");
		} catch (JWTVerificationException exception){
			throw new UnauthorizedAcessException("Sem privilégios suficientes para essa ação.");
		}
	}
}
