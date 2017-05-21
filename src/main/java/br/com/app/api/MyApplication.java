package br.com.app.api;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import br.com.resource.api.EspecieResource;
import br.com.resource.api.UsuarioResource;
import br.com.web.api.CORSFilter;
import io.swagger.jaxrs.config.BeanConfig;
import io.swagger.jaxrs.listing.ApiListingResource;
import io.swagger.jaxrs.listing.SwaggerSerializers;

@ApplicationPath("/servlet")
public class MyApplication extends Application {
	
	public MyApplication() {
		BeanConfig config = new BeanConfig();
		
		config.setTitle("SNIET API - Usuários");
		config.setDescription("Protótipo para a persistência"
				+ " de usuários"
				+ " no padrão SNIET.");
		config.setVersion("1.0.1");
		config.setHost("http://52.14.130.196");
		config.setBasePath("/apirestex/servlet");
		config.setSchemes(new String[]{"http"});
		config.setResourcePackage("br.com.resource.api");
		config.setScan(true);
		
	}
	
	
	@Override
	public Set<Class<?>> getClasses() {
		final Set<Class<?>> classes = new HashSet<Class<?>>();
		
		// register resources and features
		classes.add(EspecieResource.class);
		classes.add(UsuarioResource.class);
		classes.add(CORSFilter.class);
		classes.add(ApiListingResource.class);
		classes.add(SwaggerSerializers.class);
		 
		return classes;
	}
}