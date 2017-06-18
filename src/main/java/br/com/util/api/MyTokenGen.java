package br.com.util.api;

import java.io.UnsupportedEncodingException;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import br.com.model.api.Usuario;

public class MyTokenGen {
	
	public static String createToken(Usuario usuario){
		
		try {
			Algorithm algorithm = Algorithm.HMAC256("teste");
			String token = JWT.create().withIssuer("sniet.api")
							.withClaim("acessLevel", usuario.getAcessLevel().toString())
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
	
	
	
}
